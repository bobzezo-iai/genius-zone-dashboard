/**
 * Client Loader — Detects /c/{slug} route and pre-loads client profile
 * Injects profile data into localStorage for dashboard rendering
 * Story 1.1 — SPEC-GZD-001
 */
var ClientLoader = (function() {
  'use strict';

  var LS_DATA_BASE = 'psicometria_data_v2';
  var ROUTE_REGEX = /^\/c\/([a-z0-9-]{2,60})$/;

  function getSlugFromUrl() {
    var match = window.location.pathname.match(ROUTE_REGEX);
    return match ? match[1] : null;
  }

  function getClientUid(slug) {
    return 'client_' + slug;
  }

  function getDataKey(slug) {
    return LS_DATA_BASE + '_' + getClientUid(slug);
  }

  function load() {
    var slug = getSlugFromUrl();
    if (!slug) return null;

    // Check if already cached in localStorage
    var dataKey = getDataKey(slug);
    var cached = localStorage.getItem(dataKey);
    if (cached) {
      try {
        var data = JSON.parse(cached);
        if (data && data.profile) {
          return { slug: slug, data: data, uid: getClientUid(slug), fromCache: true };
        }
      } catch(e) {
        localStorage.removeItem(dataKey);
      }
    }

    return { slug: slug, data: null, uid: getClientUid(slug), fromCache: false };
  }

  function fetchProfile(slug, callback) {
    fetch('/api/client-profile?slug=' + encodeURIComponent(slug))
      .then(function(r) {
        if (r.status === 404) {
          return r.json().then(function(data) {
            callback(null, { pending: true, message: data.message || 'Perfil em preparação' });
          });
        }
        if (!r.ok) throw new Error('Erro ao carregar perfil');
        return r.json().then(function(data) {
          // Save to localStorage
          var dataKey = getDataKey(slug);
          localStorage.setItem(dataKey, JSON.stringify(data));
          callback(data, null);
        });
      })
      .catch(function(err) {
        callback(null, { error: true, message: err.message || 'Erro de conexão' });
      });
  }

  function isClientRoute() {
    return ROUTE_REGEX.test(window.location.pathname);
  }

  function getSlug() {
    return getSlugFromUrl();
  }

  function getUserId(slug) {
    return getClientUid(slug);
  }

  return {
    load: load,
    fetchProfile: fetchProfile,
    isClientRoute: isClientRoute,
    getSlug: getSlug,
    getUserId: getUserId
  };
})();
