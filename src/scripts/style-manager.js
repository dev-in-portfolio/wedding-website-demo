/**
 * Style Manager for Site 3: 5 Distinct Visual Directions
 */
const VALID_STYLES = [
  'coastal-editorial',
  'southern-classic',
  'contemporary-luxe',
  'garden-romantic',
  'bold-modern'
];

const STORAGE_KEY = 'dscg_wedding_website_style';
const DEFAULT_STYLE = 'coastal-editorial';

export function getActiveStyle() {
  const urlParams = new URLSearchParams(window.location.search);
  const queryStyle = urlParams.get('style');
  if (queryStyle && VALID_STYLES.includes(queryStyle)) {
    return queryStyle;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && VALID_STYLES.includes(stored)) {
    return stored;
  }

  return DEFAULT_STYLE;
}

export function applyStyle(styleName) {
  if (!VALID_STYLES.includes(styleName)) return;

  document.documentElement.setAttribute('data-style', styleName);
  document.body.setAttribute('data-style', styleName);

  try {
    localStorage.setItem(STORAGE_KEY, styleName);
  } catch (e) {
    // LocalStorage may be blocked in some private browsing modes
  }

  // Update button active states
  const buttons = document.querySelectorAll('.style-btn');
  buttons.forEach(btn => {
    const isTarget = btn.getAttribute('data-style-target') === styleName;
    btn.classList.toggle('active', isTarget);
    btn.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
  });

  // Update mobile select if present
  const select = document.getElementById('style-select');
  if (select && select.value !== styleName) {
    select.value = styleName;
  }
}

export function initStyleManager() {
  const current = getActiveStyle();
  applyStyle(current);

  // Desktop buttons
  const buttons = document.querySelectorAll('.style-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetStyle = btn.getAttribute('data-style-target');
      if (targetStyle) {
        applyStyle(targetStyle);
      }
    });
  });

  // Mobile select
  const select = document.getElementById('style-select');
  if (select) {
    select.addEventListener('change', (e) => {
      applyStyle(e.target.value);
    });
  }
}
