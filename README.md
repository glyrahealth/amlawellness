# Amla Wellness — Landing Page

A static marketing site for **Amla Wellness**, a GLP-1 and peptide telehealth brand. Three pages (`index.html`, `privacy.html`, `terms.html`) sharing a header and footer via Jekyll includes. No framework and no client-side build tooling — the landing page is markup + inline CSS plus one small inline `<script>` for the goal selector.

## Run locally

**The pages must be served by Jekyll.** Every page starts with a front-matter block and uses Liquid `{% include %}` tags, so opening `index.html` directly (or serving the folder with `python3 -m http.server`) shows raw front matter and no header/footer.

```bash
jekyll serve --livereload
# then visit http://127.0.0.1:4000
```

Run it from the repo root. There is no `Gemfile`, so no `bundle exec` is needed. To build without serving: `jekyll build` (output lands in the git-ignored `_site/`).

If `jekyll` isn't installed, install it into Homebrew Ruby (the system Ruby is not writable):

```bash
brew install ruby
gem install jekyll bundler
```

To reproduce the exact GitHub Pages build environment instead, use the `ghcr.io/actions/jekyll-build-pages` Docker image.

There is no package manager and no test suite.

## Project structure

```
.
├── index.html        # landing page — markup + inline CSS + goal-selector script
├── privacy.html      # privacy policy
├── terms.html        # terms of service
├── _config.yml       # Jekyll config (excludes project docs from the build)
├── _includes/        # header.html, footer.html — shared across all three pages
├── _layouts/         # none.html — passthrough layout, defeats the default Pages theme
├── assets/
│   ├── styles.css    # shared CSS for the legal pages only (not the landing page)
│   └── *.png         # logo, vial photos, goal-card art, LegitScript badge
└── CLAUDE.md         # design-system reference (color tokens, type scale, layout rules)
```

### Jekyll notes

- The `layout: none` front matter on each page is required. It makes Jekyll process the Liquid includes while emitting the page as authored — without it, GitHub Pages' default theme wraps these complete HTML documents inside a theme layout. Don't remove the front matter, and don't add a `.nojekyll` file (includes stop working).
- Page content is run through Liquid, so a literal double-brace or brace-percent sequence in the markup is parsed as a Liquid tag and can break the build. Escape such snippets with a `raw`/`endraw` block.
- `assets/styles.css` covers the **legal pages only**. The landing page's CSS has diverged and stays inline in `index.html`; the two are not in sync.

### Page sections (top to bottom)

Sticky header → hero (headline + 3 goal cards) → **treatments (goal selector)** → how-it-works → comparison table → pillars → FAQ → contact → final CTA → footer.

The trust-pill row and the standalone disclaimer section are currently commented out in `index.html`.

### Goal selector

The Treatments section has a Yucca-style segmented control that tailors the cards to the visitor's goal:

| Goal                  | Plan(s)                                      |
| --------------------- | -------------------------------------------- |
| **Weight Loss**       | Compounded Semaglutide · Compounded Tirzepatide |
| **Metabolism & Energy** | NAD+ Injection (single, centered card)     |
| **Muscle Recovery**   | Sermorelin (single, centered card)           |

Three entry points drive it, all wired to the same handler in the inline script: the segmented control itself, the three hero goal cards, and the treatment links in the footer (`[data-goal-card]`). The selection persists across reloads via `localStorage` (`amla-goal` key) and respects `prefers-reduced-motion`.

> **Provisional:** peptide pricing (NAD+ $159, Sermorelin $129) is not final. The NAD+ and Sermorelin cards also still point at the bare intake root rather than a goal-specific intake path like the GLP-1 cards do.

## Design system

Colors, typography, and layout rules live as `:root` custom properties — inline in `index.html` for the landing page, and in `assets/styles.css` for the legal pages (same token values). Both are documented in [`CLAUDE.md`](./CLAUDE.md). In short: warm cream background (`--bg #f8f4ed`), petrol-teal accent (`--teal #205e76`), Nunito for headings + Inter for body, both loaded from Google Fonts.

## External integrations

| Purpose                   | URL                                                              |
| ------------------------- | ---------------------------------------------------------------- |
| Eligibility / intake      | `https://intake.amlawellness.com`                                |
| Weight-loss intake (GLP-1 cards) | `https://intake.amlawellness.com/start-online-visit/weight-loss` |
| Patient portal / login    | `https://portal.amlawellness.com`                                |
| LegitScript certification | `https://www.legitscript.com/`                                   |

## Deployment

Served via GitHub Pages from the `main` branch — pushing to `main` publishes the site. The custom domain is configured in the repository's Pages settings.

## Not yet built

Navigation links to `about.html`, `faq.html`, and `contact.html` — these pages do not exist yet. (`privacy.html` and `terms.html` do exist.)
