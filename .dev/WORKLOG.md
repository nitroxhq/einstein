# Einstein — Development Worklog

> In-repo timeline for feature work, page changes, and design decisions.
> For everyday non-code systems, see `~/Documents/(01)-dev-git/@projects/projects-worklog.md`.

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
