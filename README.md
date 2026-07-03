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

The GitHub Actions workflow builds the pinned TileDown `v0.6.4` source from Codeberg on the arm64 `macos-15` runner and deploys `dist/` to GitHub Pages.
