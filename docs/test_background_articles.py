"""Background articles stay indexable without links in HTML or feeds."""
import json
from pathlib import Path
from tempfile import TemporaryDirectory
from postprocess_seo import process

with TemporaryDirectory() as folder:
    root = Path(folder)
    content, dist = root / 'content', root / 'dist'
    content.mkdir()
    dist.mkdir()
    (content / 'cover.webp').write_bytes(b'image')
    for slug, background in [('visible', False), ('background', True)]:
        (content / slug).mkdir()
        (dist / slug).mkdir()
        (content / slug / 'index.md').write_text(
            '---\ntitle: Example\ndescription: Example article\ntype: blog-post\n'
            'date: 2026-10-04\nimage: /cover.webp\nnav: false\n'
            f'sourceURL: https://www.peremin.com/{slug}/\n'
            f'background: {str(background).lower()}\n---\nArticle body\n', encoding='utf-8')
        (dist / slug / 'index.html').write_text(
            '<html><head></head><body><h1>Article</h1><p>Keep this body.</p>'
            '<ul><li><a href="/background/">Background</a></li>'
            '<li><a href="/visible/">Visible</a></li></ul>'
            '<a href="../background/?from=related#answer">Relative</a>'
            '<a href="https://www.peremin.com/background/">Absolute</a>'
            '<a href="https://example.com/background/">External stays</a>'
            '</body></html>', encoding='utf-8')
    (dist / 'index.html').write_text(
        '<head></head><body><ul><li class="post-card"><a href="/background/">'
        '<img src="cover.webp"></a><div><a href="/background/">Background</a>'
        '</div></li><li><a href="/visible/">Visible</a></li></ul></body>', encoding='utf-8')
    (dist / 'feed.xml').write_text(
        '<rss><channel><item><link>https://www.peremin.com/background/</link></item>'
        '<item><link>https://www.peremin.com/visible/</link></item></channel></rss>', encoding='utf-8')
    (dist / 'atom.xml').write_text(
        '<feed xmlns="http://www.w3.org/2005/Atom"><entry><link href="https://www.peremin.com/background/"/>'
        '</entry><entry><link href="https://www.peremin.com/visible/"/></entry></feed>', encoding='utf-8')
    (dist / 'feed.json').write_text(json.dumps({'version': 'test', 'items': [
        {'url': 'https://www.peremin.com/background/'}, {'url': 'https://www.peremin.com/visible/'}]}), encoding='utf-8')
    process(content, dist)
    home = (dist / 'index.html').read_text(encoding='utf-8')
    assert '/background/' not in home, 'Background article leaked into homepage'
    assert '/visible/' in home, 'Visible article was lost'
    for slug in ['visible', 'background']:
        html = (dist / slug / 'index.html').read_text(encoding='utf-8')
        assert '<p>Keep this body.</p>' in html
        assert 'noindex' not in html and 'data-peremin-schema' in html
        assert 'href="/background/' not in html and '../background/' not in html
        assert 'href="https://www.peremin.com/background/' not in html
        assert 'href="https://example.com/background/"' in html
    for feed in ['feed.xml', 'atom.xml', 'feed.json']:
        text = (dist / feed).read_text(encoding='utf-8')
        assert '/background/' not in text and '/visible/' in text
    assert '/background/' in (dist / 'sitemap.xml').read_text(encoding='utf-8')
    # Verify the new filtering itself is idempotent independently of older injectors.
    from postprocess_seo import hide_background_articles
    first = {str(p.relative_to(dist)): p.read_bytes() for p in dist.rglob('*') if p.is_file()}
    hide_background_articles(dist, {'https://www.peremin.com/background/'})
    assert first == {str(p.relative_to(dist)): p.read_bytes() for p in dist.rglob('*') if p.is_file()}
print('Background pages: sitemap, schema, body, link removal, feeds and idempotence passed')
