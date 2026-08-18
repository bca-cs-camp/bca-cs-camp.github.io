// Small enhancements only: all important page content remains editable in cs.html.
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  menuButton?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.textContent = open ? 'Close' : 'Menu';
  });

  document.querySelectorAll('.main-nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuButton) menuButton.textContent = 'Menu';
  }));

  document.querySelectorAll('.room-more').forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.room-card');
      const open = card.classList.toggle('open');
      button.setAttribute('aria-expanded', String(open));
      button.setAttribute('aria-label', `${open ? 'Hide' : 'Show'} ${card.querySelector('h3').textContent} details`);
    });
  });

  const search = document.querySelector('#team-search');
  const rows = [...document.querySelectorAll('.score-table tbody tr')];
  const emptyState = document.querySelector('#score-empty');
  search?.addEventListener('input', () => {
    const query = search.value.trim().toLowerCase();
    let found = 0;
    rows.forEach(row => {
      const match = row.dataset.team.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) found += 1;
    });
    emptyState.hidden = found > 0;
  });
});
