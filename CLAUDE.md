# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

AmlaWellness is a static marketing landing page for a GLP-1 telehealth brand. It's a single `index.html` file with all CSS inlined in a `<style>` block — no build tools, no JavaScript, no framework.

## Development

Open `index.html` directly in a browser or serve with any static server (`python3 -m http.server`). There is no build step, no package manager, and no test suite.

## Architecture

- **index.html** — the entire site: markup + inline CSS. Sections: announcement bar, sticky header, hero, trust pills, treatments, how-it-works, comparison table, disclaimer, pillars, FAQ (native `<details>`), final CTA, footer.
- **assets/** — static images (logo, product vials). Referenced from `index.html`.
- Navigation links to `about.html`, `faq.html`, `contact.html`, `privacy.html`, `terms.html` — these pages do not exist yet.

## Design system (inline CSS custom properties)

Defined as `:root` custom properties in `index.html`. Copy this block when porting the brand to another page or app.

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
