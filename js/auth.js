/* ============================================
   Authentication — Les Arcanes de Mélanie
   ============================================ */

(function () {
  'use strict';

  // Pre-computed SHA-256 hash of the admin password
  var ADMIN_EMAIL = 'admin@lesarcanesdemelanie.fr';
  var ADMIN_PASSWORD_HASH = '0527075a50cf49ce0b7a1b734e2f9bef18e7d48ab7963dd7fd85b5d0f7ae1659';
  var SESSION_KEY = 'adminSession';
  var SESSION_DURATION = 8 * 60 * 60 * 1000; // 8 hours in ms

  /**
   * Hash a string with SHA-256 using Web Crypto API
   * @param {string} message
   * @returns {Promise<string>} hex string
   */
  async function sha256(message) {
    var encoder = new TextEncoder();
    var data = encoder.encode(message);
    var hashBuffer = await crypto.subtle.digest('SHA-256', data);
    var hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(function (b) { return b.toString(16).padStart(2, '0'); }).join('');
  }

  /**
   * Check if the current session is authenticated and not expired
   * @returns {boolean}
   */
  function isAuthenticated() {
    try {
      var sessionData = sessionStorage.getItem(SESSION_KEY);
      if (!sessionData) return false;

      var session = JSON.parse(sessionData);
      if (!session.authenticated) return false;

      // Check expiration (8 hours)
      var elapsed = Date.now() - session.loginTime;
      if (elapsed > SESSION_DURATION) {
        sessionStorage.removeItem(SESSION_KEY);
        return false;
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Attempt login with email and password
   * @param {string} email
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async function login(email, password) {
    var normalizedEmail = email.trim().toLowerCase();
    var passwordHash = await sha256(password);

    if (normalizedEmail === ADMIN_EMAIL && passwordHash === ADMIN_PASSWORD_HASH) {
      var session = {
        authenticated: true,
        email: normalizedEmail,
        loginTime: Date.now()
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    }

    return false;
  }

  /**
   * Logout: clear session and redirect to login page
   */
  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
    window.location.href = 'login.html';
  }

  /**
   * Guard: redirect to login if not authenticated
   */
  function requireAuth() {
    if (!isAuthenticated()) {
      window.location.href = 'login.html';
    }
  }

  // Expose globally
  window.Auth = {
    isAuthenticated: isAuthenticated,
    login: login,
    logout: logout,
    requireAuth: requireAuth
  };

})();
