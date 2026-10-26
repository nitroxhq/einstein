<p align="center">
  <img src="assets/readme/einstein-banner.svg" alt="Einstein — Intelligent Grade Assistant & What-If Lab" width="100%">
</p>

<p align="center">
  <strong>Stop staring at unexplained numbers. Start understanding your grades.</strong><br>
  A file-first, local-first grade assistant that explains what changed and why — with a real-time What-If Lab for the assignments you haven't turned in yet.
</p>

<p align="center">
  <a href="https://discord.gg/P8pTEhAwD4"><img src="https://img.shields.io/badge/Discord-Join%20Community-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  <a href="https://github.com/nitroxhq/einstein"><img src="https://img.shields.io/badge/Status-In%20Active%20Development-A161EA?style=flat-square" alt="Status"></a>
  <a href="https://nitroxhq.github.io/"><img src="https://img.shields.io/badge/Built%20By-Nitrox-0B73EE?style=flat-square" alt="Nitrox"></a>
  <a href="https://github.com/nitroxhq/einstein/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
</p>

---

## 💡 Overview

Most modern grade portals (Canvas, Blackboard, PowerSchool, Infinite Campus) are built for institutional compliance, not student clarity. They drop a single updated percentage on your dashboard without context, leaving you to guess:

- *Why did my overall score drop 2.3% after receiving an 88%?*
- *What do I need to score on the final exam to keep my A?*
- *Does this teacher weight categories exponentially or use total points?*
- *What happens if the teacher drops the lowest quiz score?*

**Einstein** is an intelligent grade assistant and academic simulator built by [Nitrox](https://nitroxhq.github.io/). Designed around the core Nitrox principles of **file-first freedom**, **local data ownership**, and **deliberate friction removal**, Einstein turns opaque gradebooks into clear, actionable intelligence.

---

## 🧠 Core Architectural Pillars

1. **The Delta Explainer Engine**  
   Grades change constantly, but portals never explain *why*. Einstein audits every grade adjustment and provides a natural-language breakdown of category weight impact, syllabus curve shifts, and score deviations.

2. **The What-If Lab**  
   Simulate hypothetical outcomes before you take an exam or turn in a project. Calculate the exact point threshold needed on upcoming deliverables to maintain or achieve your target GPA.

3. **File-First & Local-First Freedom**  
   Your academic record belongs to you. Einstein stores your course data, syllabi breakdowns, and grade histories locally in open, human-readable formats (JSON and Markdown). No vendor lock-in, no remote cloud silos.

4. **Zero-Friction Privacy**  
   Student data is sensitive. Einstein runs offline-first with zero tracking, telemetry, or data harvesting. Your school credentials and performance metrics never leave your machine.

---

## ✨ Feature Comparison

Einstein replaces fragmented web calculators, messy spreadsheets, and clunky LMS grade tabs:

| Capability | Standard LMS (Canvas, Blackboard, PowerSchool) | Ad-Hoc Calculators (RogerHub, Excel sheets) | **Einstein** |
| :--- | :--- | :--- | :--- |
| **Delta Explanation** | ❌ Just displays raw number changes | ❌ No historical tracking | ✅ **Full plain-English impact breakdown** |
| **What-If Simulation** | ⚠️ Clunky or read-only | ⚠️ Single isolated formulas | ✅ **Multi-course interactive sandbox** |
| **Category Weight Math** | ❌ Opaque category grouping | ⚠️ Requires manual formula setup | ✅ **Automatic weight & points resolution** |
| **Drop-Lowest Rules** | ⚠️ Frequently miscalculated | ❌ Manual spreadsheet logic | ✅ **Automated dynamic drop recalculations** |
| **Data Privacy** | ❌ School-managed surveillance | ⚠️ Ad-supported websites | ✅ **100% local-first & offline** |
| **Open File Formats** | ❌ Locked in institutional databases | ⚠️ Proprietary spreadsheet formats | ✅ **Human-readable JSON/Markdown** |
| **Actionable Insights** | ❌ None | ❌ None | ✅ **Target score trajectories & alerts** |

---

## 🧪 The What-If Lab

The **What-If Lab** is Einstein's flagship simulation environment:

- **Target Grade Solver:** Tell Einstein: *"I need a 90.0% in Organic Chemistry."* Einstein solves the backward equation across all remaining weighted assignments to give you the exact score required.
- **Scenario Comparison:** Test multiple scenarios side-by-side (e.g. *Optimistic*, *Expected*, *Safety Margin*).
- **Extra Credit & Curve Modeling:** Experiment with custom syllabus curves, bonus point systems, and scale offsets.
- **Assignment Weight Sensitivity:** Visual indicator showing which upcoming assignments have the highest mathematical leverage over your final grade.

---

## 🚀 Running the Showcase Locally

This repository contains the official web showcase and documentation for Einstein. In accordance with Nitrox engineering standards, the showcase has **zero build steps** and runs directly via any local HTTP server:

### Using Python
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

### Using Node.js
```bash
npx serve .
# or
npx live-server
```

### Using VS Code
Install the **Live Server** extension, right-click on `index.html`, and select **Open with Live Server**.

---

## 📚 Project Documentation

- [Repository Architecture & Structure Plan](file:///c:/Users/K1404887/Desktop/git-dev/einstein/STRUCTURE.md)
- [System Overview & Vision](file:///c:/Users/K1404887/Desktop/git-dev/einstein/docs/overview.md)
- [Calculation Engine & What-If Logic](file:///c:/Users/K1404887/Desktop/git-dev/einstein/docs/architecture.md)
- [Local Data Schema (Course & Assignment Format)](file:///c:/Users/K1404887/Desktop/git-dev/einstein/docs/data-schema.md)
- [Task Tracker & Roadmap](file:///c:/Users/K1404887/Desktop/git-dev/einstein/todo.md)

---

## 💬 Community & Links

- **Discord Community:** [discord.gg/P8pTEhAwD4](https://discord.gg/P8pTEhAwD4)
- **Created by Nitrox:** [nitroxhq.github.io](https://nitroxhq.github.io/)
- **GitHub Organization:** [github.com/nitroxhq](https://github.com/nitroxhq)

---

<p align="center">
  <sub>© 2026 Nitrox. Built with purpose.</sub>
</p>
