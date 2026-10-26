# Einstein — Data Schema Specification

In accordance with Nitrox's **file-first** design principle, Einstein stores all user data in transparent, human-readable JSON files. Users retain complete ownership of their academic information.

---

## 1. Directory Structure

```text
~/.nitrox/einstein/
├── config.json                     # User preferences & grading scale defaults
└── terms/
    └── 2026-fall/
        ├── term.json               # Term metadata & active courses list
        └── courses/
            ├── math-241.json       # Calculus III
            ├── phys-211.json       # Physics: Mechanics
            └── cs-225.json         # Data Structures
```

---

## 2. Course Schema (`course.json`)

```json
{
  "$schema": "https://nitroxhq.github.io/einstein/schemas/v1/course.json",
  "id": "chem-201",
  "code": "CHEM 201",
  "title": "Organic Chemistry I",
  "term": "2026-fall",
  "instructor": "Dr. Aris Thorne",
  "gradingSystem": "weighted_categories",
  "gradingScale": {
    "A+": 97.0,
    "A": 93.0,
    "A-": 90.0,
    "B+": 87.0,
    "B": 83.0,
    "B-": 80.0,
    "C+": 77.0,
    "C": 73.0,
    "C-": 70.0,
    "D": 60.0,
    "F": 0.0
  },
  "categories": [
    {
      "id": "exams",
      "name": "Exams & Midterms",
      "weight": 0.40,
      "dropLowest": 0
    },
    {
      "id": "quizzes",
      "name": "Weekly Quizzes",
      "weight": 0.20,
      "dropLowest": 1
    },
    {
      "id": "labs",
      "name": "Laboratory Reports",
      "weight": 0.20,
      "dropLowest": 0
    },
    {
      "id": "final",
      "name": "Final Comprehensive Exam",
      "weight": 0.20,
      "dropLowest": 0
    }
  ],
  "assignments": [
    {
      "id": "q1",
      "name": "Quiz 1: Nomenclature",
      "categoryId": "quizzes",
      "pointsEarned": 18.0,
      "pointsPossible": 20.0,
      "date": "2026-09-08",
      "status": "graded"
    },
    {
      "id": "exam1",
      "name": "Midterm Exam 1",
      "categoryId": "exams",
      "pointsEarned": 88.5,
      "pointsPossible": 100.0,
      "date": "2026-10-02",
      "status": "graded"
    },
    {
      "id": "final-exam",
      "name": "Final Exam",
      "categoryId": "final",
      "pointsEarned": null,
      "pointsPossible": 150.0,
      "date": "2026-12-14",
      "status": "upcoming"
    }
  ]
}
```

---

## 3. Grade History & Delta Snapshots

Snapshots record the timeline of grade changes for delta auditing:

```json
{
  "timestamp": "2026-10-03T14:32:00Z",
  "assignmentId": "exam1",
  "previousGrade": 91.4,
  "newGrade": 89.2,
  "delta": -2.2,
  "explanation": "Midterm Exam 1 (88.5/100) entered into Exams category (40% weight). Prior to this exam, only Quizzes had been recorded."
}
```

