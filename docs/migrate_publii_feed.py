from __future__ import annotations

import html
import json
import re
import shutil
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
OLD = ROOT / "work" / "Nimerep-site"
CONTENT = ROOT / "content"


TAG_MAP = {
    "napredna-analitika-i-predictive-analytics-marketing-bez-nagadanja": "ecommerce, predictive analytics, marketing analytics, cro, ai",
    "besplatno-ab-testiranje-s-umjetnom-inteligencijom-ai-llm": "ai, llm, ab testing, genagents, ecommerce",
    "koristenje-genagents-simulacija-u-predvidanju-trzisnog-uspjeha-novih-e-commerce-proizvoda": "genagents, ai, ecommerce, product research, synthetic research",
    "7-najefikasnijih-proof-elemenata-za-povecanje-povjerenja-u-web-shopu": "ecommerce, cro, trust, conversion optimization, webshop",
    "kolacici-uskladi-se-s-gdpr-om-i-eprivacy-direktivom": "gdpr, cookies, privacy, ecommerce, consent mode",
    "gdpr-checklista-za-e-commerce-bez-gluposti-samo-ono-sto-ti-zapravo-treba": "gdpr, ecommerce, privacy, compliance, webshop",
    "sinteticki-podaci-u-istrazivanjima-genijalnost-ili-samo-lijenost": "synthetic data, ai, market research, privacy, marketing analytics",
    "roi-nije-jedan-broj-kako-povezati-metrike-modele-i-zdrav-razum-u-marketingu": "roi, marketing analytics, attribution, econometrics, marketing effectiveness",
    "ekonometrija-u-marketingu-kako-pretvoriti-brojke-u-oruzje": "econometrics, marketing analytics, roi, attribution, media mix modeling",
    "zasto-brendovi-rastu-i-zasto-vas-mozda-stagnira": "brand strategy, marketing effectiveness, growth, ecommerce",
    "brand-kampanje-istina-mitovi-i-zasto-vecina-marketinskog-svijeta-jos-uvijek-ne-kuzi-igru-copy": "brand campaigns, marketing strategy, marketing effectiveness, growth",
    "kako-automatski-optimizirati-slike-za-web-shop-uz-pomoc-pythona": "python, image optimization, ecommerce, web performance, seo",
}


def yaml_quote(value: str) -> str:
    value = html.unescape(value).replace("\\", "\\\\").replace('"', '\\"')
    return f'"{value}"'


def fix_mojibake(value: str) -> str:
    try:
        fixed = value.encode("cp1252").decode("utf-8")
    except UnicodeError:
        return value
    if fixed.count("�") > value.count("�"):
        return value
    return fixed


def strip_html(value: str) -> str:
    value = fix_mojibake(value)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def local_image(url: str | None) -> str | None:
    if not url:
        return None
    parsed = urlparse(url)
    if parsed.netloc and parsed.netloc != "www.peremin.com":
        return url
    path = parsed.path
    return path if path.startswith("/") else f"/{path}"


class MarkdownConverter(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.out: list[str] = []
        self.href_stack: list[str | None] = []
        self.list_stack: list[dict[str, int | str]] = []
        self.in_pre = False
        self.in_code = False
        self.in_blockquote = False
        self.pending_link_text: list[str] | None = None
        self.skip_depth = 0

    def write(self, text: str) -> None:
        if self.skip_depth:
            return
        if self.pending_link_text is not None:
            self.pending_link_text.append(text)
        else:
            self.out.append(text)

    def newline(self, count: int = 1) -> None:
        if self.skip_depth:
            return
        self.out.append("\n" * count)

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)
        if tag in {"script", "style", "svg", "noscript"}:
            self.skip_depth += 1
            return
        if self.skip_depth:
            return
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            level = int(tag[1])
            self.newline(2)
            self.write("#" * level + " ")
        elif tag == "p":
            self.newline(2)
        elif tag == "br":
            self.newline()
        elif tag in {"strong", "b"}:
            self.write("**")
        elif tag in {"em", "i"}:
            self.write("*")
        elif tag == "a":
            self.href_stack.append(attrs_dict.get("href"))
            self.pending_link_text = []
        elif tag == "ul":
            self.list_stack.append({"type": "ul", "n": 0})
            self.newline()
        elif tag == "ol":
            self.list_stack.append({"type": "ol", "n": 0})
            self.newline()
        elif tag == "li":
            marker = "- "
            if self.list_stack and self.list_stack[-1]["type"] == "ol":
                self.list_stack[-1]["n"] = int(self.list_stack[-1]["n"]) + 1
                marker = f"{self.list_stack[-1]['n']}. "
            self.newline()
            self.write(marker)
        elif tag == "blockquote":
            self.in_blockquote = True
            self.newline(2)
            self.write("> ")
        elif tag == "pre":
            self.in_pre = True
            self.newline(2)
            self.write("```")
            code_class = attrs_dict.get("class") or ""
            match = re.search(r"language-([A-Za-z0-9_+-]+)", code_class)
            if match:
                self.write(match.group(1))
            self.newline()
        elif tag == "code" and not self.in_pre:
            self.in_code = True
            self.write("`")
        elif tag == "img":
            src = local_image(attrs_dict.get("src"))
            alt = attrs_dict.get("alt") or ""
            if src:
                self.newline(2)
                self.write(f"![{alt}]({src})")
                self.newline(2)
        elif tag == "table":
            self.newline(2)
            self.write("[Table from original article preserved for manual cleanup]")
            self.newline(2)

    def handle_endtag(self, tag: str) -> None:
        if tag in {"script", "style", "svg", "noscript"}:
            self.skip_depth = max(0, self.skip_depth - 1)
            return
        if self.skip_depth:
            return
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6", "p"}:
            self.newline(2)
        elif tag in {"strong", "b"}:
            self.write("**")
        elif tag in {"em", "i"}:
            self.write("*")
        elif tag == "a":
            href = self.href_stack.pop() if self.href_stack else None
            text = "".join(self.pending_link_text or []).strip()
            self.pending_link_text = None
            if href and text:
                self.write(f"[{text}]({href})")
            elif text:
                self.write(text)
        elif tag in {"ul", "ol"}:
            if self.list_stack:
                self.list_stack.pop()
            self.newline(2)
        elif tag == "blockquote":
            self.in_blockquote = False
            self.newline(2)
        elif tag == "pre":
            self.in_pre = False
            self.newline()
            self.write("```")
            self.newline(2)
        elif tag == "code" and self.in_code:
            self.in_code = False
            self.write("`")

    def handle_data(self, data: str) -> None:
        if self.skip_depth:
            return
        if self.in_pre:
            self.write(html.unescape(data))
            return
        text = html.unescape(data)
        text = re.sub(r"\s+", " ", text)
        self.write(text)

    def markdown(self) -> str:
        text = "".join(self.out)
        text = text.replace("\xa0", " ")
        text = re.sub(r"[ \t]+\n", "\n", text)
        text = re.sub(r"\n{3,}", "\n\n", text)
        text = re.sub(r" +", " ", text)
        return text.strip() + "\n"


