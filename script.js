/**
 * script.js — Einstein Web Showcase & Interactive What-If Simulation Engine
 * NitroxHQ Standards: Vanilla ES6+, zero external CDN dependencies, offline resilient.
 */

// -----------------------------------------------------------------------------
// 1. Navbar Loading & Navigation Interactions
// -----------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initWhatIfSimulator();
});

function initNavbar() {
  const placeholder = document.getElementById('nav-placeholder');
  if (!placeholder) return;

  fetch('./navbar.html')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.text();
    })
    .then((html) => {
      placeholder.innerHTML = html;
      bindNavbarEvents();
      updateThemeButtonUI();
    })
    .catch((err) => {
      console.warn('Navbar fetch failed (expected if viewed via file:// protocol without server):', err);
      // Fallback: if running directly from file:// and fetch fails, render navbar inline if empty
      if (!placeholder.innerHTML.trim()) {
        renderFallbackNavbar(placeholder);
      }
    });
}

function bindNavbarEvents() {
  // 1. Highlight the active navigation link. Match the link's file *and* its
  //    hash: every index.html#section link shares the current file, so matching
  //    on the path alone lights all of them up at once.
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  const markActive = () => {
    const currentHash = window.location.hash.replace('#', '');
    navLinks.forEach((link) => {
      const href = (link.getAttribute('href') || '').replace(/^\.\//, '');
      const [file, hash = ''] = href.split('#');
      const match = file === currentPath && hash === currentHash;
      link.classList.toggle('active', match);
      if (match) {
        link.setAttribute('aria-current', hash ? 'location' : 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  markActive();
  window.addEventListener('hashchange', markActive);

  // 2. Mobile hamburger menu toggle
  const hamburger = document.getElementById('navHamburger');
  const menu = document.getElementById('navMenu');
  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('nav-menu-open');
      hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside or clicking any nav link
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('nav-menu-open');
        hamburger.classList.remove('active');
      }
    });

    menu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        menu.classList.remove('nav-menu-open');
        hamburger.classList.remove('active');
      });
    });
  }

  // 3. Theme Toggle Button
  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      if (typeof window.cycleNitroxTheme === 'function') {
        window.cycleNitroxTheme();
        updateThemeButtonUI();
      }
    });
  }

  // Listen for external theme changes
  window.addEventListener('nitrox-theme-change', updateThemeButtonUI);
}

function updateThemeButtonUI() {
  const themeLabel = document.getElementById('themeLabel');
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeLabel || !themeBtn) return;

  const currentTheme = (typeof window.getNitroxTheme === 'function' && window.getNitroxTheme()) || 'device';
  themeLabel.textContent = currentTheme;
  themeBtn.setAttribute('data-active-theme', currentTheme);
}

function renderFallbackNavbar(container) {
  container.innerHTML = `
    <nav class="nitrox-nav" aria-label="Main navigation">
      <div class="nav-brand-group">
        <a href="./index.html" class="nav-brand">
          <span class="nav-logo" aria-hidden="true">🎓</span>
          <span class="nav-brand-text">einstein</span>
        </a>
        <a href="https://nitroxhq.github.io/" class="nitrox-brand">
          <svg class="nitrox-logo" viewBox="0 0 141 152" width="13" height="15" fill="#3232ff" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.0651 103.897C77.2824 113.882 62.8631 113.872 57.0943 103.879L12.9996 27.5C7.22423 17.496 14.4492 4.99241 26.0006 5.00039L114.296 5.06139C125.847 5.06938 133.055 17.583 127.266 27.579L83.0651 103.897Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M83.0651 47.2766C77.2824 37.292 62.8631 37.302 57.0943 47.2945L12.9997 123.674C7.22425 133.678 14.4492 146.181 26.0006 146.173L114.296 146.112C125.847 146.104 133.055 133.591 127.266 123.595L83.0651 47.2766Z"/>
          </svg>
          <span class="nitrox-brand-text">nitrox</span>
        </a>
      </div>
      <div class="nav-menu">
        <ul>
          <li><a href="./index.html#features" class="nav-link">features</a></li>
          <li><a href="./index.html#what-if-lab" class="nav-link">what-if lab</a></li>
          <li><a href="./index.html#comparison" class="nav-link">comparison</a></li>
        </ul>
      </div>
    </nav>
  `;
}

