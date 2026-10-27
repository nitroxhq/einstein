# einstein — todo

*created: 10.26.2026 11:23a | updated: 10.26.2026 12:35p*

---

## 1. repository discovery & structure alignment
- [x] scan `C:\Users\K1404887\Desktop\git-dev` for neighboring nitrox repositories
  - identified: `einstein`, `tesseract`, `nitroxhq.github.io`, `prism`
- [x] inspect structural patterns across `tesseract` and `nitroxhq.github.io`
  - offline-first vanilla web showcase (HTML5/CSS3/ES6, no bundler lock-in)
  - componentized navbar (`navbar.html` loaded dynamically via `script.js`)
  - centralized theme state (`theme.js` using `localStorage` key `nitrox-theme`)
  - offline font assets (`assets/fonts/inter/`, etc.)
  - internal developer notes and task tracking in `.dev/`
- [x] formulate proposed structure plan for `einstein`
- [x] document proposed structure in `STRUCTURE.md` for user confirmation
- [ ] confirm structure plan with user before generating full web scaffolding

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
  - `docs/einstein-app-overview.md` — product vision, philosophy, and user experience
  - `docs/architecture.md` — delta calculation engine, what-if lab simulation logic, and file-first storage
  - `docs/data-schema.md` — local object model for courses, grading scales, category weights, and assignments

---

## 3. scaffolding & shared components (pending plan confirmation)
- [ ] create `.dev/` directory mirroring `nitroxhq.github.io/.dev/`
  - `.dev/todo.md`
  - `.dev/notes.md`
- [ ] set up `theme.js` (shared `nitrox-theme` preference)
- [ ] set up `navbar.html` with einstein branding, links, and offline phosphor icons
- [ ] set up baseline `styles.css` containing nitrox color tokens, typography, and dark/light mode rules
- [ ] vendor `assets/fonts/inter/` for offline font rendering

---

## 4. landing page & showcase (deferred to phase 3: "later")
- [ ] draft simple, elegant `index.html` landing page matching nitrox aesthetic
- [ ] implement interactive "what-if lab" teaser/playground widget
- [ ] add typewriter effect and feature showcase bento grid
- [ ] create `about.html` ("why einstein exists" manifesto)

