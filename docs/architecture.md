# Einstein — Calculation Engine & Architecture

This document outlines the mathematical models, delta tracking mechanisms, and architecture powering **Einstein**.

---

## 1. Grade Computation Models

Einstein supports both primary academic grading paradigms and mixed hybrid formats.

### Model A: Weighted Category Grading

Courses divided into weighted categories (e.g. Tests 40%, Homework 20%, Final Exam 40%).

For each category $c \in C$:
$$\text{Category Score } S_c = \frac{\sum_{i \in A_c} \text{EarnedPoints}_i}{\sum_{i \in A_c} \text{PossiblePoints}_i}$$

Where $A_c$ is the set of graded assignments in category $c$ (after applying any drop-lowest policies).

The overall course percentage $P$ is computed across active categories:
$$P = \frac{\sum_{c \in C_{\text{active}}} (S_c \times W_c)}{\sum_{c \in C_{\text{active}}} W_c}$$

Where $W_c$ is the configured weight of category $c$. Normalization by $\sum W_c$ ensures accurate grades even when certain categories (e.g., Final Exam) have no graded entries yet.

### Model B: Total Points Grading

Courses where all assignments contribute to a unified total point pool:
$$P = \frac{\sum_{i \in A} \text{EarnedPoints}_i}{\sum_{i \in A} \text{PossiblePoints}_i}$$

---

## 2. The Delta Explainer Engine

When a new score $a_{\text{new}}$ is entered, Einstein compares the pre-state ($P_{\text{pre}}$) and post-state ($P_{\text{post}}$):

$$\Delta P = P_{\text{post}} - P_{\text{pre}}$$

### Impact Decomposition:
1. **Category Shift ($\Delta S_c$):** The change within the assignment's own category.
2. **Global Leverage ($\lambda_c$):** The effective leverage of that category on the overall course grade:
   $$\lambda_c = \frac{W_c}{\sum_{k \in C_{\text{active}}} W_k}$$
3. **Marginal Contribution:** The exact percentage point contribution of the single assignment to the overall course grade:
   $$\text{Marginal Impact} = \Delta P$$

### Natural Language Generation:
Einstein converts these metrics into intuitive summaries:
> *"Your score of 72/100 on 'Midterm 2' dropped your overall grade by **-2.45%** (from 91.20% to 88.75%). Because the **Exams** category accounts for 40% of your grade and only had 1 prior exam, this assignment carried 20% total course weight."*

---

## 3. The What-If Lab Simulation Engine

### Forward Simulation
The user inputs provisional scores for upcoming assignments $\{u_1, u_2, \dots, u_m\}$. Einstein calculates the projected overall grade $P_{\text{projected}}$.

### Backward Target Solver (Goal-Seeking)
Given a desired target grade $T$ and a target upcoming assignment $u_t$ with maximum points $M_t$ in category $c$:
Einstein solves for the required points $x$:

$$P(x) \ge T$$

Solving for $x$:
- Accounts for category weight $W_c$.
- Accounts for current earned/possible sums in category $c$.
- Returns exact required percentage and raw points (e.g. *"You need an 86.4% (86.4 / 100) on the Final Exam to maintain an A-"*).
- Flags unachievable targets when $x > M_t$ (or when $x > \text{MaxPossible}$ including extra credit bounds).

---

## 4. Local-First Storage Architecture

Einstein adheres strictly to Nitrox's **file-first** architecture:

- Course catalogs, category configurations, assignments, and historical snapshots are stored as JSON files in a user-chosen local directory (`~/.nitrox/einstein/` or workspace repository).
- No proprietary databases or remote synchronization servers required.
- Files can be inspected, backed up, or edited directly with standard text editors.

