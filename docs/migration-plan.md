# peremin.com TileDown migration plan

## Goals

- Preserve all public URLs from the current peremin.com site.
- Move content into TileDown's folder-per-page structure.
- Keep `/about-me/` as the canonical biography URL.
- Improve entity SEO for Goran Peremin and topic SEO for growth marketing, eCommerce, SEO, CRO, analytics, AI testing and GDPR.
- Add AI-discovery files for search/chat crawlers.

## Build target

TileDown release: `v0.5.0`

Build command:

```sh
tiledown doctor --publish content/
tiledown build-site content/ dist/
```

Local preview when TileDown is available:

```sh
tiledown serve --port 8765 content/
```

## Deployment

GitHub Pages workflow is defined in `.github/workflows/pages.yml`.

It builds on `macos-14`, downloads the official TileDown `v0.5.0` release, runs `doctor --publish`, builds `dist/`, checks deploy-critical root files, and deploys via GitHub Pages.

`macos-14` is required because the official TileDown release asset is `macos-arm64`; GitHub documents `macos-14` as an arm64 M1 runner.

The production build uses the custom template at `templates/peremin.html` and the custom CSS at `content/assets/peremin.css`.

## URL policy

Existing blog URLs stay at root level. Do not introduce `/blog/` unless redirects are explicitly configured and tested.

Examples:

- `/about-me/`
- `/napredna-analitika-i-predictive-analytics-marketing-bez-nagadanja/`
- `/besplatno-ab-testiranje-s-umjetnom-inteligencijom-ai-llm/`
- `/koristenje-genagents-simulacija-u-predvidanju-trzisnog-uspjeha-novih-e-commerce-proizvoda/`

## SEO and AI discovery

Already added:

- `content/llms.txt`
- `content/robots.txt`
- `content/humans.txt`
- `content/goran-peremin.person.schema.json`
- static passthrough rules for `CNAME`, `.nojekyll`, `robots.txt`, `llms.txt`, `humans.txt`, schema JSON, `assets/` and `media/`
- front matter descriptions for every page scaffold

Next:

- Inject Person JSON-LD into the final page template.
- Add Article JSON-LD per post if the TileDown built-in template does not emit enough structured data.
- Add canonical checks after first successful build.
- Add Open Graph image strategy for homepage, About Me and top posts.

## Content migration status

About Me is migrated and strengthened.

Blog posts are migrated with preserved slugs, SEO descriptions, dates where known, tags, source URLs and root-relative image paths.

The migration script is `work/migrate_publii_feed.py`. It uses the old repo's `feed.json`, falls back to individual `index.html` files, and copies `media/` into `content/media/`.

Manual cleanup needed before final launch:

- `content/napredna-analitika-i-predictive-analytics-marketing-bez-nagadanja/index.md` has two table placeholders.
- `content/besplatno-ab-testiranje-s-umjetnom-inteligencijom-ai-llm/index.md` has one table placeholder.
- `content/koristenje-genagents-simulacija-u-predvidanju-trzisnog-uspjeha-novih-e-commerce-proizvoda/index.md` has one table placeholder.
- Code blocks converted from Google Sites/Publii markup should be reviewed for language labels and indentation.
- Typography should be reviewed after the first TileDown render because the source site had mixed HTML entities and smart punctuation.
