/* auth.js — shared auth utility for E2E STR
 * Manages user sessions and nav state across all pages.
 * Users are stored in localStorage (demo-mode — swap for a real backend later).
 *
 * Data model:
 *   e2eSTR.users   — array of { email, password, type ('paying'|'free'), name }
 *   e2eSTR.session — current session { email, type, name }
 */
(function () {
  var AUTH_KEY    = 'e2eSTR.session';
  var USERS_KEY   = 'e2eSTR.users';

  /* ── Core helpers ───────────────────────────────────────────────── */
  function getSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)); } catch (e) { return null; }
  }
  function setSession(user) {
    localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email, type: user.type, name: user.name || '' }));
  }
  function clearSession() {
    localStorage.removeItem(AUTH_KEY);
  }
  function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch (e) { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function findUser(email) {
    return getUsers().find(function (u) { return u.email.toLowerCase() === email.toLowerCase(); }) || null;
  }

  /* Seed a demo paying client so there's always at least one test account */
  function seedDemo() {
    var users = getUsers();
    var hasSeed = users.some(function (u) { return u.email === 'demo@e2estr.com'; });
    if (!hasSeed) {
      users.push({ email: 'demo@e2estr.com', password: 'client2024', type: 'paying', name: 'Demo Client', setup: true });
      saveUsers(users);
    }
  }

  /* ── Nav update ─────────────────────────────────────────────────── */
  function updateNav() {
    var session = getSession();
    var btn = document.querySelector('.nav-signin');
    if (!btn) return;
    if (session) {
      btn.textContent = session.type === 'paying' ? 'My Portal' : 'My Account';
      btn.href = session.type === 'paying' ? 'client.html' : 'plans.html';
      btn.classList.add('nav-signin--active');
    }
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.E2EAuth = {
    getSession:  getSession,
    setSession:  setSession,
    clearSession: clearSession,
    getUsers:    getUsers,
    saveUsers:   saveUsers,
    findUser:    findUser,

    /* Register a new user (called by team portal) */
    addUser: function (email, name, type) {
      var users = getUsers();
      if (users.some(function (u) { return u.email.toLowerCase() === email.toLowerCase(); })) return false;
      users.push({ email: email, password: null, type: type || 'paying', name: name || '', setup: false });
      saveUsers(users);
      return true;
    },

    /* Set / change password for a user */
    setPassword: function (email, password) {
      var users = getUsers();
      var user = users.find(function (u) { return u.email.toLowerCase() === email.toLowerCase(); });
      if (!user) return false;
      user.password = password;
      user.setup = true;
      saveUsers(users);
      return true;
    },

    /* Attempt login. Returns { ok, user, reason } */
    login: function (email, password) {
      var user = findUser(email);
      if (!user) return { ok: false, reason: 'no_account' };
      if (!user.setup || !user.password) return { ok: false, reason: 'needs_setup' };
      if (user.password !== password) return { ok: false, reason: 'wrong_password' };
      setSession(user);
      return { ok: true, user: user };
    }
  };

  /* ── Init ───────────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    seedDemo();
    updateNav();
  });
})();
