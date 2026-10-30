(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');
  function closeMenu() {
    nav.classList.remove('is-open');
    menu.setAttribute('aria-expanded', 'false');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  const language = document.querySelector('.language-link');
  const languageBase = language.getAttribute('href');
  const preserveSection = () => { language.href = languageBase + window.location.hash; };
  preserveSection();
  window.addEventListener('hashchange', preserveSection);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nav.querySelectorAll('a').forEach((link) => {
            if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
          });
        }
      });
    }, { rootMargin: '-90px 0px -55% 0px', threshold: 0 });
    document.querySelectorAll('#research,#engineering,#background,#skills').forEach((section) => observer.observe(section));
  }
  const copy = document.querySelector('.copy-email');
  copy.addEventListener('click', async () => {
    const status = document.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(copy.dataset.email);
      status.textContent = document.body.dataset.copied;
    } catch {
      status.textContent = document.body.dataset.copyFail;
    }
  });
})();