// -----------------------------------------------------------------------------
// 2. Interactive What-If Lab Simulation Engine
// -----------------------------------------------------------------------------
const COURSES_DATA = {
  chem201: {
    code: 'CHEM 201',
    name: 'Organic Chemistry II',
    currentStanding: 87.8,
    categories: [
      { name: 'Midterm Exams', weight: 40, currentScore: 84.5 },
      { name: 'Problem Sets', weight: 20, currentScore: 96.0 },
      { name: 'Lab Practicals', weight: 15, currentScore: 91.0 },
      { name: 'Comprehensive Final', weight: 25, currentScore: null, isSimulated: true }
    ],
    defaultTarget: 90.0,
    hasDropRule: true,
    dropBenefit: 1.2, // +1.2% if lowest quiz dropped
    notes: 'Weighted 40/20/15/25. Final exam is heavily weighted.'
  },
  math241: {
    code: 'MATH 241',
    name: 'Calculus III (Multivariable)',
    currentStanding: 91.4,
    categories: [
      { name: 'Quizzes (Weekly)', weight: 15, currentScore: 94.0 },
      { name: 'Midterms (2x)', weight: 45, currentScore: 89.2 },
      { name: 'Online Homework', weight: 10, currentScore: 100.0 },
      { name: 'Final Exam', weight: 30, currentScore: null, isSimulated: true }
    ],
    defaultTarget: 93.0,
    hasDropRule: true,
    dropBenefit: 0.8,
    notes: 'Requires 93.0% for solid A. 30% final exam.'
  },
  cs128: {
    code: 'CS 128',
    name: 'Data Structures & Algorithms',
    currentStanding: 84.6,
    categories: [
      { name: 'Machine Problems', weight: 35, currentScore: 88.0 },
      { name: 'Weekly Labs', weight: 15, currentScore: 95.0 },
      { name: 'Midterm Exam', weight: 25, currentScore: 72.0 },
      { name: 'Final Assessment', weight: 25, currentScore: null, isSimulated: true }
    ],
    defaultTarget: 88.0,
    hasDropRule: false,
    dropBenefit: 0,
    notes: 'Midterm was tough; Final exam has 25% leverage to recover.'
  }
};

let currentCourseKey = 'chem201';
let dropRuleActive = false;

function initWhatIfSimulator() {
  const courseSelect = document.getElementById('simCourseSelect');
  const finalSlider = document.getElementById('simFinalSlider');
  const sliderValueText = document.getElementById('simSliderValue');
  const targetGradeInput = document.getElementById('simTargetInput');
  const dropCheckbox = document.getElementById('simDropCheckbox');
  const scenarioBtns = document.querySelectorAll('.scenario-btn');

  if (!courseSelect || !finalSlider) return;

  // Course selector change
  courseSelect.addEventListener('change', (e) => {
    currentCourseKey = e.target.value;
    const course = COURSES_DATA[currentCourseKey];
    if (targetGradeInput) {
      targetGradeInput.value = course.defaultTarget;
    }
    renderCourseDetails();
    recalculateSimulation();
  });

  // Slider change
  finalSlider.addEventListener('input', (e) => {
    if (sliderValueText) sliderValueText.textContent = `${e.target.value}%`;
    recalculateSimulation();
  });

  // Target input change
  if (targetGradeInput) {
    targetGradeInput.addEventListener('input', () => {
      recalculateSimulation();
    });
  }

  // Drop rule checkbox
  if (dropCheckbox) {
    dropCheckbox.addEventListener('change', (e) => {
      dropRuleActive = e.target.checked;
      recalculateSimulation();
    });
  }

  // Quick scenario pills
  scenarioBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const score = btn.getAttribute('data-score');
      if (score !== null) {
        finalSlider.value = score;
        if (sliderValueText) sliderValueText.textContent = `${score}%`;
        scenarioBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        recalculateSimulation();
      }
    });
  });

  // Initial render
  renderCourseDetails();
  recalculateSimulation();
}

