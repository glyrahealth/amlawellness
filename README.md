# Amla Wellness — Landing Page

A static marketing landing page for **Amla Wellness**, a GLP-1 and peptide telehealth brand. The entire site is a single `index.html` with all CSS inlined — no build tools, no framework, and one small inline `<script>` for the goal selector.

## Run locally

No build step and no dependencies. Either:

```bash
# Option 1 — open the file directly
open index.html

# Option 2 — serve with any static server (recommended; nicer for relative asset paths)
python3 -m http.server 8000
# then visit http://localhost:8000
```

Any static server works (`npx serve`, `php -S localhost:8000`, etc.). There is no package manager and no test suite.

## Project structure

```
.
├── index.html        # the entire site — markup + inline CSS + goal-selector script
├── privacy.html      # privacy policy
├── terms.html        # terms of service
├── assets/           # logo, vial product photo, LegitScript badge
└── CLAUDE.md         # design-system reference (color tokens, type scale, layout rules)
```

### Page sections (top to bottom)

Announcement bar → sticky header → hero → trust pills → **treatments (goal selector)** → how-it-works → comparison table → disclaimer → pillars → FAQ → final CTA → footer.

### Goal selector

The Treatments section has a Yucca-style segmented control that tailors the cards to the visitor's goal:

| Goal                  | Plan(s)                                      |
| --------------------- | -------------------------------------------- |
| **Weight Loss**       | Compounded Semaglutide · Compounded Tirzepatide |
| **Metabolism & Energy** | NAD+ Injection (single, centered card)     |
| **Muscle Recovery**   | Sermorelin (single, centered card)           |

The selection persists across reloads via `localStorage` (`amla-goal` key) and respects `prefers-reduced-motion`.

> **Placeholders:** peptide pricing (NAD+ $159, Sermorelin $129) is provisional pending final plans, and the peptide cards use text placeholders rather than photos. Drop real peptide photography into `assets/` and swap the `<span class="ph">` for an `<img>` when ready.

## Design system

Colors, typography, and layout rules live as `:root` custom properties in `index.html` and are documented in [`CLAUDE.md`](./CLAUDE.md). In short: warm cream background (`--bg #f8f4ed`), petrol-teal accent (`--teal #205e76`), Nunito for headings + Inter for body, both loaded from Google Fonts.

## External integrations

| Purpose                 | URL                                |
| ----------------------- | ---------------------------------- |
| Eligibility / intake    | `https://intake.amlawellness.com`  |
| Patient portal / login  | `https://portal.amlawellness.com`  |
| LegitScript certification | `https://www.legitscript.com/`   |

## Deployment

Served via GitHub Pages from the `main` branch — pushing to `main` publishes the site. The custom domain is configured in the repository's Pages settings.

## Not yet built

Navigation links to `about.html`, `faq.html`, and `contact.html` — these pages do not exist yet. (`privacy.html` and `terms.html` do exist.)
