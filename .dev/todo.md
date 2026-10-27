# einstein — developer sprint tracker

*created: 10.26.2026 11:23a | updated: 10.26.2026 12:49p*

---

## 1. repository discovery & structure alignment
- [x] scan `C:\Users\K1404887\Desktop\git-dev` for neighboring nitrox repositories (`tesseract`, `nitroxhq.github.io`, `prism`)
- [x] inspect structural patterns across `tesseract` and `nitroxhq.github.io`
  - offline-first vanilla web showcase (HTML5/CSS3/ES6, no bundler lock-in)
  - componentized navbar (`navbar.html` loaded dynamically via `script.js`)
  - centralized theme state (`theme.js` using `localStorage` key `nitrox-theme`)
  - font fallbacks & offline resilience
  - internal developer notes and task tracking in `.dev/`
- [x] formulate proposed structure plan for `einstein`
- [x] document proposed structure in `STRUCTURE.md`
- [x] extract and align design standards in `docs/design.md`

---

## 2. einstein documentation & identity
- [x] discover einstein product vision from `nitroxhq.github.io/index.html`
- [x] craft flagship `README.md` aligned with nitrox / tesseract design standard
  - badges, mission statement, core architectural pillars (file-first, privacy, delta engine)
  - features & consolidation breakdown (replaces RogerHub, manual grade spreadsheets, LMS views)
  - comparative analysis (GradeWay, Gradiate vs Einstein)
  - closed-loop feedback framing & portable wikilinks
- [x] author core documentation in `docs/`:
  - `docs/overview.md` — product vision, philosophy, and user experience
  - `docs/architecture.md` — delta calculation engine, what-if lab simulation logic, and file-first storage
  - `docs/data-schema.md` — local object model for courses, grading scales, category weights, and assignments
  - `docs/design.md` — comprehensive design system, color tokens, typography, and component hierarchy

---

## 3. scaffolding & shared components
- [x] create `.dev/` directory mirroring `nitroxhq.github.io/.dev/`
  - `.dev/todo.md`
  - `.dev/notes.md`
- [x] create `theme.js` (shared `nitrox-theme` preference: `device` | `dark` | `light`)
- [x] create vector assets:
  - `assets/white-logo-svg.svg` (Nitrox hourglass brand mark)
  - `assets/logo/einstein-logo.svg` (Einstein Delta-Sigma balance mark)
  - `assets/favicon.svg` (vector favicon)
  - `assets/readme/einstein-banner.svg` (flagship banner)
- [x] set up `navbar.html` with einstein branding, divider, nitrox branding, links, and theme toggle button
- [x] author `script.js` with dynamic navbar injection, theme toggle binding, and interactive What-If Lab engine

---

## 4. landing page & showcase
- [x] draft interactive What-If Lab calculation logic in `script.js`
- [/] build comprehensive `styles.css` matching Nitrox & Tesseract styling (in progress)
- [/] build `index.html` landing page (in progress)
  - hero section with badge, typography, and primary/secondary CTAs
  - live interactive What-If Lab simulation widget
  - bento grid showcasing 6 architectural pillars
  - feature comparison table vs LMS / RogerHub / Gradiate
  - interactive FAQ accordion
  - pre-footer CTA & official Nitrox footer
- [/] create `about.html` ("why einstein exists" manifesto) (in progress)

---

## 5. future roadmap & technical extensions (phase 4)
- [ ] standalone interactive lab sandbox page (`lab.html`)
- [ ] sample course data files (`examples/courses/chem-201.json`, `math-241.json`)
- [ ] local CLI parser utility (`cli/einstein.py` or `cli/einstein.js`)
- [ ] LMS connectors (Canvas REST API export, PowerSchool HAC parser)
