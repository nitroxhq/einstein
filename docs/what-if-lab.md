# Einstein — The What-If Lab

The **What-If Lab** is Einstein's dedicated sandbox for testing hypotheses, navigating high-stakes finals weeks, and making informed study decisions.

---

## 1. Capabilities

### A. The "What Do I Need?" Solver
Input any course and select your desired end-of-term grade (e.g. `93.0% A`, `90.0% A-`, `80.0% B`).
Einstein evaluates all remaining syllabus items and outputs:
- **Single-Assessment Target:** Exact minimum score needed on the final exam.
- **Distributed Target:** Balanced minimum score distribution across multiple remaining assignments (e.g., *"Score an 85% on Lab 5 and an 88% on the Final"*).
- **Feasibility Indicator:**
  - 🟢 **Easily Achievable:** Required score $\le 80\%$
  - 🟡 **Attainable with Effort:** Required score between $81\% - 95\%$
  - 🔴 **Stretch / High Difficulty:** Required score between $96\% - 100\%$
  - ⛔ **Mathematically Impossible:** Required score $> 100\%$ (without extra credit)

### B. Dynamic "Drop Lowest" Simulation
Many university and high school classes drop the lowest 1 or 2 quiz/homework scores.
Traditional portals often calculate drops prematurely or display confusing placeholder math.
In Einstein:
- The What-If Lab allows you to toggle *"What if this upcoming quiz replaces my dropped score?"*
- Visual indicators show which assignment currently occupies the drop slot.

### C. Multi-Course Semester Forecast
View your aggregate GPA trajectory across all active courses simultaneously. Simulate how dedicating an extra 5 hours of study to Chemistry vs. Calculus impacts your overall semester GPA.

---

## 2. Interaction Model

```text
+--------------------------------------------------------------------------+
|  CHEM 201 — Organic Chemistry                       Current Grade: 88.4% |
+--------------------------------------------------------------------------+
|  TARGET GRADE: [ 90.0% (A-)  ▼ ]                                         |
|                                                                          |
|  Upcoming Deliverables:                                                  |
|  ----------------------------------------------------------------------  |
|  [ ] Homework 8 (10 pts)         Simulated: [ 10 / 10 ]                  |
|  [ ] Lab Final (50 pts)          Simulated: [ 45 / 50 ]                  |
|  [x] Final Exam (150 pts)        REQUIRED:  [ 131.2 / 150 ] (87.5%)      |
|                                                                          |
|  Summary:                                                                |
|  "To achieve a 90.0% A-, you need at least 87.5% on the Final Exam,      |
|   assuming full marks on Homework 8 and 90% on the Lab Final."           |
+--------------------------------------------------------------------------+
```

