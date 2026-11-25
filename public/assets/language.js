(() => {
  'use strict';
  const key = 'oikumene.language';
  const supported = value => typeof value === 'string' && ['fi','en'].includes(value);
  document.addEventListener('click', event => {
    const link = event.target.closest?.('a[data-language-choice]');
    const lang = link?.dataset.languageChoice;
    if (supported(lang)) {
      try { localStorage.setItem(key,lang); } catch { /* links still work */ }
    }
  });
  if (location.pathname !== '/') return;
  let saved = null;
  try { saved = localStorage.getItem(key); } catch { /* storage unavailable */ }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  const browser = languages.map(s => String(s || '').toLowerCase().split('-')[0]).find(supported);
  location.replace('/' + (supported(saved) ? saved : browser || 'en') + '/' + location.search + location.hash);
})();