def html_to_markdown(value: str) -> str:
    parser = MarkdownConverter()
    parser.feed(value)
    return parser.markdown()


def slug_from_url(url: str) -> str:
    return urlparse(url).path.strip("/").split("/")[-1]


def main() -> None:
    feed = json.loads((OLD / "feed.json").read_text(encoding="utf-8"))

    media_src = OLD / "media"
    media_dst = CONTENT / "media"
    if media_src.exists():
        shutil.copytree(media_src, media_dst, dirs_exist_ok=True)

    migrated: list[str] = []
    for item in feed["items"]:
        slug = slug_from_url(item["url"])
        if slug == "about-me":
            continue

        out_dir = CONTENT / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        title = html.unescape(fix_mojibake(item["title"]))
        summary = strip_html(item.get("summary", ""))
        description = summary[:155].rstrip(" .,;:-")
        date = (item.get("date_published") or "")[:10]
        modified = (item.get("date_modified") or "")[:10]
        image = local_image(item.get("image"))
        tags = TAG_MAP.get(slug, "growth marketing, ecommerce, digital marketing")

        body = html_to_markdown(fix_mojibake(item.get("content_html", "")))
        parts = [
            "---",
            f"title: {yaml_quote(title)}",
            f"description: {yaml_quote(description)}",
            "type: blog-post",
            "nav: false",
        ]
        if date:
            parts.append(f"date: {date}")
        if modified:
            parts.append(f"updated: {modified}")
        parts.extend(
            [
                "author: Goran Peremin",
                f"tags: {tags}",
                f"sourceURL: {item['url']}",
            ]
        )
        if image:
            parts.append(f"image: {image}")
        parts.extend(["---", "", f"# {title}", "", body])
        (out_dir / "index.md").write_text("\n".join(parts), encoding="utf-8")
        migrated.append(slug)

    for post_dir in OLD.iterdir():
        if not post_dir.is_dir() or post_dir.name in {"about-me", "authors", "assets", "media", "page", "tags"}:
            continue
        if post_dir.name in migrated:
            continue
        source = post_dir / "index.html"
        if not source.exists():
            continue
        raw = fix_mojibake(source.read_text(encoding="utf-8"))
        title_match = re.search(r'<h1 class="post__title">(.*?)</h1>', raw, re.S)
        if not title_match:
            continue
        title = html.unescape(strip_html(title_match.group(1)))
        desc_match = re.search(r'<meta name="description" content="(.*?)"', raw, re.S)
        description = html.unescape(desc_match.group(1)).strip() if desc_match else title
        date_match = re.search(r'"datePublished":"([^"]+)"', raw)
        modified_match = re.search(r'"dateModified":"([^"]+)"', raw)
        image_match = re.search(r'"image":\{"@type":"ImageObject","url":"([^"]+)"', raw)
        if not image_match:
            image_match = re.search(r'<figure class="post__image post__cover"><img src="([^"]+)"', raw)
        entry_match = re.search(r'<div class="post__entry">(.*?)</div><footer class="wrapper post__footer">', raw, re.S)
        body = html_to_markdown(entry_match.group(1)) if entry_match else ""

        slug = post_dir.name
        out_dir = CONTENT / slug
        out_dir.mkdir(parents=True, exist_ok=True)
        parts = [
            "---",
            f"title: {yaml_quote(title)}",
            f"description: {yaml_quote(description[:155].rstrip(' .,;:-'))}",
            "type: blog-post",
            "nav: false",
        ]
        if date_match:
            parts.append(f"date: {date_match.group(1)[:10]}")
        if modified_match:
            parts.append(f"updated: {modified_match.group(1)[:10]}")
        parts.extend(
            [
                "author: Goran Peremin",
                f"tags: {TAG_MAP.get(slug, 'growth marketing, ecommerce, digital marketing')}",
                f"sourceURL: https://www.peremin.com/{slug}/",
            ]
        )
        if image_match:
            image = local_image(html.unescape(image_match.group(1)))
            if image:
                parts.append(f"image: {image}")
        parts.extend(["---", "", f"# {title}", "", body])
        (out_dir / "index.md").write_text("\n".join(parts), encoding="utf-8")
        migrated.append(slug)

    print("\n".join(migrated))


if __name__ == "__main__":
    main()
