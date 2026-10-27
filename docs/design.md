# Einstein — Design System & Visual Specification

> **NitroxHQ Studio Standards Document**  
> *Aligned with `tesseract` & `nitroxhq.github.io`*  
> *Created: October 26, 2026 (12:49 PM)*  
> *Target: Einstein Web Showcase, Landing Page, & What-If Lab*

---

## 1. Guiding Philosophy & Studio Tenets

Einstein adheres strictly to Nitrox's core product philosophy established across `nitroxhq.github.io` and `tesseract`:

1. **The application is the interface to your data, not the owner of your data.**  
   Grades, syllabi, weights, and histories are stored in plain, human-readable JSON files locally on the student's machine. Zero remote tracking, zero institutional lock-in.

2. **Tools should remove friction where it is negative and add friction where it is positive.**  
   Automate confusing category weight math and reverse-solve target exam scores so students spend mental energy studying instead of agonizing over spreadsheets.

3. **Everything is an object. Every object is a file. Every property is a tag.**  
   Courses, grading categories, assignments, curves, and simulation scenarios are discrete, composable entities.

4. **Zero-Build Vanilla Web Architecture:**  
   The web showcase and landing page operate purely with HTML5, CSS3, and ES6 JavaScript. No bundlers (`webpack`, `vite`), no npm compile step. `python -m http.server` or `npx serve` delivers instant local rendering.

5. **Offline-First Resilience:**  
   Local SVG vector icons, local font definitions with graceful system fallbacks, and zero reliance on fragile external CDNs that fail when students are offline or behind institutional firewalls.

---

## 2. Visual Identity & Brand Archetype

While `tesseract` expresses deep violet-purple accents (`#A161EA`) and `nitroxhq.github.io` represents Nitrox royal blue (`#3232FF`), **Einstein** synthesizes both into an intelligent **academic spectrum**:

- **Primary Accent (`--einstein-primary`):** `#4f46e5` (Deep Indigo)
- **Secondary Gradient Accent (`--einstein-accent`):** `#7c3aed` (Electric Violet)
- **Nitrox Heritage Accent (`--nitrox-blue`):** `#3232ff`
- **Luminous Highlights (`--luminous-cyan`):** `#60a5fa` / `#818cf8`
- **Positive Delta (`--delta-pos`):** `#22c55e` (Emerald)
- **Negative Delta (`--delta-neg`):** `#ef4444` (Coral Red)
- **Warning / Curve Flag (`--delta-warn`):** `#f59e0b` (Amber)

### The Einstein Glyph (Logo)
The brand mark combines the mathematical Greek Delta ($\Delta$ for change and difference) with the horizontal fulcrum of a balance scale and central focus orbital:
- Represents balance between past performance (backward loop) and future targets (forward loop).
- Vector implementation in `assets/logo/einstein-logo.svg` and `assets/favicon.svg`.

---

## 3. Typography System

| Role | Font Family | Fallback Stack | Notes |
| :--- | :--- | :--- | :--- |
| **Display Headings** | `'EB Garamond'`, `'Instrument Serif'` | `Georgia, serif` | Evokes classic academic rigor, textbook elegance, and intellectual clarity. |
| **Body & UI** | `'Inter'`, `'Instrument Sans'` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Clean, highly legible UI rendering at small scale. |
| **Data & Metadata** | `'Geist Mono'` | `ui-monospace, 'SF Mono', Menlo, Consolas, monospace` | Used for percentages, score deltas, JSON schema tokens, and time tags. |

---

## 4. Theme System & Color Tokens

Synchronized across all Nitrox properties via `theme.js` using `localStorage` key `'nitrox-theme'` (`dark` | `light` | `device`).

### Dark Mode (Default)
```css
:root[data-theme="dark"], :root {
  --bg-color: #0b0b14;
  --bg-card: rgba(18, 18, 30, 0.75);
  --bg-card-hover: rgba(30, 30, 50, 0.85);
  --border-subtle: rgba(99, 102, 241, 0.18);
  --border-focus: rgba(124, 58, 237, 0.45);
  --text-main: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.65);
  --text-dim: rgba(255, 255, 255, 0.40);
  --glow-primary: rgba(79, 70, 229, 0.25);
  --window-bg: #141422;
}
```

### Light Mode
```css
:root[data-theme="light"] {
  --bg-color: #f8fafc;
  --bg-card: rgba(255, 255, 255, 0.90);
  --bg-card-hover: rgba(241, 245, 249, 0.95);
  --border-subtle: rgba(79, 70, 229, 0.15);
  --border-focus: rgba(79, 70, 229, 0.40);
  --text-main: #0f172a;
  --text-muted: rgba(15, 23, 42, 0.70);
  --text-dim: rgba(15, 23, 42, 0.45);
  --glow-primary: rgba(79, 70, 229, 0.12);
  --window-bg: #e2e8f0;
}
```

---

## 5. Landing Page Component Hierarchy

1. **Top Navigation (`navbar.html`):**
   - Left: Einstein mark + "einstein" | divider | Nitrox logo + "nitrox"
   - Center/Right: Links (`#features`, `#what-if-lab`, `#comparison`, `about.html`, GitHub ↗)
   - Actions: 3-way Theme Toggle pill (`dark` / `light` / `device`) + Mobile Hamburger

2. **Hero Section:**
   - Pill Badge: `NITROX RESEARCH · ACADEMIC GRADE ASSISTANT`
   - Headline: *“Stop staring at unexplained numbers. Start understanding your grades.”*
   - Subtitle: *“A file-first, local-first grade assistant that explains what changed and why — with a real-time What-If Lab for the assignments you haven't turned in yet.”*
   - CTA Buttons: Primary `Explore What-If Lab` + Secondary `Why Einstein? →`

3. **Interactive What-If Lab Simulator (Showcase Widget):**
   - Live interactive mini-lab embedded directly into the landing page.
   - Course switcher (Organic Chemistry, Multivariable Calculus, Data Structures).
   - Real-time final exam score slider and target grade goal input.
   - Dynamic Delta Explainer natural-language breakdown.
   - Quick-test scenario presets (*Worst Case*, *Safety Pass*, *Target A*, *Ace*).

4. **Bento Grid Feature Showcase:**
   - Wide Card: **The Delta Explainer Engine** (Causal score breakdowns).
   - Wide Card: **The What-If Lab** (Reverse score solver & scenario forecasting).
   - Standard Card: **100% Local-First & Offline** (Open JSON/Markdown storage).
   - Standard Card: **Syllabus Rule Resolution** (Drop-lowest rules, curves, weights).
   - Standard Card: **Cross-Course Trajectory** (High-leverage study allocation).
   - Standard Card: **Portal Agnostic** (Canvas, Blackboard, PowerSchool, manual).

5. **Capability Comparison Matrix:**
   - Structured table comparing Einstein against Standard LMS, RogerHub/spreadsheets, and mobile calculators (GradeWay/Gradiate).

6. **Frequently Asked Questions (FAQ Accordion):**
   - Semantic `<details>` and `<summary>` elements with smooth CSS reveal.

7. **Pre-Footer CTA & Studio Footer:**
   - Call to action with Discord community and GitHub repository links.
   - Minimalist Nitrox footer: `einstein is fixing academic feedback. ■ © 2026 nitrox.`
