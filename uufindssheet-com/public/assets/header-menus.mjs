// Keep header disclosures separate from native currency menus and page content.
export function bindHeaderMenus(header) {
  if (!header) return () => {};
  const menus = [...header.querySelectorAll('.mobile-nav-menu, .language-menu, .language-picker')];
  const close = () => menus.forEach(menu => { menu.open = false; });
  const dismissOutside = event => menus.forEach(menu => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  const followLink = event => { if (event.target.closest('a')) close(); };
  const escape = event => {
    if (event.key !== 'Escape') return;
    const opened = menus.find(menu => menu.open);
    if (!opened) return;
    event.preventDefault();
    close();
    opened.querySelector('summary')?.focus();
  };
  document.addEventListener('pointerdown', dismissOutside);
  document.addEventListener('focusin', dismissOutside);
  document.addEventListener('keydown', escape);
  header.addEventListener('click', followLink);
  return () => {
    document.removeEventListener('pointerdown', dismissOutside);
    document.removeEventListener('focusin', dismissOutside);
    document.removeEventListener('keydown', escape);
    header.removeEventListener('click', followLink);
  };
}
