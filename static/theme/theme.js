/* ==========================================================
   DECISION TWIN — Global Theme Engine
   theme.js
   
   Loaded on every page BEFORE </body>.
   Handles: toggle button injection, theme switching,
   localStorage persistence, Chart.js updates, and
   profile page backward compatibility.
   ========================================================== */

(function () {
  'use strict';

  // ---- Constants ----
  const STORAGE_KEY = 'theme';
  const LIGHT = 'light';
  const DARK = 'dark';
  const ICON_LIGHT = '🌞';
  const ICON_DARK = '🌙';

  // ---- Utility: Get current theme ----
  function getTheme() {
    return document.documentElement.dataset.theme || DARK;
  }

  // ---- Utility: Apply theme to DOM ----
  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;

    // Profile page backward compatibility: sync body.dark-theme class
    if (theme === DARK) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.remove('dark-theme');
      document.body.classList.add('light-theme');
    }

    // Update toggle button icon if it exists
    var btn = document.querySelector('.theme-toggle-btn');
    if (btn) {
      var icon = btn.querySelector('.theme-icon');
      if (icon) {
        icon.textContent = theme === DARK ? ICON_DARK : ICON_LIGHT;
        // Trigger spin animation
        btn.classList.remove('animate');
        void btn.offsetWidth; // force reflow
        btn.classList.add('animate');
      }
      btn.setAttribute('aria-label',
        theme === DARK ? 'Switch to light theme' : 'Switch to dark theme'
      );
    }

    // Update Chart.js instances
    updateCharts(theme);
  }

  // ---- Utility: Save theme to localStorage ----
  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // localStorage unavailable (private mode, etc.) — silently ignore
    }
  }

  // ---- Toggle theme ----
  function toggleTheme() {
    var current = getTheme();
    var next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    saveTheme(next);
  }

  // ---- Update Chart.js instances when theme changes ----
  function updateCharts(theme) {
    if (typeof Chart === 'undefined') return;

    var isDark = theme === DARK;
    var gridColor = isDark ? 'rgba(123,189,232,0.12)' : '#e3edf5';
    var tickColor = isDark ? '#6EA2B3' : '#49769F';
    var legendColor = isDark ? '#BDD8E9' : '#001D39';
    var borderColor = isDark ? '#001D39' : '#FFFFFF';

    // Chart.js v3+ stores instances in Chart.instances (object)
    // Chart.js v4+ may use different structure
    var instances = null;

    if (Chart.instances) {
      // v3/v4: Chart.instances is an object keyed by id
      if (typeof Chart.instances === 'object' && !Array.isArray(Chart.instances)) {
        instances = Object.values(Chart.instances);
      } else {
        instances = Chart.instances;
      }
    }

    if (!instances || instances.length === 0) return;

    instances.forEach(function (chart) {
      if (!chart || !chart.options) return;

      // Update scales (line, bar charts)
      if (chart.options.scales) {
        Object.keys(chart.options.scales).forEach(function (key) {
          var scale = chart.options.scales[key];
          if (scale.ticks) scale.ticks.color = tickColor;
          if (scale.grid) scale.grid.color = gridColor;
        });
      }

      // Update legend
      if (chart.options.plugins && chart.options.plugins.legend &&
          chart.options.plugins.legend.labels) {
        chart.options.plugins.legend.labels.color = legendColor;
      }

      // Update doughnut/pie border colors
      if (chart.config && chart.config.data && chart.config.data.datasets) {
        chart.config.data.datasets.forEach(function (ds) {
          if (chart.config.type === 'doughnut' || chart.config.type === 'pie') {
            ds.borderColor = borderColor;
          }
        });
      }

      chart.update('none'); // 'none' avoids animation on theme change
    });
  }

  // ---- Inject toggle button into DOM ----
  function injectToggleButton() {
    // Don't double-inject
    if (document.querySelector('.theme-toggle-btn')) return;

    var btn = document.createElement('button');
    btn.className = 'theme-toggle-btn';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label',
      getTheme() === DARK ? 'Switch to light theme' : 'Switch to dark theme'
    );
    btn.setAttribute('title', 'Toggle theme');

    var icon = document.createElement('span');
    icon.className = 'theme-icon';
    icon.textContent = getTheme() === DARK ? ICON_DARK : ICON_LIGHT;
    btn.appendChild(icon);

    btn.addEventListener('click', toggleTheme);

    // If page has an auth container or nav-links (e.g. landing page navbar), place on the left side of login button
    var targetParent = document.querySelector('#auth-container') ||
                       document.querySelector('.nav-links');
    var targetBefore = document.querySelector('#login-btn') ||
                       document.querySelector('.nav-login') ||
                       (targetParent ? targetParent.firstChild : null);

    if (targetParent) {
      if (targetBefore && targetBefore.parentNode === targetParent) {
        targetParent.insertBefore(btn, targetBefore);
      } else {
        targetParent.insertBefore(btn, targetParent.firstChild);
      }
    } else {
      document.body.appendChild(btn);
    }
  }

  // ---- Initialize on DOMContentLoaded ----
  function init() {
    // Apply the theme that the FOUC script set (or default)
    var theme = getTheme();
    applyTheme(theme);

    // Inject toggle button
    injectToggleButton();
  }

  // ---- Listen to system preference changes ----
  function listenSystemPreference() {
    try {
      var mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', function (e) {
        // Only auto-switch if user hasn't manually chosen a theme
        var stored = null;
        try { stored = localStorage.getItem(STORAGE_KEY); } catch (ex) { /* */ }
        if (!stored) {
          var newTheme = e.matches ? DARK : LIGHT;
          applyTheme(newTheme);
        }
      });
    } catch (e) {
      // matchMedia not supported — ignore
    }
  }

  // ---- Run ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  listenSystemPreference();

})();
