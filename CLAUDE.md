# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AmlaWellness is a static marketing site for a GLP-1 telehealth brand, hosted on GitHub Pages. All three pages (`index.html`, `privacy.html`, `terms.html`) share a header and footer via Jekyll includes. No JavaScript framework, no client-side build tooling.

## Development

The site is served by GitHub Pages, which runs **Jekyll** automatically on push (no `_config.yml` is required; do not add a `.nojekyll` file or Jekyll includes stop working).

- Every page starts with an empty Jekyll front-matter block (`---` / `---`) so Liquid `{% include %}` tags are processed. Because of this, pages render correctly only when built by Jekyll — open them via a GitHub Pages preview or `bundle exec jekyll serve`, **not** by double-clicking the file.
- Do not put a literal `{{` or `{%` in page content unless it is meant as Liquid — wrap such snippets in `{% raw %}…{% endraw %}`.

There is no package manager or test suite.

## Architecture

- **index.html** — the landing page: markup + inline `<style>`. Sections: sticky header, hero, trust pills, treatments, how-it-works, comparison table, disclaimer, pillars, FAQ (native `<details>`), final CTA, footer. Includes the header/footer with `home=true`.
- **privacy.html / terms.html** — legal pages. Their shared CSS lives in `assets/styles.css` (linked via `<link>`); they have no inline `<style>`. They include the header/footer with no parameter (default = legal variant).
- **_includes/** — shared Jekyll partials: `header.html`, `footer.html`. Edit these once to update the header/footer on every page. They are parameterized: `{% include header.html home=true %}` (landing variant — same-page `#` anchors, `btn-teal` login, "Get started" commented out, goal-picker footer links) vs `{% include header.html %}` (legal variant — `index.html#…` cross-page anchors, `btn-ghost` login + "Get started", plain treatment footer links). The `home` flag drives the `{% if include.home %}` branches inside both partials.
- **assets/styles.css** — shared design system + component CSS for the **legal pages only**. The landing page's CSS has diverged (heading scale, links, buttons, footer spacing) and stays inline in `index.html`; the two are NOT in sync, so a change to one is not automatically reflected in the other.
- **assets/** — static images (logo, product vials).
- Navigation also links to `about.html`, `faq.html`, `contact.html` — these pages do not exist yet.

## Design system (CSS custom properties)

Defined as `:root` custom properties — inline in `index.html` for the landing page, and in `assets/styles.css` for the legal pages (same token values). Copy this block when porting the brand to another page or app.

### Colors

| Token            | Value                       | Role                                                     |
| ---------------- | --------------------------- | -------------------------------------------------------- |
| `--bg`           | `#f8f4ed`                   | Page background (warm cream)                             |
| `--bg-deep`      | `#efe8db`                   | Slightly deeper cream for layered backgrounds            |
| `--paper`        | `#ffffff`                   | Card / surface background                                |
| `--ink`          | `#1a2024`                   | Primary text, dark surfaces, primary button              |
| `--ink-soft`     | `#5a6770`                   | Secondary / body-muted text                              |
| `--teal`         | `#205e76`                   | Brand accent — links, eyebrows, italics, stat numbers    |
| `--teal-deep`    | `#143a4a`                   | Deeper teal — hover states, contact form, hero gradient  |
| `--sand`         | `#e8dcc3`                   | "How it works" section background                        |
| `--sand-deep`    | `#d4c4a1`                   | Deeper sand accent                                       |
| `--line`         | `rgba(26,32,36,.1)`         | Hairline borders                                         |
| `--shadow`       | `0 1px 0 rgba(26,32,36,.04), 0 30px 60px -32px rgba(26,32,36,.2)` | Card elevation |

Status / utility colors (not tokens, used inline): required-asterisk red `#c0392b`, neutral "no" circle `#b9bfc4`.

### Typography

- **Headings**: Nunito (weights 400, 500, 600, 700, 800) — `font-family:'Nunito',sans-serif`
- **Body / UI**: Inter (weights 400, 500, 600, 700) — `font-family:'Inter',system-ui,sans-serif`
- Both loaded from Google Fonts via a single `<link>` in `<head>`.
- Heading defaults: `letter-spacing:-0.02em`, color `var(--ink)`, weight 500 unless overridden.
- Italic accent class `.italic` is Nunito italic in `var(--teal)`.
- Heading scale (fluid via `clamp`):
  - `h1` — `clamp(36px, 7vw, 104px)`, line-height 1.02, weight 400
  - `h2` — `clamp(28px, 4.4vw, 64px)`, line-height 1.06, weight 500
  - `h3` — `clamp(24px, 2.4vw, 32px)`, line-height 1.15
  - `h4` — 22px, line-height 1.25, weight 600
- Body — Inter 16px / line-height 1.55, antialiased.

### Layout

- `--container: 1280px` — max content width. Container padding 32px (20px under 520px).
- Border-radius: 8px (buttons), 14–18px (textareas, small surfaces), 20–24px (cards), 100px (pills, inputs, icon dots).
- Breakpoints: 980px (nav collapse, how-grid → 2col), 880px (hero meta/visual stack, footer → 2col), 780px (treatments stack, sections tighten), 680px (comparison table), 580px (contact form single-col), 520px (container/section padding tighten, how-grid → 1col).
- Sticky header height ≈ 72px; anchored sections use `scroll-margin-top:90px`.
- Smooth-scroll enabled site-wide (`html{scroll-behavior:smooth}`), disabled under `prefers-reduced-motion`.

### Buttons

- `.btn-primary` — `--ink` background, white text; hover → `--teal`.
- `.btn-teal` — `--teal` background; hover → `--teal-deep`.
- `.btn-outline` — transparent with `--ink` border; hover inverts.
- `.btn-ghost` — transparent, no border; hover sits on `rgba(26,32,36,.06)`.
- `.btn-lg` — taller padding for hero CTAs.

## External integrations

- Eligibility / intake flow: `https://intake.amlawellness.com`
- Patient portal / login: `https://portal.amlawellness.com`
- LegitScript certification badge links to `https://www.legitscript.com/`