function renderCourseDetails() {
  const course = COURSES_DATA[currentCourseKey];
  const categoryContainer = document.getElementById('simCategoryList');
  if (!categoryContainer) return;

  categoryContainer.innerHTML = '';
  course.categories.forEach((cat) => {
    const item = document.createElement('div');
    item.className = 'sim-category-item';

    if (cat.isSimulated) {
      item.classList.add('is-simulated');
      item.innerHTML = `
        <div class="cat-info">
          <span class="cat-name">${cat.name} <span class="cat-pill">Simulating</span></span>
          <span class="cat-weight">${cat.weight}% of grade</span>
        </div>
        <div class="cat-score sim-score-badge" id="catSimScoreBadge">--%</div>
      `;
    } else {
      item.innerHTML = `
        <div class="cat-info">
          <span class="cat-name">${cat.name}</span>
          <span class="cat-weight">${cat.weight}% of grade</span>
        </div>
        <div class="cat-score">${cat.currentScore.toFixed(1)}%</div>
      `;
    }
    categoryContainer.appendChild(item);
  });

  // Drop lowest rule visibility
  const dropGroup = document.getElementById('simDropGroup');
  if (dropGroup) {
    if (course.hasDropRule) {
      dropGroup.style.display = 'flex';
    } else {
      dropGroup.style.display = 'none';
      const chk = document.getElementById('simDropCheckbox');
      if (chk) chk.checked = false;
      dropRuleActive = false;
    }
  }
}

