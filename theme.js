/**
 * theme.js — Nitrox Unified Brand Theme Bootstrap
 * Eliminates Flash of Unstyled Content (FOUC) by executing before <body> renders.
 * Synchronizes across Nitrox ecosystem properties via localStorage key 'nitrox-theme'.
 * Supports 3 states: 'dark' | 'light' | 'device'
 */
(function () {
  const STORAGE_KEY = 'nitrox-theme';

  function getSystemPreference() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark';
  }

  function applyTheme(preference) {
    const root = document.documentElement;
    const resolved = preference === 'device' || !preference ? getSystemPreference() : preference;
    root.setAttribute('data-theme', resolved);
    root.setAttribute('data-theme-setting', preference || 'device');
  }

  // Read stored preference or default to device
  const storedTheme = localStorage.getItem(STORAGE_KEY) || 'device';
  applyTheme(storedTheme);

  // Listen to system changes if in device mode
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
      const current = localStorage.getItem(STORAGE_KEY) || 'device';
      if (current === 'device') {
        applyTheme('device');
        window.dispatchEvent(new CustomEvent('nitrox-theme-change', { detail: { theme: 'device' } }));
      }
    });
  }

  // Global theme switcher helper
  window.setNitroxTheme = function (mode) {
    if (['dark', 'light', 'device'].includes(mode)) {
      localStorage.setItem(STORAGE_KEY, mode);
      applyTheme(mode);
      window.dispatchEvent(new CustomEvent('nitrox-theme-change', { detail: { theme: mode } }));
    }
  };

  window.cycleNitroxTheme = function () {
    const current = localStorage.getItem(STORAGE_KEY) || 'device';
    const sequence = { dark: 'light', light: 'device', device: 'dark' };
    const next = sequence[current] || 'dark';
    window.setNitroxTheme(next);
    return next;
  };

  window.getNitroxTheme = function () {
    return localStorage.getItem(STORAGE_KEY) || 'device';
  };
})();

