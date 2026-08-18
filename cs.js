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

  const scheduleDays = [...document.querySelectorAll('.schedule-day')];
  const previousDay = document.querySelector('#schedule-previous');
  const nextDay = document.querySelector('#schedule-next');
  const scheduleStatus = document.querySelector('#schedule-status');
  let activeScheduleDay = 0;

  const showScheduleDay = index => {
    activeScheduleDay = index;
    scheduleDays.forEach((day, dayIndex) => {
      day.hidden = dayIndex !== activeScheduleDay;
    });
    previousDay.disabled = activeScheduleDay === 0;
    nextDay.disabled = activeScheduleDay === scheduleDays.length - 1;
    scheduleStatus.textContent = `Day ${activeScheduleDay + 1} of ${scheduleDays.length}`;
  };

  previousDay?.addEventListener('click', () => showScheduleDay(activeScheduleDay - 1));
  nextDay?.addEventListener('click', () => showScheduleDay(activeScheduleDay + 1));
});
