# einstein — todo

*created: 10.26.2026 11:23a | updated: 10.26.2026 12:49p*

---

## 1. repository discovery & structure alignment
- [x] scan `C:\Users\K1404887\Desktop\git-dev` for neighboring nitrox repositories
  - identified: `einstein`, `tesseract`, `nitroxhq.github.io`, `prism`
- [x] inspect structural patterns across `tesseract` and `nitroxhq.github.io`
  - offline-first vanilla web showcase (HTML5/CSS3/ES6, no bundler lock-in)
  - componentized navbar (`navbar.html` loaded dynamically via `script.js`)
  - centralized theme state (`theme.js` using `localStorage` key `nitrox-theme`)
  - offline vector assets and local font styling
  - internal developer notes and task tracking in `.dev/`
- [x] formulate proposed structure plan for `einstein`
- [x] document proposed structure in `STRUCTURE.md`
- [x] extract unified design guidelines in `docs/design.md`

---

## 2. einstein documentation & identity
- [x] discover einstein product vision from `nitroxhq.github.io/index.html`:
  > *"a grade assistant that explains what changed instead of just showing a number, with a what-if lab for the assignment you haven't turned in yet."*
- [x] craft flagship `README.md` aligned with nitrox / tesseract design standard
  - badges, mission statement, core architectural pillars (file-first, privacy, delta engine)
  - features & consolidation breakdown (replaces RogerHub, manual grade spreadsheets, fragmented LMS grade views)
  - expanded comparative analysis to evaluate specialized grade apps (GradeWay, Gradiate) vs Einstein
  - closed-loop feedback question framing, portable wikilinks, and Tesseract ecosystem synergy section
  - the "what-if lab" feature highlight
  - local execution instructions & community links
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
- [x] set up `theme.js` (shared `nitrox-theme` preference: `device` | `dark` | `light`)
- [x] vendor vector assets:
  - `assets/white-logo-svg.svg`
  - `assets/logo/einstein-logo.svg`
  - `assets/favicon.svg`
  - `assets/readme/einstein-banner.svg`
- [x] set up `navbar.html` with einstein branding, divider, nitrox branding, links, and theme toggle button
- [x] set up `script.js` containing navbar dynamic loader, theme switcher, and interactive What-If simulation engine

---

## 4. landing page & showcase
- [/] author `styles.css` containing nitrox color tokens, typography, dark/light theme rules, bento grid, and interactive lab widget (in progress)
- [/] draft simple, elegant `index.html` landing page matching nitrox aesthetic (in progress)
- [/] create `about.html` ("why einstein exists" manifesto) (in progress)

---

## 5. future extensions & tooling (phase 4)
- [ ] standalone interactive lab sandbox (`lab.html`)
- [ ] sample course data files (`examples/courses/chem-201.json`)
- [ ] local CLI parser utility
- [ ] LMS connectors (Canvas, PowerSchool HAC)
