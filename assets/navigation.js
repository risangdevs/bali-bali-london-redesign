// Shared disclosure behavior for the editorial concepts.
(() => {
  const nav = document.querySelector('.nav');
  const toggle = nav?.querySelector('.menu-button, .menu-btn, .burger');
  const links = nav?.querySelector('.navlinks');
  if (!nav || !toggle || !links) return;
  links.id = 'primary-navigation';
  toggle.setAttribute('aria-controls', links.id);
  const setOpen = (open, restoreFocus = false) => {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Explore');
    toggle.textContent = open ? 'Close' : 'Explore';
    if (restoreFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  links.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false, true);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav.classList.contains('open')) setOpen(false, true);
  });
  document.addEventListener('pointerdown', (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
  nav.addEventListener('focusout', (event) => {
    if (!nav.contains(event.relatedTarget)) setOpen(false);
  });
})();