function recalculateSimulation() {
  const course = COURSES_DATA[currentCourseKey];
  const finalSlider = document.getElementById('simFinalSlider');
  const targetGradeInput = document.getElementById('simTargetInput');

  const projectedExamScore = parseFloat(finalSlider.value) || 0;
  const targetGrade = targetGradeInput ? parseFloat(targetGradeInput.value) || 90.0 : 90.0;

  // Calculate existing points contribution
  let existingWeightedPoints = 0;
  let nonSimulatedWeight = 0;
  let simulatedCategory = null;

  course.categories.forEach((cat) => {
    if (cat.isSimulated) {
      simulatedCategory = cat;
    } else {
      existingWeightedPoints += (cat.currentScore * cat.weight) / 100;
      nonSimulatedWeight += cat.weight;
    }
  });

  // Drop rule benefit if active
  let dropBonus = 0;
  if (dropRuleActive && course.hasDropRule) {
    dropBonus = course.dropBenefit;
  }

  // Calculate new overall course score
  const finalWeight = simulatedCategory ? simulatedCategory.weight : 25;
  const simulatedContribution = (projectedExamScore * finalWeight) / 100;
  const projectedOverall = existingWeightedPoints + simulatedContribution + dropBonus;

  // Calculate required final exam score to hit targetGrade
  // targetGrade = existingWeightedPoints + dropBonus + (ReqScore * finalWeight / 100)
  // ReqScore = (targetGrade - existingWeightedPoints - dropBonus) * 100 / finalWeight
  const requiredScore = ((targetGrade - existingWeightedPoints - dropBonus) * 100) / finalWeight;

  // Delta calculation compared to starting standing
  const currentBaseline = course.currentStanding + dropBonus;
  const delta = projectedOverall - currentBaseline;

  // Update UI Elements
  const overallDisplay = document.getElementById('simProjectedOverall');
  const letterBadge = document.getElementById('simLetterGrade');
  const deltaBadge = document.getElementById('simDeltaBadge');
  const requiredDisplay = document.getElementById('simRequiredScore');
  const explainerSentence = document.getElementById('simExplainerSentence');
  const catSimScoreBadge = document.getElementById('catSimScoreBadge');

  if (catSimScoreBadge) {
    catSimScoreBadge.textContent = `${projectedExamScore.toFixed(1)}%`;
  }

  if (overallDisplay) {
    overallDisplay.textContent = `${projectedOverall.toFixed(2)}%`;
  }

  if (letterBadge) {
    const letter = getLetterGrade(projectedOverall);
    letterBadge.textContent = letter;
    letterBadge.className = `grade-letter-pill grade-${letter.charAt(0).toLowerCase()}`;
  }

  if (deltaBadge) {
    const sign = delta >= 0 ? '+' : '';
    deltaBadge.textContent = `${sign}${delta.toFixed(2)}%`;
    deltaBadge.className = delta >= 0 ? 'delta-pill delta-positive' : 'delta-pill delta-negative';
  }

  if (requiredDisplay) {
    if (requiredScore > 100) {
      requiredDisplay.innerHTML = `<span class="score-warning">${requiredScore.toFixed(1)}%</span> <span class="score-sub">(Requires Curve/Extra Credit)</span>`;
    } else if (requiredScore <= 0) {
      requiredDisplay.innerHTML = `<span class="score-safe">0.0%</span> <span class="score-sub">(Already Mathematically Secured!)</span>`;
    } else {
      requiredDisplay.innerHTML = `<span class="score-achievable">${requiredScore.toFixed(1)}%</span> <span class="score-sub">needed for ${targetGrade.toFixed(1)}%</span>`;
    }
  }

  if (explainerSentence) {
    let text = '';
    const finalWeightPct = finalWeight;
    const targetStatus = projectedOverall >= targetGrade ? 'meets your target' : 'falls short of your target';

    if (requiredScore > 100) {
      text = `Because the ${simulatedCategory.name} is worth <strong>${finalWeightPct}%</strong> of your grade, scoring <strong>${projectedExamScore}%</strong> yields an overall <strong>${projectedOverall.toFixed(2)}%</strong>. Mathematically, reaching ${targetGrade}% requires <strong>${requiredScore.toFixed(1)}%</strong>, which exceeds 100% without an exam curve or extra credit.`;
    } else if (projectedOverall >= targetGrade) {
      text = `With the ${simulatedCategory.name} weighted at <strong>${finalWeightPct}%</strong>, achieving <strong>${projectedExamScore}%</strong> moves your course standing to <strong>${projectedOverall.toFixed(2)}%</strong> (${getLetterGrade(projectedOverall)}), successfully locking in your ${targetGrade}% target!`;
    } else {
      text = `With the ${simulatedCategory.name} weighted at <strong>${finalWeightPct}%</strong>, scoring <strong>${projectedExamScore}%</strong> moves your course standing to <strong>${projectedOverall.toFixed(2)}%</strong>. You need at least <strong>${requiredScore.toFixed(1)}%</strong> to guarantee a final grade of ${targetGrade}%.`;
    }

    if (dropRuleActive && course.hasDropRule) {
      text += ` <em>(Includes dynamic +${course.dropBenefit}% syllabus drop-lowest adjustment).</em>`;
    }

    explainerSentence.innerHTML = text;
  }
}

function getLetterGrade(score) {
  if (score >= 93.0) return 'A';
  if (score >= 90.0) return 'A-';
  if (score >= 87.0) return 'B+';
  if (score >= 83.0) return 'B';
  if (score >= 80.0) return 'B-';
  if (score >= 77.0) return 'C+';
  if (score >= 73.0) return 'C';
  if (score >= 70.0) return 'C-';
  if (score >= 60.0) return 'D';
  return 'F';
}

