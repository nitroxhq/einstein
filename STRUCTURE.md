# Einstein — Repository Structure Plan

> **NitroxHQ Project Blueprint**  
> Prepared: October 26, 2026 (11:28 AM)  
> Repository: `https://github.com/nitroxhq/einstein.git`  
> Reference Models: `tesseract` & `nitroxhq.github.io` in `C:\Users\K1404887\Desktop\git-dev`

---

## 1. Analysis of Neighboring NitroxHQ Repositories

An inspection of `C:\Users\K1404887\Desktop\git-dev` revealed four core repositories:

| Repository | Purpose | Architecture Pattern |
| :--- | :--- | :--- |
| **`tesseract`** | Productivity supertool showcase & landing site | Vanilla HTML5/CSS3/ES6, componentized `navbar.html`, `theme.js`, local Inter/Garamond fonts, `assets/readme/`, rich README. |
| **`nitroxhq.github.io`** | Organization homepage & product index | Root landing, `.dev/` for internal developer notes & todo tracking, shared `styles.css` token system, offline Phosphor SVG icons. |
| **`prism`** | Feed reader tool | Clean early scaffold repository with targeted positioning. |
| **`einstein`** | Grade assistant & What-If Lab | Clean Git repository ready for structural alignment with Nitrox studio standards. |

### Shared NitroxHQ Conventions Identified
1. **Zero-Build Vanilla Architecture:** Web presentations require no npm build step or bundler overhead (`python -m http.server` or `npx serve` works out of the box).
2. **Offline-First Resilience:** Fonts (Inter, Geist Mono, EB Garamond) and SVG icons (Phosphor) are vendor-hosted locally. No external runtime CDNs that fail offline.
3. **Unified Brand State:** Color theme (`device`, `dark`, `light`) is synchronized across all Nitrox properties via `localStorage` key `'nitrox-theme'` executed before first paint via `theme.js`.
4. **Shared Token System:** CSS `light-dark()` tokens rooted in `:root` with primary branding accents (`--nitrox-blue: #3232ff`).
5. **Componentized Ingestion:** Dynamic components like `navbar.html` are fetched asynchronously and injected by `script.js`.
6. **Internal Engineering Notes in `.dev/`:** Work-in-progress task lists and internal scratchpads are kept in `.dev/todo.md`.

---

## 2. Proposed Architecture for `einstein`

Modeled directly on the proven architecture of `tesseract` with the internal organization of `nitroxhq.github.io`, the target structure for `einstein` is outlined below:

```text
einstein/
├── .dev/                               # Internal development workspace & tracking
│   ├── todo.md                         # Task lists, timestamps, sprint goals
│   └── notes.md                        # Technical ideas, LMS reverse-engineering notes
│
├── .git/                               # Version control (main branch, remote: nitroxhq/einstein)
│
├── docs/                               # Comprehensive project documentation
│   ├── overview.md                     # Vision, target audience, core capabilities
│   ├── architecture.md                 # Delta Engine, What-If Lab logic, offline storage
│   ├── data-schema.md                  # JSON/YAML data format for courses, weights, assignments
│   └── lms-integrations.md             # Connectors for Canvas, Blackboard, PowerSchool, Google Classroom
│
├── assets/                             # Local assets and media (zero remote CDN dependencies)
│   ├── favicon.svg                     # Vector favicon
│   ├── favicon-32.png                  # Raster favicon
│   ├── apple-touch-icon.png            # Touch icon
│   ├── logo/
│   │   ├── einstein-logo.svg           # Einstein product mark
│   │   └── einstein-logo-white.svg     # Monochrome mark
│   ├── readme/                         # Documentation illustrations & banner assets
│   │   └── banner.png                  # High-resolution README header
│   └── fonts/
│       └── inter/                      # Local Inter variable font files
│           ├── inter.css
│           ├── InterVariable.woff2
│           └── InterVariable-Italic.woff2
│
├── index.html                          # Landing page & showcase (Phase 3)
├── about.html                          # "Why Einstein exists" / philosophy page
├── lab.html                            # Interactive What-If grade simulator web demo
├── navbar.html                         # Reusable top navigation partial
├── styles.css                          # Shared stylesheet, CSS variables, dark/light theme tokens
├── script.js                           # Navbar injection, interactive What-If calculator demo
├── theme.js                            # Immediate theme bootstrap script (<head>)
│
├── STRUCTURE.md                        # This document (architectural blueprint & roadmap)
├── README.md                           # Flagship repository README (badges, features, tables)
└── todo.md                             # Root quick-access task tracker
```

---

## 3. Component Details & Functional Roles

### A. Documentation Layer
- **`README.md`**: The primary public-facing face of the repo. Contains shields/badges, product thesis ("explains what changed instead of just showing a number"), feature comparison table, What-If Lab highlights, and Nitrox philosophy.
- **`docs/`**: Detailed technical guides for contributors and curious users who want to know how the delta calculation algorithms work or how their school's LMS data is parsed.
- **`STRUCTURE.md`**: The system map documenting how the repository is structured and maintained.

### B. Developer Layer (`.dev/`)
- Kept inside `.dev/` (as in `nitroxhq.github.io/.dev/`):
  - Tracks scratch notes, commit logs, and unfinished ideas without polluting the root folder.
  - Mirrored by root `todo.md` for immediate visibility.

### C. Web Showcase Layer (`index.html`, `about.html`, `lab.html`)
- Built using semantic HTML5 and vanilla JavaScript.
- Uses dynamic navigation via `navbar.html` fetched by `script.js`.
- Eliminates flash of unstyled content (FOUC) through inline execution of `theme.js` in `<head>`.
- Supports the Nitrox three-way theme picker: `device` | `dark` | `light`.

### D. Asset Directory (`assets/`)
- Self-contained: all fonts, icons, and readme graphics reside locally in the repository.
- Avoids external dependencies that could break if offline or behind school firewalls.

---

## 4. Implementation Stages

| Stage | Scope | Status |
| :---: | :--- | :---: |
| **Phase 1** | Discovery, structure design, `STRUCTURE.md`, and `todo.md` setup | **Completed** |
| **Phase 2** | Flagship `README.md` and in-depth `docs/` creation | **Current Action** |
| **Phase 3** | User confirmation on structure plan & foundational scaffolding (`theme.js`, `navbar.html`, `styles.css`) | **Awaiting Confirmation** |
| **Phase 4** | Build a clean, simple landing page (`index.html`, `lab.html`) | **Deferred to Later** |

---

*Authored for the NitroxHQ team. Built with purpose.*

