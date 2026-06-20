# peremin.com TileDown redesign

TileDown content migration and redesign workspace for `www.peremin.com`.

## Structure

- `content/` - TileDown site content
- `content/tiledown.yml` - site settings
- `content/about-me/index.md` - strengthened About Me page
- `content/*/index.md` - preserved root-level blog URLs
- `outputs/peremin-inventory.md` - inventory of discovered old URLs
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow

## Build

TileDown is required.

```sh
tiledown doctor content/
tiledown build-site content/ dist/
```

For publish checks:

```sh
tiledown doctor --publish content/
```

The GitHub Actions workflow installs TileDown `v0.5.0` on the arm64 `macos-14` runner and deploys `dist/` to GitHub Pages.
