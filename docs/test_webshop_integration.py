from pathlib import Path
from tempfile import TemporaryDirectory
from postprocess_seo import add_webshop_selector

with TemporaryDirectory() as folder:
    page = Path(folder) / 'index.html'
    anchors = ('pocetak-vodica', 'platforme', 'erp-hosting', 'izlazak', 'trosak', 'odrzavanje')
    rendered_anchors = ''.join(f'<p>&lt;span id="{anchor}"&gt;&lt;/span&gt;</p>' for anchor in anchors)
    page.write_text('<html><head></head><body><div class="article-body"><p>Article</p>' + rendered_anchors + '</div></body></html>', encoding='utf-8')
    add_webshop_selector(page)
    first = page.read_text(encoding='utf-8')
    add_webshop_selector(page)
    assert page.read_text(encoding='utf-8') == first
    assert first.count('id="webshop-selector"') == 1
    assert '/assets/webshop-selector.js' in first
    assert '/assets/webshop-selector.css' in first
    for anchor in anchors:
        assert f'<span id="{anchor}"></span>' in first
    assert '&lt;span' not in first
    assert first.index('id="webshop-selector"') < first.index('<p>Article</p>')
print('Selector integration and idempotence checked')
