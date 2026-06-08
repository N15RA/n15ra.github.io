# NISRA Official Website

Official website for NISRA (Network and Information Security Research
Association), Fu Jen Catholic University.

Rebuilt off Wix as a pure-static site on **Astro** + **GitHub Pages** — faithful
to the new design system, in Traditional Chinese (zh-TW), with self-hosted fonts
(no third-party CDN).

> **Design provenance.** The visual design comes from an external **Claude Design**
> handoff ("NISRA Design System"), which was itself reverse-engineered from this
> repo and is **not vendored** here. The production source of truth is this repo's
> `src/styles/*` (tokens + component CSS) and `src/components/*`.

## Tech stack

- **Astro 6** — component-based static site generator, zero JS by default
- **Plain CSS design tokens** (no Tailwind) — `src/styles/{tokens,kit,fonts}.css`,
  ported verbatim from the design system
- **Self-hosted fonts** — Maple Mono (Latin) + a content-driven subset of Maple
  Mono NF CN (Traditional Chinese) + Noto Sans TC fallback
- **GitHub Pages** via GitHub Actions; **Playwright** smoke + axe a11y tests
- Runtime via **mise** (Node 22); formatting via **Prettier** (pre-commit)

## Getting started

```bash
mise install          # provision Node 22
npm install           # install dependencies
npm run dev           # dev server (http://localhost:4321)
npm run build         # production build -> dist/
npm run preview       # preview the production build
npm run check         # astro check (types + content schema)
npm run test:e2e      # Playwright smoke + accessibility
pre-commit install    # enable commit-time checks (Prettier + astro check)
```

### Updating content

Club officers edit JSON under `src/content/` (`semesters`, `events`, `history`,
`members`) — Zod-validated at build time. Entries flagged `"scaffold": true` are
placeholders pending real data. See `src/content/README.md`.

### Fonts

The Traditional Chinese subset is generated from the characters actually used on
the site:

```bash
# one-time: download the source font (OFL) — see scripts/subset-cn-font.mjs header
npm run font:subset   # regenerate after adding new Chinese characters
```

## Repository layout

| Path                      | Purpose                                                       |
| ------------------------- | ------------------------------------------------------------- |
| `src/`                    | Astro source — pages, components, layouts, styles, data       |
| `src/content/`            | Club-editable JSON content (Zod-validated)                    |
| `public/`                 | Static assets served at root (logo, favicon, self-host fonts) |
| `scripts/`                | Build helpers (Traditional Chinese font subsetting)           |
| `tests/`                  | Playwright smoke + accessibility tests                        |
| `.github/workflows/`      | `deploy.yml` (Pages) + `ci.yml` (check / build / audit / e2e) |
| `old-website/`            | Faithful archival dump of the existing Wix site (do not edit) |
| `.claude/`, `CLAUDE.md`   | Development guidelines and Claude Code configuration          |
| `AGENTS.md`               | General usage guidelines                                      |
| `mise.toml`               | Runtime version management (Node 22)                          |
| `.pre-commit-config.yaml` | Pre-commit checks (base hooks + Prettier + astro check)       |

## Deployment

Pushes to `main` deploy to GitHub Pages via `.github/workflows/deploy.yml`
(set Settings → Pages → Source = "GitHub Actions"). The site serves at
`https://n15ra.github.io/`. A custom-domain (`nisra.net`) cutover is a later DNS
step — update `site` in `astro.config.mjs` and add `public/CNAME`; do not cut over
until the build is verified and content-complete.

## License

Maintained by NISRA, Fu Jen Catholic University.
