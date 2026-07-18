#!/usr/bin/env python3
"""Keep generated SEO output focused on canonical content pages."""

from __future__ import annotations

import json
import re
import shutil
import sys
from html import escape
from pathlib import Path
from urllib.parse import urljoin


BASE_URL = "https://www.peremin.com/"
SCHEMA_MARKER = 'data-peremin-schema="blog-posting"'


def frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return {}
    block = text.split("---", 2)[1]
    return {
        key.strip(): value.strip()
        for line in block.splitlines()
        if ":" in line
        for key, value in [line.split(":", 1)]
    }


def absolute_url(value: str) -> str:
    return urljoin(BASE_URL, value)


def add_blog_schema(html_path: Path, data: dict[str, str]) -> None:
    canonical = data["sourceURL"]
    schema: dict[str, object] = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": f"{canonical}#article",
        "url": canonical,
        "headline": data["title"],
        "description": data["description"],
        "datePublished": data["date"],
        "dateModified": data.get("updated", data["date"]),
        "inLanguage": "hr",
        "mainEntityOfPage": {"@id": f"{canonical}#webpage"},
        "author": {"@id": f"{BASE_URL}about-me/#person"},
        "publisher": {"@id": f"{BASE_URL}about-me/#person"},
        "isPartOf": {"@id": f"{BASE_URL}#website"},
    }
    if data.get("image"):
        schema["image"] = absolute_url(data["image"])

    html = html_path.read_text(encoding="utf-8")
    html = re.sub(
        rf'\s*<script type="application/ld\+json" {SCHEMA_MARKER}>.*?</script>',
        "",
        html,
        flags=re.DOTALL,
    )
    script = (
        f'  <script type="application/ld+json" {SCHEMA_MARKER}>\n'
        f'  {json.dumps(schema, ensure_ascii=False, separators=(",", ":"))}\n'
        "  </script>\n"
    )
    if "</head>" not in html:
        raise ValueError(f"Missing </head> in {html_path}")
    html_path.write_text(html.replace("</head>", script + "</head>", 1), encoding="utf-8")


def write_sitemap(dist: Path, pages: list[tuple[str, str | None]]) -> None:
    rows = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for url, modified in pages:
        rows.append("  <url>")
        rows.append(f"    <loc>{escape(url)}</loc>")
        if modified:
            rows.append(f"    <lastmod>{escape(modified)}</lastmod>")
        rows.append("  </url>")
    rows.append("</urlset>")
    (dist / "sitemap.xml").write_text("\n".join(rows) + "\n", encoding="utf-8")


def write_page_two_redirect(dist: Path) -> None:
    target = BASE_URL
    html = f"""<!doctype html>
<html lang="hr"><head>
  <meta charset="utf-8">
  <meta name="robots" content="noindex, follow">
  <meta http-equiv="refresh" content="0; url={target}">
  <link rel="canonical" href="{target}">
  <title>Preusmjeravanje — Goran Peremin</title>
  <script>location.replace({json.dumps(target)});</script>
</head><body><p>Stranica je premještena na <a href="{target}">naslovnicu</a>.</p></body></html>
"""
    path = dist / "page" / "2" / "index.html"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")


def process(content: Path, dist: Path) -> None:
    shutil.rmtree(dist / "tags", ignore_errors=True)

    sitemap_pages: list[tuple[str, str | None]] = []
    for source in sorted(content.glob("**/index.md")):
        data = frontmatter(source)
        if data.get("type") not in {"page", "blog-post"}:
            continue
        slug = source.parent.relative_to(content).as_posix()
        canonical = data.get("sourceURL") or (BASE_URL if slug == "." else absolute_url(f"{slug}/"))
        sitemap_pages.append((canonical, data.get("updated") or data.get("date")))

        if data["type"] == "blog-post":
            required = {"title", "description", "date", "sourceURL"} - data.keys()
            if required:
                raise ValueError(f"Missing {sorted(required)} in {source}")
            html_path = dist / slug / "index.html"
            if not html_path.is_file():
                raise FileNotFoundError(f"Missing generated article {html_path}")
            add_blog_schema(html_path, data)

    sitemap_pages.append((absolute_url("lab/hypeometar/"), None))
    sitemap_pages = sorted(set(sitemap_pages), key=lambda item: (item[0] != BASE_URL, item[0]))
    write_sitemap(dist, sitemap_pages)
    write_page_two_redirect(dist)

    sitemap = (dist / "sitemap.xml").read_text(encoding="utf-8")
    expected_articles = sum(1 for p in content.glob("*/index.md") if frontmatter(p).get("type") == "blog-post")
    actual_schemas = sum(
        SCHEMA_MARKER in p.read_text(encoding="utf-8")
        for p in dist.glob("*/index.html")
    )
    assert not (dist / "tags").exists(), "Tag output still exists"
    assert "/tags/" not in sitemap, "Tag URL leaked into sitemap"
    assert "/lab/hypeometar/" in sitemap, "Hypeometar is missing from sitemap"
    assert "/page/2/" not in sitemap, "Legacy pagination leaked into sitemap"
    assert actual_schemas == expected_articles, f"Expected {expected_articles} article schemas, found {actual_schemas}"


if __name__ == "__main__":
    if len(sys.argv) != 3:
        raise SystemExit("Usage: postprocess_seo.py CONTENT_DIR DIST_DIR")
    process(Path(sys.argv[1]), Path(sys.argv[2]))
