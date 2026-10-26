# Einstein — System Overview & Vision

> *"A grade assistant that explains what changed instead of just showing a number, with a what-if lab for the assignment you haven't turned in yet."*  
> — Nitrox Workbench

---

## 1. The Core Problem

For millions of high school, undergraduate, and graduate students, checking grades is an experience characterized by anxiety and confusion:

1. **The Sudden Drop:** An assignment is posted, and your overall course average drops from an 89.4% to an 86.8%. The portal gives no explanation of which category caused the drop or what mathematical leverage the assignment held.
2. **Hidden Weight Complexities:** Modern syllabi frequently feature nuanced grading formulas:
   - Weighted categories (e.g. *Exams 45%, Projects 25%, Quizzes 15%, Homework 10%, Participation 5%*)
   - Point-based totals with scaling factors
   - "Drop lowest $n$ quiz scores" policies
   - Curved exam metrics where the mean is indexed to a B+
3. **The "What Do I Need on the Final?" Dilemma:** Students resort to ad-hoc, ad-ridden web calculators or fragmented spreadsheets trying to calculate the minimum score needed to pass or keep a scholarship.
4. **Data Ownership & Surveillance:** Educational technology portals (Canvas, PowerSchool, Blackboard) operate as enterprise platforms for school administrators. They do not work for the student, and student performance data is siloed and monitored.

---

## 2. The Einstein Solution

Einstein is an open, independent academic assistant built within the **Nitrox** ecosystem. It is built upon three foundational tenets:

### A. The Delta Explainer Engine
Einstein tracks every change in your course score and provides an instant, plain-English autopsy:
- **Root Cause Identification:** Identifies precisely which assignment caused a change in standing.
- **Weight Leverage Calculation:** Explains how category weights amplified or minimized the impact.
- **Trajectory Forecasting:** Indicates whether your grade is trending upward or downward over time.

### B. The What-If Lab
The What-If Lab gives students full simulation power:
- **Hypothetical Grading:** Enter test scores, projects, and final exam estimates before they occur.
- **Goal Seeking:** Set a target course grade (e.g. `92.5%`) and have Einstein calculate the exact minimum points required across all remaining assessments.
- **Drop-Score Optimization:** Dynamically updates calculations when teachers drop lowest homework or lab grades.

### C. File-First Data Sovereignty
In keeping with Nitrox's philosophy:
- *The application is the interface to your data, not the owner of your data.*
- All course data, grade history, and simulations are saved in human-readable JSON and Markdown files stored locally on your device.
- Works 100% offline. Zero tracking. Zero telemetry.

