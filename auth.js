/* auth.js — shared auth utility for E2E STR */
(function () {
  var AUTH_KEY  = 'e2eSTR.session';
  var USERS_KEY = 'e2eSTR.users';

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

  function seedDemo() {
    var users = getUsers();
    if (!users.some(function (u) { return u.email === 'demo@e2estr.com'; })) {
      users.push({ email: 'demo@e2estr.com', password: 'client2024', type: 'paying', name: 'Demo Client', setup: true });
      saveUsers(users);
    }
  }

  /* ── Nav: inject Sign In / My Portal + Sign Out ─────────────────── */
  function updateNav() {
    var session  = getSession();
    var actions  = document.querySelector('.nav-actions');
    var signinEl = document.querySelector('.nav-signin');
    if (!actions && !signinEl) return;

    if (session) {
      /* Swap Sign In for "My Portal" + "Sign Out" */
      if (signinEl) {
        signinEl.textContent = session.type === 'paying' ? 'My Portal' : 'My Account';
        signinEl.href = session.type === 'paying' ? 'client.html' : 'plans.html';
        signinEl.classList.add('nav-signin--active');
      }
      /* Inject Sign Out button if not already there */
      if (actions && !actions.querySelector('.nav-signout')) {
        var out = document.createElement('button');
        out.className = 'nav-signout';
        out.textContent = 'Sign Out';
        out.addEventListener('click', function () {
          clearSession();
          window.location.href = 'index.html';
        });
        actions.insertBefore(out, actions.firstChild);
      }
    }
  }

  /* ── Public API ─────────────────────────────────────────────────── */
  window.E2EAuth = {
    getSession:   getSession,
    setSession:   setSession,
    clearSession: clearSession,
    getUsers:     getUsers,
    saveUsers:    saveUsers,
    findUser:     findUser,

    addUser: function (email, name, type) {
      var users = getUsers();
      if (users.some(function (u) { return u.email.toLowerCase() === email.toLowerCase(); })) return false;
      users.push({ email: email, password: null, type: type || 'paying', name: name || '', setup: false });
      saveUsers(users);
      return true;
    },

    setPassword: function (email, password) {
      var users = getUsers();
      var user = users.find(function (u) { return u.email.toLowerCase() === email.toLowerCase(); });
      if (!user) return false;
      user.password = password;
      user.setup = true;
      saveUsers(users);
      return true;
    },

    login: function (email, password) {
      var user = findUser(email);
      if (!user) return { ok: false, reason: 'no_account' };
      if (!user.setup || !user.password) return { ok: false, reason: 'needs_setup' };
      if (user.password !== password) return { ok: false, reason: 'wrong_password' };
      setSession(user);
      return { ok: true, user: user };
    },

    signOut: function (redirectTo) {
      clearSession();
      window.location.href = redirectTo || 'index.html';
    },

    /* Returns all email subscribers (from guide unlock flow) */
    getSubscribers: function () {
      try { return JSON.parse(localStorage.getItem('e2eSTR.subscribers')) || []; } catch (e) { return []; }
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    seedDemo();
    updateNav();
  });
})();
