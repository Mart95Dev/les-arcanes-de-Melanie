/* ============================================
   RGPD — Cookie Consent Management
   Les Arcanes de Melanie
   ============================================ */

var CookieConsent = (function () {
  'use strict';

  var STORAGE_KEY = 'cookie_consent';
  var CONSENT_VERSION = '1.0';
  var EXPIRY_DAYS = 180; // 6 months
  var focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  var previousFocus = null;

  // ---- Helpers ----

  function getStoredConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  }

  function setStoredConsent(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch (e) {
      // Silent fail
    }
  }

  function isConsentExpired(consent) {
    if (!consent || !consent.timestamp) return true;
    var consentDate = new Date(consent.timestamp);
    var now = new Date();
    var diffDays = (now - consentDate) / (1000 * 60 * 60 * 24);
    return diffDays > EXPIRY_DAYS;
  }

  function dispatchConsentEvent(consent) {
    var event;
    try {
      event = new CustomEvent('cookie-consent-updated', { detail: consent });
    } catch (e) {
      event = document.createEvent('CustomEvent');
      event.initCustomEvent('cookie-consent-updated', true, true, consent);
    }
    document.dispatchEvent(event);
  }

  // ---- DOM Injection ----

  function injectBanner() {
    if (document.getElementById('cookie-banner')) return;

    var banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Gestion des cookies');
    banner.innerHTML =
      '<div class="cookie-banner__inner">' +
        '<p class="cookie-banner__text">' +
          'Nous utilisons des cookies pour assurer le bon fonctionnement du site et ameliorer votre experience. ' +
          'Vous pouvez personnaliser vos preferences ou consulter notre ' +
          '<a href="politique-confidentialite.html">politique de confidentialite</a>.' +
        '</p>' +
        '<div class="cookie-banner__actions">' +
          '<button class="cookie-banner__btn cookie-banner__btn--accept" id="cookie-accept-all">Tout accepter</button>' +
          '<button class="cookie-banner__btn cookie-banner__btn--customize" id="cookie-customize">Personnaliser</button>' +
          '<button class="cookie-banner__btn cookie-banner__btn--reject" id="cookie-reject-all">Tout refuser</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(banner);
  }

  function injectModal() {
    if (document.getElementById('cookie-modal-overlay')) return;

    var overlay = document.createElement('div');
    overlay.id = 'cookie-modal-overlay';
    overlay.className = 'cookie-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Parametres des cookies');
    overlay.innerHTML =
      '<div class="cookie-modal" id="cookie-modal">' +
        '<button class="cookie-modal__close" id="cookie-modal-close" aria-label="Fermer">&times;</button>' +
        '<h2 class="cookie-modal__title">Parametres des cookies</h2>' +
        '<p class="cookie-modal__description">' +
          'Gerez vos preferences de cookies. Les cookies necessaires sont indispensables au fonctionnement du site.' +
        '</p>' +

        // Necessary
        '<div class="cookie-category">' +
          '<div class="cookie-category__header">' +
            '<span class="cookie-category__label">Cookies necessaires</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" checked disabled id="cookie-necessary">' +
              '<span class="cookie-toggle__slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category__description">Indispensables au fonctionnement du site. Ils ne peuvent pas etre desactives.</p>' +
        '</div>' +

        // Analytics
        '<div class="cookie-category">' +
          '<div class="cookie-category__header">' +
            '<span class="cookie-category__label">Cookies analytiques</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" id="cookie-analytics">' +
              '<span class="cookie-toggle__slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category__description">Nous aident a comprendre comment vous utilisez le site (Plausible Analytics).</p>' +
        '</div>' +

        // Marketing
        '<div class="cookie-category">' +
          '<div class="cookie-category__header">' +
            '<span class="cookie-category__label">Cookies marketing</span>' +
            '<label class="cookie-toggle">' +
              '<input type="checkbox" id="cookie-marketing">' +
              '<span class="cookie-toggle__slider"></span>' +
            '</label>' +
          '</div>' +
          '<p class="cookie-category__description">Utilises pour le suivi des campagnes et le partage sur les reseaux sociaux.</p>' +
        '</div>' +

        '<div class="cookie-modal__actions">' +
          '<button class="cookie-modal__btn cookie-modal__btn--save" id="cookie-save-prefs">Enregistrer mes preferences</button>' +
          '<button class="cookie-modal__btn cookie-modal__btn--reject" id="cookie-modal-reject">Tout refuser</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlay);
  }

  // ---- Banner ----

  function showBanner() {
    injectBanner();
    injectModal();
    bindEvents();
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      // Force reflow before adding class
      banner.offsetHeight;
      banner.classList.add('cookie-banner--visible');
    }
  }

  function hideBanner() {
    var banner = document.getElementById('cookie-banner');
    if (banner) {
      banner.classList.remove('cookie-banner--visible');
    }
  }

  // ---- Modal ----

  function showPreferences() {
    injectBanner();
    injectModal();
    bindEvents();

    // Load current state into toggles
    var consent = getConsent();
    var analyticsToggle = document.getElementById('cookie-analytics');
    var marketingToggle = document.getElementById('cookie-marketing');
    if (analyticsToggle) analyticsToggle.checked = consent.analytics;
    if (marketingToggle) marketingToggle.checked = consent.marketing;

    var overlay = document.getElementById('cookie-modal-overlay');
    if (overlay) {
      previousFocus = document.activeElement;
      overlay.classList.add('cookie-modal-overlay--visible');
      // Focus first focusable element
      var modal = document.getElementById('cookie-modal');
      if (modal) {
        var first = modal.querySelector(focusableSelector);
        if (first) first.focus();
      }
    }
  }

  function hidePreferences() {
    var overlay = document.getElementById('cookie-modal-overlay');
    if (overlay) {
      overlay.classList.remove('cookie-modal-overlay--visible');
    }
    if (previousFocus) {
      previousFocus.focus();
      previousFocus = null;
    }
  }

  // ---- Consent Actions ----

  function acceptAll() {
    var consent = {
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    };
    setStoredConsent(consent);
    hideBanner();
    hidePreferences();
    loadScripts(consent);
    dispatchConsentEvent(consent);
  }

  function rejectAll() {
    var consent = {
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    };
    setStoredConsent(consent);
    hideBanner();
    hidePreferences();
    loadScripts(consent);
    dispatchConsentEvent(consent);
  }

  function savePreferences() {
    var analyticsToggle = document.getElementById('cookie-analytics');
    var marketingToggle = document.getElementById('cookie-marketing');
    var consent = {
      necessary: true,
      analytics: analyticsToggle ? analyticsToggle.checked : false,
      marketing: marketingToggle ? marketingToggle.checked : false,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    };
    setStoredConsent(consent);
    hideBanner();
    hidePreferences();
    loadScripts(consent);
    dispatchConsentEvent(consent);
  }

  function getConsent() {
    var stored = getStoredConsent();
    if (stored && !isConsentExpired(stored)) {
      return {
        necessary: true,
        analytics: !!stored.analytics,
        marketing: !!stored.marketing
      };
    }
    return {
      necessary: true,
      analytics: false,
      marketing: false
    };
  }

  // ---- Script Loading ----

  function loadScripts(consent) {
    if (!consent) consent = getConsent();

    if (consent.analytics) {
      // Plausible Analytics — replace domain with actual domain
      if (!document.getElementById('plausible-script')) {
        var s = document.createElement('script');
        s.id = 'plausible-script';
        s.defer = true;
        s.setAttribute('data-domain', 'lesarcanesdemelanie.fr');
        s.src = 'https://plausible.io/js/script.js';
        document.head.appendChild(s);
      }
    }

    // Marketing scripts can be added here when needed
  }

  // ---- Focus Trap ----

  function trapFocus(e) {
    var overlay = document.getElementById('cookie-modal-overlay');
    if (!overlay || !overlay.classList.contains('cookie-modal-overlay--visible')) return;

    var modal = document.getElementById('cookie-modal');
    if (!modal) return;

    var focusable = modal.querySelectorAll(focusableSelector);
    if (focusable.length === 0) return;

    var firstFocusable = focusable[0];
    var lastFocusable = focusable[focusable.length - 1];

    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  }

  // ---- Event Binding ----

  var eventsBound = false;

  function bindEvents() {
    if (eventsBound) return;
    eventsBound = true;

    // Banner buttons
    document.addEventListener('click', function (e) {
      var target = e.target;

      if (target.id === 'cookie-accept-all') {
        acceptAll();
      } else if (target.id === 'cookie-reject-all') {
        rejectAll();
      } else if (target.id === 'cookie-customize') {
        showPreferences();
      } else if (target.id === 'cookie-modal-close') {
        hidePreferences();
      } else if (target.id === 'cookie-save-prefs') {
        savePreferences();
      } else if (target.id === 'cookie-modal-reject') {
        rejectAll();
      } else if (target.id === 'cookie-modal-overlay') {
        hidePreferences();
      }
    });

    // Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        var overlay = document.getElementById('cookie-modal-overlay');
        if (overlay && overlay.classList.contains('cookie-modal-overlay--visible')) {
          hidePreferences();
        }
      }
      trapFocus(e);
    });
  }

  // ---- Init ----

  function init() {
    var stored = getStoredConsent();

    if (stored && !isConsentExpired(stored) && stored.version === CONSENT_VERSION) {
      // Consent already given and valid — load scripts accordingly
      loadScripts({
        necessary: true,
        analytics: !!stored.analytics,
        marketing: !!stored.marketing
      });
    } else {
      // No valid consent — show banner
      showBanner();
    }
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // ---- Public API ----
  return {
    init: init,
    showBanner: showBanner,
    hideBanner: hideBanner,
    showPreferences: showPreferences,
    hidePreferences: hidePreferences,
    acceptAll: acceptAll,
    rejectAll: rejectAll,
    savePreferences: savePreferences,
    getConsent: getConsent,
    loadScripts: loadScripts
  };

})();
