/**
 * app.js — Einstein workspace
 * Shell chrome (sidebar + theme), the Grade impact view, and the live
 * what-if projection. Vanilla JS, no build step, file-first friendly.
 */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* =========================================================
     1. Toast — the one feedback surface for stubbed actions
     ========================================================= */
  const toastEl = $('#appToast');
  let toastTimer = null;

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-on'), 2600);
  }

  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-placeholder]');
    if (!target) return;
    event.preventDefault();
    toast(`${target.dataset.placeholder} is a placeholder in this build.`);
  });

  /* =========================================================
     2. Greeting
     ========================================================= */
  function initGreeting() {
    const heading = $('.app-greeting h1');
    if (!heading) return;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    heading.innerHTML = `${greeting}, <em>Maya.</em>`;
  }

  /* =========================================================
     3. Sidebar nav (fetched partial, inline fallback)
     ========================================================= */
  const FALLBACK_NAV = [
    { label: 'Overview', href: '#', placeholder: 'Overview' },
    { label: 'Grade impact', href: './index.html', active: true },
    { label: 'Courses', href: '#', placeholder: 'Courses' },
    { label: 'What-if lab', href: '#', placeholder: 'What-if lab' },
    { label: 'Gradebook', href: '#', placeholder: 'Gradebook' },
  ];

  function navLink(item) {
    const attrs = [
      `href="${item.href}"`,
      'class="app-nav-link' + (item.active ? ' is-active' : '') + '"',
      item.active ? 'aria-current="page"' : '',
      item.placeholder ? `data-placeholder="${item.placeholder}"` : '',
    ].filter(Boolean).join(' ');
    return `<li><a ${attrs}><span>${item.label}</span></a></li>`;
  }

  function fallbackNav() {
    return `
      <aside class="app-nav" aria-label="Einstein workspace navigation">
        <a class="app-brand" href="../index.html" aria-label="Einstein home">
          <span class="app-mark" aria-hidden="true">
            <svg viewBox="0 0 200 200" fill="none"><path d="M100 44 L156 136 L44 136 Z" stroke="#3232ff" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/><circle cx="100" cy="98" r="19" stroke="#3232ff" stroke-width="9" opacity=".5"/></svg>
          </span>
          <span class="app-brand-text"><span class="app-wordmark">Einstein</span><span class="app-byline">by nitrox</span></span>
        </a>
        <ul class="app-nav-list">${FALLBACK_NAV.map(navLink).join('')}</ul>
      </aside>`;
  }

  async function initNav() {
    const slot = $('#app-nav');
    if (!slot) return;
    try {
      const response = await fetch('./navbar.html');
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      slot.innerHTML = await response.text();
    } catch {
      // file:// or a missing partial: keep the app usable.
      slot.innerHTML = fallbackNav();
    }
    initThemeButton();
  }

  /* =========================================================
     4. Theme button (mirrors the landing page toggle)
     ========================================================= */
  function initThemeButton() {
    const button = $('#appThemeBtn');
    const label = $('#appThemeLabel');

    const sync = () => {
      const theme = (window.getNitroxTheme && window.getNitroxTheme()) || 'device';
      if (label) label.textContent = theme;
      if (button) button.dataset.activeTheme = theme;
    };

    if (button) {
      button.addEventListener('click', () => {
        if (typeof window.cycleNitroxTheme === 'function') window.cycleNitroxTheme();
        sync();
      });
    }
    window.addEventListener('nitrox-theme-change', sync);
    sync();
  }

  /* =========================================================
     5. Course data + what-if projection
     ========================================================= */
  const COURSES = {
    calculus: {
      name: 'AP Calculus',
      grade: 94.2,
      semester: 91.8,
      gpa: 3.72,
      categories: [
        { id: 'tests', label: 'Tests', weight: 55, avg: 90.0 },
        { id: 'quizzes', label: 'Quizzes', weight: 25, avg: 96.0 },
        { id: 'homework', label: 'Homework', weight: 20, avg: 98.0 },
      ],
    },
    english: {
      name: 'English III',
      grade: 91.0,
      semester: 90.4,
      gpa: 3.66,
      categories: [
        { id: 'tests', label: 'Tests', weight: 45, avg: 92.5 },
        { id: 'essays', label: 'Essays', weight: 35, avg: 90.0 },
        { id: 'reading', label: 'Reading', weight: 20, avg: 94.0 },
      ],
    },
    chemistry: {
      name: 'Chemistry',
      grade: 88.6,
      semester: 89.1,
      gpa: 3.31,
      categories: [
        { id: 'tests', label: 'Tests', weight: 55, avg: 85.0 },
        { id: 'labs', label: 'Labs', weight: 30, avg: 92.0 },
        { id: 'quizzes', label: 'Quizzes', weight: 15, avg: 90.0 },
      ],
    },
    history: {
      name: 'US History',
      grade: 95.8,
      semester: 94.6,
      gpa: 3.86,
      categories: [
        { id: 'tests', label: 'Tests', weight: 50, avg: 96.0 },
        { id: 'essays', label: 'Essays', weight: 30, avg: 95.0 },
        { id: 'daily', label: 'Daily', weight: 20, avg: 97.0 },
      ],
    },
  };

  // Simplified "+1 point in a category lands as +0.33 this six weeks" model:
  // the six-week grade is the live one, the semester average only partly moves,
  // and GPA follows the six-week delta scaled by credit weight.
  const SEMESTER_FACTOR = 0.33;
  const GPA_FACTOR = 0.022;

  const ui = {
    course: $('#wiCourse'),
    category: $('#wiCategory'),
    score: $('#wiScore'),
    weight: $('#wiWeight'),
    scoredLabel: $('#wiScoredLabel'),
    sixBefore: $('#projSixBefore'),
    sixAfter: $('#projSixAfter'),
    sixChip: $('#projSixChip'),
    semBefore: $('#projSemBefore'),
    semAfter: $('#projSemAfter'),
    semChip: $('#projSemChip'),
    gpaBefore: $('#projGpaBefore'),
    gpaAfter: $('#projGpaAfter'),
    gpaChip: $('#projGpaChip'),
  };

  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const numberFrom = (input, fallback) => {
    const value = Number.parseFloat(input && input.value);
    return Number.isFinite(value) ? value : fallback;
  };

  function toneFor(value, epsilon = 0.005) {
    if (value > epsilon) return 'tone-pos';
    if (value < -epsilon) return 'tone-neg';
    return 'tone-zero';
  }

  function deltaText(value, digits) {
    const epsilon = 0.5 * Math.pow(10, -digits);
    if (value > epsilon) return `+${value.toFixed(digits)}`;
    if (value < -epsilon) return `\u2212${Math.abs(value).toFixed(digits)}`;
    return (0).toFixed(digits);
  }

  function setChip(el, value, digits) {
    if (!el) return;
    el.textContent = deltaText(value, digits);
    el.classList.remove('tone-pos', 'tone-neg', 'tone-zero');
    el.classList.add(toneFor(value, 0.5 * Math.pow(10, -digits)));
  }

  function fillCategories(courseId, preferredId) {
    if (!ui.category) return;
    const course = COURSES[courseId];
    if (!course) return;
    ui.category.innerHTML = course.categories
      .map((cat) => `<option value="${cat.id}">${cat.label} · ${cat.weight}%</option>`)
      .join('');
    const next = course.categories.some((cat) => cat.id === preferredId)
      ? preferredId
      : course.categories[0].id;
    ui.category.value = next;
  }

  function project() {
    if (!ui.course || !ui.score || !ui.weight) return;

    const course = COURSES[ui.course.value] || COURSES.calculus;
    const category =
      course.categories.find((cat) => cat.id === ui.category.value) || course.categories[0];

    const score = clamp(numberFrom(ui.score, 0), 0, 100);
    const weight = clamp(numberFrom(ui.weight, 0), 0, 100);

    // A new score at `weight` % of the course pulls the six-week grade
    // toward the score, measured against the category's current average.
    const deltaSix = (weight / 100) * (score - category.avg);
    const six = course.grade + deltaSix;
    const semester = course.semester + deltaSix * SEMESTER_FACTOR;
    const gpa = clamp(course.gpa + deltaSix * GPA_FACTOR, 0, 4);

    if (ui.scoredLabel) ui.scoredLabel.textContent = `If scored ${score.toFixed(0)}%`;

    if (ui.sixBefore) ui.sixBefore.textContent = course.grade.toFixed(1);
    if (ui.sixAfter) ui.sixAfter.textContent = six.toFixed(1);
    setChip(ui.sixChip, six - course.grade, 1);

    if (ui.semBefore) ui.semBefore.textContent = course.semester.toFixed(1);
    if (ui.semAfter) ui.semAfter.textContent = semester.toFixed(1);
    setChip(ui.semChip, semester - course.semester, 1);

    if (ui.gpaBefore) ui.gpaBefore.textContent = course.gpa.toFixed(2);
    if (ui.gpaAfter) ui.gpaAfter.textContent = gpa.toFixed(2);
    setChip(ui.gpaChip, gpa - course.gpa, 2);
  }

  function initWhatIf() {
    if (!ui.course) return;

    fillCategories(ui.course.value, 'tests');

    ui.course.addEventListener('change', () => {
      fillCategories(ui.course.value);
      project();
    });
    ui.category.addEventListener('change', project);
    ui.score.addEventListener('input', project);
    ui.weight.addEventListener('input', project);

    project();
  }

  /* =========================================================
     6. Grade impact: course pills, search, stubbed actions
     ========================================================= */
  let activeCourse = null;

  function filterRows() {
    const rows = $$('#impactRows tr');
    const query = ($('#impactSearch') && $('#impactSearch').value || '').trim().toLowerCase();
    let visible = 0;

    rows.forEach((row) => {
      const courseMatch = !activeCourse || row.dataset.course === activeCourse;
      const textMatch = !query || row.textContent.toLowerCase().includes(query);
      const show = courseMatch && textMatch;
      row.classList.toggle('is-hidden', !show);
      if (show) visible += 1;
    });

    const empty = $('#impactEmpty');
    if (empty) empty.hidden = visible > 0;
  }

  function initImpact() {
    const pills = $$('.course-pill');
    const courseSelect = $('#wiCourse');

    pills.forEach((pill) => {
      pill.setAttribute('aria-pressed', 'false');
      pill.addEventListener('click', () => {
        const courseId = pill.dataset.course;
        const wasActive = pill.classList.contains('is-active');

        pills.forEach((other) => {
          other.classList.remove('is-active');
          other.setAttribute('aria-pressed', 'false');
        });

        if (wasActive) {
          activeCourse = null;
        } else {
          pill.classList.add('is-active');
          pill.setAttribute('aria-pressed', 'true');
          activeCourse = courseId;

          if (courseSelect && courseSelect.value !== courseId) {
            courseSelect.value = courseId;
            fillCategories(courseId);
            project();
          }
        }

        filterRows();
      });
    });

    const search = $('#impactSearch');
    if (search) search.addEventListener('input', filterRows);

    filterRows();
  }

  function initStubbedActions() {
    const bell = $('#bellBtn');
    if (bell) bell.addEventListener('click', () => toast('Notifications are a placeholder in this build.'));

    const sync = $('#syncBtn');
    if (sync) sync.addEventListener('click', () => toast('Sync is stubbed — no portal connection in this build.'));

    const addGrade = $('#addGradeBtn');
    if (addGrade) addGrade.addEventListener('click', () => toast('Add grade is a placeholder in this build.'));

    const period = $('#periodBtn');
    if (period) period.addEventListener('click', () => toast('Grading period switching is a placeholder in this build.'));

    const range = $('#trajRange');
    if (range) range.addEventListener('click', () => toast('Trajectory ranges are a placeholder in this build.'));
  }

  /* =========================================================
     7. Boot
     ========================================================= */
  function init() {
    initGreeting();
    initNav();
    initWhatIf();
    initImpact();
    initStubbedActions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
