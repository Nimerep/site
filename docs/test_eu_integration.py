from pathlib import Path
from tempfile import TemporaryDirectory
import json
from postprocess_seo import add_eu_launch_planner, add_blog_schema

with TemporaryDirectory() as d:
    p = Path(d) / 'index.html'
    p.write_text('<html lang="hr"><head></head><body><div class="article-body"><p>Intro</p><p>[[EU_LAUNCH_PLANNER]]</p><p>&lt;span id="eu-platforms"&gt;&lt;/span&gt;</p><h2>Guide</h2></div></body></html>', encoding='utf-8')
    add_eu_launch_planner(p)
    first = p.read_text(encoding='utf-8')
    add_eu_launch_planner(p)
    assert first == p.read_text(encoding='utf-8')
    assert first.count('id="eu-launch-planner"') == 1
    assert first.index('Intro') < first.index('id="eu-launch-planner"') < first.index('<h2>Guide')
    assert '<html lang="en">' in first and '[[EU_LAUNCH_PLANNER]]' not in first
    assert '<span id="eu-platforms"></span>' in first
    add_blog_schema(p,dict(title='Test',description='Test',date='2026-10-01',sourceURL='https://www.peremin.com/test/',language='en'))
    assert '"inLanguage":"en"' in p.read_text(encoding='utf-8')
    p.write_text('<head></head><body>No marker</body>',encoding='utf-8')
    try: add_eu_launch_planner(p)
    except ValueError: pass
    else: raise AssertionError('Missing marker must fail')
print('EU injection, anchors, English schema and idempotence passed')
