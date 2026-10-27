# Einstein — Development Worklog

> In-repo timeline for feature work, page changes, and design decisions.
> For everyday non-code systems, see `~/Documents/(01)-dev-git/@projects/projects-worklog.md`.

---

## 10.27.2026 12:05am CDT — About page, bottom CTA, tighter spacing, lab GPA preview

### Overview

Phase 1 of the follow-up pass: emoji favicon, a closing CTA, a real `about.html` built from the overview doc, the overview doc renamed, tighter spacing between sections, and a lab preview that now shows a GPA readout plus a "preview only" note. The hero redesign and the UI-concept SVG illustrations are deliberately deferred to a second phase.

### What changed

- **`assets/graduation-cap-emoji.svg` / `index.html` / `about.html`** — the favicon now points at the provided emoji SVG.
- **`index.html`** — added a closing CTA card before the footer (`Try the lab`, `Read the vision`, `Why I built this`); added a `preview` badge and a footnote to the lab; added a `Term GPA (4.0)` output; the inline recalc now maps the projected percentage to 4.0 points and blends it into a fake five-course 3.60 term.
- **`styles.css`** — hero `min-height` 92vh → 78vh and bottom padding 8rem → 4rem; section padding 7rem → 4.5rem; lab margin-top 3rem → 2rem; footer 3rem → 2.5rem; added `.cta-card`, `.about-hero`, `.lab-badge`, `.sim-outputs`, `.lab-footnote`, and a tighter consecutive-lede rule; the mobile overrides follow the same reduction.
- **`about.html`** — new page: hero, the problem (four cards), why I made it, the three tenets, who it's for, and a CTA. Sourced from the overview doc and fleshed out with the "why".
- **`docs/overview.md` → `docs/einstein-app-overview.md`** — renamed; references updated in `index.html`, `about.html`, `README.md`, `STRUCTURE.md`, `todo.md`.
- **`script.js`** — removed `about` from the fallback nav to match `navbar.html` (the user had commented it out).

### Decisions

- Named the doc `docs/einstein-app-overview.md` rather than the literal `inkling-app-overview` — the repo is einstein and this is the app overview. One rename away if the literal name was intended.
- GPA uses a rough 4.0 mapping (93+ = 4.0 down to <65 = 0) blended with five fake courses at 3.60, so the number moves with the slider and shows scope without pretending to be a real transcript.
- Kept `about` out of the nav (the user removed it) and linked it from the closing CTA instead.

### Validation

- `http://localhost:8123` returns 200 for `index.html`, `about.html`, and `docs/einstein-app-overview.md`; the favicon serves as `image/svg+xml`.
- Desktop: the CTA renders as a gradient card; the lab shows the preview badge, three outputs, and the footnote.
- Live GPA math verified: `#labMajorAvg` 84.5 → 100 moved Projected Overall 87.7% → 93.9%, Required 93.4% → 68.6%, and Term GPA 3.55 → 3.67; restored to 84.5.
- About page renders with the sticky nav, centered headings, and bento cards.
- Mobile: the DOM snapshot at 390px shows the stacked layout; the screenshot capture timed out twice, so the mobile visual is unconfirmed by image.
- Not verified: the emoji favicon's rendering in a real browser tab (an SVG `<text>` emoji depends on the system font).

### Subtasks

- [x] Emoji favicon
- [x] Bottom CTA
- [x] Reduce section spacing
- [x] Rename the overview doc and update references
- [x] `about.html` with the "why I made it" content
- [x] Lab preview note + GPA math
- [x] Remove `about` from the fallback nav
- [ ] Hero redesign (deferred)
- [ ] UI-concept SVG illustrations (deferred)

*Model: DeepSeek V4.1 Flash Free (opencode, provider: opencode) — 10.27.2026 12:05am CDT*

---

## 10.27.2026 01:11am CDT — Landing page visual pass: nav, centering, lab table, hover

### Overview

Round of fixes after reviewing the first landing-page build. The page structure was sound but the navbar was split into two pills, the features section was left-aligned with a lopsided bento grid, the lab preview stacked its table above the slider instead of beside it, and the doc cards lacked the feature-card hover. This pass makes the page match the `tesseract` / `nitroxhq.github.io` nav and card language and wires the lab table into the live math.

### What changed

- **`navbar.html`** — wrapped the brand group, menu, and actions in a single `<nav class="nitrox-nav">`. Before, the two sibling `<div>`s meant the pill CSS only wrapped the brand and the links floated outside it. Replaced the masked nitrox mark with an inline SVG (the CSS `mask` was rendering as a solid blue box), and kept the grad-cap emoji as the Einstein logo.
- **`styles.css`** — rewrote the nav block around `.nitrox-nav` with explicit nav tokens (`--nav-bg`, `--nav-ink`, `--nav-line`, `--nav-hover-bg`, `--nav-shadow`, `--nav-track-bg`, `--nav-active-bg`); removed the dead `.hero-brand` / `.hero-meta` rules left after the eyebrow deletion; centered section labels, headings, and ledes while keeping card copy left-aligned; changed the bento grid to two columns with the third card full-width; added a `.lab-grid` two-column layout with table on the left; styled the editable `.lab-table`; added `transform` to the `.doc-card` transition so doc cards lift like feature cards.
- **`index.html`** — removed the "nitrox ecosystem" eyebrow and the three-item meta line under the hero buttons; rebuilt the lab preview as a `.lab-grid` with an editable table (`Major avg`, `Minor avg`, `Other grade avg`, `Comprehensive Final`) exposing both score and weight inputs with ids; removed the meta-documentation line under the lab box; the inline recalc now reads those inputs instead of a hardcoded course object.
- **`script.js`** — updated `renderFallbackNavbar` to emit the same single-`nav` structure; fixed active-link marking to match the link's file **and** hash, so `index.html#features`, `#what-if-lab`, and `#comparison` no longer all light up on the home page; added a `hashchange` listener.

