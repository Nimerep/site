from pathlib import Path
from tempfile import TemporaryDirectory
import json, re
from postprocess_seo import frontmatter, process
root=Path(__file__).resolve().parents[1]
with TemporaryDirectory() as folder:
    dist=Path(folder)
    for src in (root/'content').glob('*/index.md'):
        d=frontmatter(src)
        if d.get('type') not in {'blog-post','page'}: continue
        p=dist/src.parent.name/'index.html';p.parent.mkdir(parents=True,exist_ok=True)
        p.write_text('<html><head></head><body><main><article class="article-shell"><header class="article-header"><h1>Title</h1></header><div class="article-body"><p>Keep body</p></div><aside class="related-posts"><h2>Povezani članci</h2><ul><li>Automatic</li></ul></aside></article></main></body></html>',encoding='utf-8')
    (dist/'index.html').write_text('<html><head></head><body></body></html>',encoding='utf-8')
    # Widget integrations have their own tests; these fixtures exercise the shared SEO output.
    import postprocess_seo
    postprocess_seo.add_webshop_selector=lambda p:None
    postprocess_seo.add_eu_launch_planner=lambda p:None
    process(root/'content',dist)
    visible=[]
    for src in (root/'content').glob('*/index.md'):
        d=frontmatter(src)
        if d.get('type')!='blog-post':continue
        html=(dist/src.parent.name/'index.html').read_text(encoding='utf-8')
        assert 'class="article-byline"' in html, src.parent.name+' missing signature'
        assert html.count('class="related-posts"')==1
        assert 'Automatic' not in html
        graph=json.loads(re.search(r'data-peremin-schema="blog-posting">\s*(.*?)</script>',html,re.S)[1])['@graph']
        author=graph[0]['author']
        assert author['name']=='Goran Peremin' and author['@id'].endswith('/about-me/#person')
        assert '<p>Keep body</p>' in html
        assert len(re.findall(r'<li><a href=',html))>=3
        if d.get('background')!='true':visible.append(src.parent.name)
        for hidden in ['kako-analizirati-konkurenciju-za-webshop','kako-provjeriti-hoce-li-se-proizvod-prodavati-online','koliko-smijem-potrositi-na-oglase-po-narudzbi','zasto-webshop-ima-posjete-ali-nema-prodaje']:
            assert f'href="/{hidden}/"' not in html
    about=(dist/'about-me/index.html').read_text(encoding='utf-8')
    assert '"@type":"ProfilePage"' in about
    for slug in visible: assert f'href="/{slug}/"' in about
    first={p.relative_to(dist):p.read_bytes() for p in dist.rglob('*.html')}
    process(root/'content',dist)
    second={p.relative_to(dist):p.read_bytes() for p in dist.rglob('*.html')}
    for key in first:
        if first[key]!=second[key]:
            import difflib
            print(key, ''.join(difflib.unified_diff(first[key].decode().splitlines(True),second[key].decode().splitlines(True)))[:1200])
    assert first==second, 'Output not idempotent'
print('All article signatures, curated links, author schema, hidden exclusions, profile archive and idempotence passed')
