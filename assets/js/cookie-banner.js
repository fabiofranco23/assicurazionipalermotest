/* ══ RF Assicurazioni – Cookie Banner GDPR ══════════════════════════════════
   Conforme al Garante Privacy italiano, GDPR UE 2016/679
   v1.0 – Maggio 2026
   ══════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var COOKIE_NAME = 'rf_cookie_consent';
  var COOKIE_VER  = 'rf_cookie_version';
  var VERSION     = '1';
  var EXPIRY_DAYS = 365;

  /* ── Helpers ── */
  function setCookie(name, val, days) {
    var d = new Date();
    d.setTime(d.getTime() + days * 864e5);
    document.cookie = name + '=' + val + ';expires=' + d.toUTCString() + ';path=/;SameSite=Lax';
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }
  function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  }

  /* ── Load Google Analytics (only after consent) ── */
  function loadGA() {
    if (window._gaLoaded) return;
    window._gaLoaded = true;
    var s = document.createElement('script');
    s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX'; // sostituire con il proprio ID
    s.async = true;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX', { anonymize_ip: true });
  }

  /* ── Apply consent ── */
  function applyConsent(prefs) {
    if (prefs.analytics) loadGA();
  }

  /* ── Save and apply ── */
  function saveConsent(prefs) {
    setCookie(COOKIE_NAME, JSON.stringify(prefs), EXPIRY_DAYS);
    setCookie(COOKIE_VER, VERSION, EXPIRY_DAYS);
    applyConsent(prefs);
    hideBanner();
  }

  /* ── Build banner HTML ── */
  function buildBanner() {
    var el = document.createElement('div');
    el.id = 'rf-cookie-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Gestione cookie');
    el.innerHTML =
      '<div class="rfcb-inner">' +
        '<div class="rfcb-content">' +
          '<div class="rfcb-logo-row">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color:#f5a623;flex-shrink:0"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>' +
            '<strong>Informativa sui Cookie</strong>' +
          '</div>' +
          '<p>Utilizziamo cookie tecnici necessari al funzionamento del sito e, previo tuo consenso, cookie analitici per migliorare la navigazione. Non utilizziamo cookie di profilazione per finalit&agrave; pubblicitarie.</p>' +
          '<p style="font-size:.78rem;margin-top:4px"><a href="page-cookie-policy.html" style="color:#f5a623;text-decoration:underline">Cookie Policy</a> &nbsp;&bull;&nbsp; <a href="page-privacy.html" style="color:#f5a623;text-decoration:underline">Privacy Policy</a></p>' +
        '</div>' +
        '<div class="rfcb-actions">' +
          '<button id="rfcb-accept" class="rfcb-btn rfcb-btn-primary">Accetta tutti</button>' +
          '<button id="rfcb-reject" class="rfcb-btn rfcb-btn-outline">Rifiuta</button>' +
          '<button id="rfcb-custom" class="rfcb-btn rfcb-btn-text">Personalizza</button>' +
        '</div>' +
      '</div>' +

      /* Personalizza panel */
      '<div class="rfcb-panel" id="rfcb-panel" aria-hidden="true">' +
        '<div class="rfcb-panel-inner">' +
          '<button class="rfcb-panel-close" id="rfcb-panel-close" aria-label="Chiudi">' +
            '<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" fill="none" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
          '</button>' +
          '<h3>Gestisci preferenze cookie</h3>' +

          '<div class="rfcb-toggle-row">' +
            '<div>' +
              '<strong>Cookie tecnici necessari</strong>' +
              '<p>Indispensabili per il funzionamento del sito. Non disattivabili.</p>' +
            '</div>' +
            '<div class="rfcb-switch rfcb-switch-on rfcb-switch-disabled" aria-label="Sempre attivi">On</div>' +
          '</div>' +

          '<div class="rfcb-toggle-row">' +
            '<div>' +
              '<strong>Cookie analitici (Google Analytics)</strong>' +
              '<p>Ci aiutano a capire come gli utenti interagiscono con il sito in forma anonimizzata.</p>' +
            '</div>' +
            '<label class="rfcb-switch-label">' +
              '<input type="checkbox" id="rfcb-chk-analytics" style="position:absolute;opacity:0;width:0;height:0">' +
              '<span class="rfcb-switch" id="rfcb-sw-analytics">Off</span>' +
            '</label>' +
          '</div>' +

          '<div class="rfcb-panel-footer">' +
            '<button id="rfcb-save-prefs" class="rfcb-btn rfcb-btn-primary">Salva preferenze</button>' +
          '</div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(el);
    return el;
  }

  function showBanner() {
    var b = document.getElementById('rf-cookie-banner');
    if (b) { b.classList.add('rfcb-visible'); b.removeAttribute('aria-hidden'); }
  }
  function hideBanner() {
    var b = document.getElementById('rf-cookie-banner');
    if (b) { b.classList.remove('rfcb-visible'); b.setAttribute('aria-hidden', 'true'); }
  }

  function togglePanel(show) {
    var p = document.getElementById('rfcb-panel');
    if (!p) return;
    if (show) { p.classList.add('rfcb-panel-open'); p.removeAttribute('aria-hidden'); }
    else { p.classList.remove('rfcb-panel-open'); p.setAttribute('aria-hidden', 'true'); }
  }

  function updateSwitch(id, active) {
    var sw = document.getElementById(id);
    if (!sw) return;
    sw.textContent = active ? 'On' : 'Off';
    if (active) sw.classList.add('rfcb-switch-on'); else sw.classList.remove('rfcb-switch-on');
  }

  /* ── Init ── */
  function init() {
    var existing = getCookie(COOKIE_NAME);
    var version  = getCookie(COOKIE_VER);

    if (existing && version === VERSION) {
      try { applyConsent(JSON.parse(existing)); } catch (e) {}
      return;
    }

    /* Check for "reset" link */
    if (document.getElementById('rfcb-reset')) {
      document.getElementById('rfcb-reset').addEventListener('click', function (e) {
        e.preventDefault();
        deleteCookie(COOKIE_NAME);
        deleteCookie(COOKIE_VER);
        showBanner();
      });
    }

    buildBanner();
    setTimeout(showBanner, 600);

    /* Bind analytics checkbox to switch */
    var chk = document.getElementById('rfcb-chk-analytics');
    if (chk) {
      chk.addEventListener('change', function () {
        updateSwitch('rfcb-sw-analytics', this.checked);
      });
    }

    document.getElementById('rfcb-accept').addEventListener('click', function () {
      saveConsent({ analytics: true });
    });
    document.getElementById('rfcb-reject').addEventListener('click', function () {
      saveConsent({ analytics: false });
    });
    document.getElementById('rfcb-custom').addEventListener('click', function () {
      togglePanel(true);
    });
    document.getElementById('rfcb-panel-close').addEventListener('click', function () {
      togglePanel(false);
    });
    document.getElementById('rfcb-save-prefs').addEventListener('click', function () {
      var analytics = document.getElementById('rfcb-chk-analytics').checked;
      saveConsent({ analytics: analytics });
      togglePanel(false);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
