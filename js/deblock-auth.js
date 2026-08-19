/* ── Deblock Auth Module (MultiDB) ──
 *
 * Couche d'authentification de MultiDB. Elle s'appuie sur le MÊME projet
 * Supabase que MultiCraft-Info (le compte « Deblock »).
 *
 * La connexion se fait sur MultiCraft-Info : l'utilisateur est redirigé vers
 * https://multicraft-info-beta.pages.dev/compte?redirect=<url>, se connecte
 * là-bas, puis revient ici avec `access_token` / `refresh_token` dans l'URL.
 * Ces jetons sont repris via handleRedirectSession() et stockés localement.
 *
 * Usage :
 *   Deblock.getUser()          → auth.user object ou null
 *   Deblock.getDisplayName()   → string
 *   Deblock.getAvatarUrl()     → URL d'avatar personnalisée ou ''
 *   Deblock.getApiHeaders()    → headers pour les appels REST
 *   Deblock.getSupabaseUrl()   → string
 *   Deblock.getLoginUrl()      → URL de connexion (redirection vers MultiCraft-Info)
 *   Deblock.logout()
 *   Deblock.onAuthStateChanged(callback)
 *   Deblock.ready()            → Promise
 */
(function () {
  'use strict';

  var SUPABASE_URL = 'https://rdtvftclctwfqtpkbzlf.supabase.co';
  var SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkdHZmdGNsY3R3ZnF0cGtiemxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3MTc0MjksImV4cCI6MjEwMDI5MzQyOX0.DIsdZkJaoziW2OI2hbDalDl0IQCGPF3QRcBhKT7GW7o';
  var MULTICRAFT_INFO_URL = 'https://multicraft-info-beta.pages.dev';

  var supabase = null;
  var currentUser = null;
  var cachedAccessToken = null;
  var authListeners = [];
  var ready = false;
  var initializationPromise = null;

  function init() {
    if (initializationPromise) return initializationPromise;

    initializationPromise = new Promise(function (resolve) {
      function tryInit() {
        if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
          supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: false,
              flowType: 'pkce',
            },
          });

          handleRedirectSession()
            .then(function () { return supabase.auth.getSession(); })
            .then(function (result) {
              var session = result.data && result.data.session ? result.data.session : null;
              if (session) {
                currentUser = session.user;
                cachedAccessToken = session.access_token;
              }
              ready = true;
              notifyListeners(currentUser);
              resolve();
            })
            .catch(function () {
              ready = true;
              notifyListeners(null);
              resolve();
            });

          supabase.auth.onAuthStateChange(function (event, session) {
            if (session) {
              currentUser = session.user;
              cachedAccessToken = session.access_token;
            } else {
              currentUser = null;
              cachedAccessToken = null;
            }
            setTimeout(function () { notifyListeners(currentUser); }, 0);
          });
        } else {
          setTimeout(tryInit, 50);
        }
      }
      tryInit();
    });

    return initializationPromise;
  }

  /* Reprend les jetons passés dans l'URL (query string) par MultiCraft-Info
     après une connexion. Nettoie ensuite l'URL pour ne pas exposer les jetons. */
  function handleRedirectSession() {
    var params = new URLSearchParams(window.location.search);
    var accessToken = params.get('access_token');
    var refreshToken = params.get('refresh_token');

    if (!accessToken || !refreshToken) return Promise.resolve(false);

    var expiresIn = params.get('expires_in');
    var tokenType = params.get('token_type');

    params.delete('access_token');
    params.delete('refresh_token');
    params.delete('expires_in');
    params.delete('token_type');
    params.delete('type');

    var qs = params.toString();
    var cleanUrl = window.location.pathname + (qs ? '?' + qs : '') + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);

    var payload = { access_token: accessToken, refresh_token: refreshToken };
    if (expiresIn) payload.expires_in = parseInt(expiresIn, 10);
    if (tokenType) payload.token_type = tokenType;

    return supabase.auth.setSession(payload);
  }

  function notifyListeners(user) {
    for (var i = 0; i < authListeners.length; i++) {
      try { authListeners[i](user); } catch (e) { console.error('[Deblock] Listener error:', e); }
    }
  }

  (function boot() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  })();

  window.Deblock = {
    ready: function () { return initializationPromise || init(); },
    isReady: function () { return ready; },
    getClient: function () { return supabase; },
    getSupabaseUrl: function () { return SUPABASE_URL; },
    getAnonKey: function () { return SUPABASE_ANON_KEY; },
    getUser: function () { return currentUser; },
    getAccessToken: function () { return cachedAccessToken; },

    getApiHeaders: function () {
      var headers = {
        'apikey': SUPABASE_ANON_KEY,
        'Content-Type': 'application/json',
      };
      headers['Authorization'] = 'Bearer ' + (cachedAccessToken || SUPABASE_ANON_KEY);
      return headers;
    },

    getDisplayName: function () {
      if (!currentUser) return '';
      return currentUser.user_metadata && currentUser.user_metadata.display_name
        ? currentUser.user_metadata.display_name
        : (currentUser.user_metadata && currentUser.user_metadata.username
          ? currentUser.user_metadata.username
          : (currentUser.email || ''));
    },

    /* Retourne uniquement l'avatar personnalisé ('' si aucun).
       L'interface affiche sinon l'initiale du pseudo. */
    getAvatarUrl: function () {
      if (!currentUser) return '';
      if (currentUser.user_metadata && currentUser.user_metadata.avatar_url) {
        return currentUser.user_metadata.avatar_url;
      }
      return '';
    },

    /* URL de connexion : redirige vers MultiCraft-Info puis revient ici. */
    getLoginUrl: function () {
      var target = window.location.origin + window.location.pathname + window.location.hash;
      return MULTICRAFT_INFO_URL + '/compte?redirect=' + encodeURIComponent(target);
    },

    logout: async function () {
      if (!supabase) return;
      var result = await supabase.auth.signOut();
      if (result.error) throw result.error;
    },

    isLoggedIn: function () { return currentUser !== null; },

    onAuthStateChanged: function (callback) {
      authListeners.push(callback);
      if (ready) {
        setTimeout(function () { callback(currentUser); }, 0);
      }
      return function () {
        authListeners = authListeners.filter(function (cb) { return cb !== callback; });
      };
    },
  };
})();
