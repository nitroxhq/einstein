# Einstein — Internal Developer Notes

> *Created: October 26, 2026 (12:49 PM)*  
> *NitroxHQ Research & Engineering Workspace*

---

## 1. Context & Genesis

Academic grade checking is an anxiety-inducing open circuit:
1. Students check Canvas / Blackboard / PowerSchool.
2. An overall percentage drops by 2.3%.
3. Zero causal context is provided. Was it a zero entered for an upcoming assignment? Did an 85% on a heavily weighted exam drag down a homework average? Did a syllabus curve shift the class mean?
4. Students rush to RogerHub or manually enter formulas in Google Sheets to guess what they need on the final.

Einstein solves this with:
- **The Delta Explainer:** Computes $\Delta P = P_{\text{post}} - P_{\text{pre}}$, decomposes category weight leverage, and outputs a plain-English explanation.
- **The What-If Lab:** Forward simulation and backward goal-seeking ($P(x) \ge Target$).
- **File-First Sovereignty:** All data stored locally in JSON / Markdown (`~/.nitrox/einstein/courses/*.json`).

---

## 2. Design Alignment with Neighbor Repositories

Inspected `tesseract` and `nitroxhq.github.io`:
- **Architecture:** Zero-build vanilla HTML5, CSS3, ES6 JavaScript. No npm runtime dependencies.
- **Navbar:** Dynamic partial injection (`navbar.html`) via `fetch()` in `script.js`.
- **Theming:** Three-way theme switch (`device` | `dark` | `light`) stored in `localStorage` key `'nitrox-theme'`. Handled before render in `theme.js` to avoid FOUC.
- **Typography:**
  - Headings: `EB Garamond` / `Instrument Serif` (classic academic elegance).
  - Body: `Inter` / `Instrument Sans` (modern, ultra-clean UI).
  - Data / Monospace: `Geist Mono` (code, JSON schemas, score pills).
- **Styling Tokens:**
  - Primary Accent: Indigo `#4f46e5` to Violet `#7c3aed`.
  - Nitrox Blue Accent: `#3232ff`.
  - Obsidian Dark Background: `#0b0b14`.

---

## 3. LMS Integration Roadmap & Connectors

Future data ingestion pathways:
1. **Manual File Editing:** Edit `course.json` directly or use the What-If Lab web UI.
2. **LMS Export Connectors (Planned):**
   - Canvas LMS GraphQL / REST API token sync.
   - PowerSchool HAC scraper / JSON exporter.
   - Blackboard Learn calendar & gradebook export parser.
   - Google Classroom Google Drive sheet sync.
3. **Privacy Architecture:**
   - Connectors run strictly on client machine.
   - Zero institutional credentials or grades uploaded to external Nitrox servers.