### Decisions

- Adopted the `tesseract` nav pattern exactly: one floating pill, brand left, links center, theme toggle right. The split-pill version was the root cause of the "weird navbar".
- Wired the table inputs into the recalc rather than leaving the table decorative. The table is now the source of truth for the simulation, which is what makes it worth showing.
- Used a two-column bento instead of three so the wide "File-First" card fills the row and leaves no empty cell.
- Matched file + hash for the active nav (the `tesseract` approach) rather than building a scroll-spy, keeping the behavior predictable and the code small.

### Validation

- Served the repo at `http://localhost:8123` and checked the rendered page in the browser panel at 1440×900.
- Nav renders as one centered pill with brand, links, and theme toggle in a single row.
- Features section is centered and the grid is two columns; the wide card spans the row.
- Lab section shows the table on the left and the slider/outputs on the right.
- Live recalc verified: changing `#labFinalWeight` from 25 to 50 moved Projected Overall from `87.7%` to `108.7%` and Required for 90% from `93.4%` to `46.7%`, then restored to 25.
- Doc cards now transition `border-color` and `transform` together.
- Not verified: the grad-cap emoji renders as a tofu box in the headless capture browser (no emoji font); it should render normally in a desktop browser. The `#comparison` nav link still has no target section.

### Subtasks

- [x] Navbar rebuilt as a single floating pill matching the other Nitrox repos
- [x] Grad-cap emoji logo kept; inline SVG for the nitrox mark
- [x] Eyebrow and hero meta line removed
- [x] Features section centered with a two-column bento and proper spacing
- [x] Lab table moved left, editable averages and weights, wired to recalc
- [x] Meta-documentation line under the lab box removed
- [x] Doc cards get the feature-card hover
- [x] Active nav link matches file + hash
- [ ] Add or remove the `#comparison` target (nav link is currently dead)
- [ ] Confirm emoji rendering on the owner's desktop browser

*Model: DeepSeek V4.1 Flash Free (opencode, provider: opencode) — 10.27.2026 01:11am CDT*

---

## 10.26.2026 05:12pm CDT — Landing page: index.html + styles.css

### Overview

Continued from the previous session's scaffold (navbar.html, script.js, theme.js, docs/). Built the landing page (`index.html`) and a matching theme-aware stylesheet (`styles.css`) referencing the design patterns from `tesseract` (hero typewriter, bento grid, serif headings, clean glass nav) and `nitroxhq.github.io` (work-section structure, docs references, closing call-to-action). The page references `docs/overview.md`, `docs/architecture.md`, and `docs/data-schema.md` directly.

### What changed

- **New `index.html`**: Hero with delta-engine messaging ("explains what changed"), feature bento cards (Delta Engine, What-If Lab, File-First), interactive teaser slider that calculates projected grades (derived from `script.js`'s `COURSES_DATA`), docs reference cards, and footer with einstein logo SVG.
- **New `styles.css`**: Theme-aware tokens (`light-dark()`), purple/blue accent from `theme.js`, serif + sans pairing, sticky nav support, responsive bento grid, lab preview widget.

### Design references

- `tesseract/index.html` — hero structure with ghost phrase / typewriter reserve, bento feature grid, FAQ-like reference section.
- `nitroxhq.github.io/index.html` — section labels (`01 — selected work`, etc.), work-plate cards, docs-linked content.
- `tesseract/styles.css` — color tokens (`--tess-purple`, `--nitrox-blue`), glass surfaces (`light-dark()`), serif/sans pairing (`EB Garamond` / `Inter`).
- `einstein/docs/` — vision, delta engine math, data schema referenced in card copy and links.

### Decisions

- Used `light-dark()` so one stylesheet serves `device` / `dark` / `light` without duplicate rules, matching `theme.js`.
- Kept the interactive teaser minimal (slider + live math) rather than duplicating the full simulator, linking to `script.js` for the full engine.
- Referenced docs as inline links (`docs/overview.md`) rather than external URLs, reinforcing the file-first identity.

### Validation

- `script.js` and `navbar.html` load via existing fetch mechanism.
- `theme.js` executes before first paint; no FOUC.
- No external CDN dependencies (fonts are referenced but not loaded remotely; `assets/fonts/inter/` exists locally for offline use if needed).
- Page is responsive: bento cards collapse to single column below 720px.

### Human actually learned

- `light-dark()` removes the need for separate `.dark` / `.light` CSS files when paired with a `data-theme` bootstrap script.
- Referencing markdown docs from HTML links keeps documentation discoverable without duplicating content.

### Subtasks

- [x] `index.html` — landing page with hero, features, lab teaser, docs refs
- [x] `styles.css` — theme-aware design tokens, bento grid, responsive rules
- [ ] `.dev/WORKLOG.md` created
- [ ] Confirm with user whether full `assets/fonts/inter/` vendor files are needed or if system fonts are sufficient for this phase

---

*Model: Inkling/free (openrouter) — 10.26.2026 05:12pm CDT*
