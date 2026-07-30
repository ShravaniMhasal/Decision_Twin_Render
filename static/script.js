document.addEventListener('DOMContentLoaded', () => {
  // --- Dashboard Drawer Toggle ---
  const toggleBtn = document.getElementById('dashboard-toggle-btn');
  const closeBtn = document.getElementById('drawer-close-btn');
  const drawer = document.getElementById('dashboard-drawer');
  const overlay = document.getElementById('dashboard-overlay');

  if (toggleBtn) toggleBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    overlay.classList.add('open');
  });

  const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // --- Auth Check & Logout Handler ---
  const loginBtn = document.getElementById('login-btn');
  const profileBtn = document.getElementById('profile-btn');
  const drawerLogoutItem = document.getElementById('drawer-logout-item');
  const drawerLogoutBtn = document.getElementById('drawer-logout-btn');

  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (isLoggedIn) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileBtn) profileBtn.style.display = 'flex';
    if (drawerLogoutItem) drawerLogoutItem.style.display = 'block';
  } else {
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (profileBtn) profileBtn.style.display = 'none';
    if (drawerLogoutItem) drawerLogoutItem.style.display = 'none';
  }

  if (drawerLogoutBtn) {
    drawerLogoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('isLoggedIn');
      window.location.reload();
    });
  }
});
 function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close drawer on link click
  document.querySelectorAll('.drawer-list a').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Prevent default behavior on empty links
  document.querySelectorAll('.btn, .nav-links a').forEach(el => {
    el.addEventListener('click', (e) => {
      if (el.tagName === 'A' && el.getAttribute('href') === '#') {
        e.preventDefault();
      }
    });
  });