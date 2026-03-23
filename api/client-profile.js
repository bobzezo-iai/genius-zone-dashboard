/**
 * Client Profile API — Serves pre-curated profile.json by client slug
 * Endpoint: GET /api/client-profile?slug={slug}
 * Story 1.1 — SPEC-GZD-001
 */
const path = require('path');
const fs = require('fs');
const { rateLimit } = require('./_shared/rate-limiter');

var SLUG_REGEX = /^[a-z0-9-]{2,60}$/;

module.exports = function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  // Rate limit: 10 requests per minute per IP
  if (!rateLimit(req, res, 10, 60 * 1000)) return;

  var slug = req.query && req.query.slug;
  if (!slug || !SLUG_REGEX.test(slug)) {
    return res.status(400).json({ error: 'Slug inválido' });
  }

  // Security: reject any path traversal attempts
  if (slug.indexOf('..') !== -1 || slug.indexOf('/') !== -1 || slug.indexOf('\\') !== -1) {
    return res.status(400).json({ error: 'Slug inválido' });
  }

  var profilePath = path.join(__dirname, '..', 'grimoires', slug, 'profile.json');

  // Ensure resolved path is within grimoires directory
  var grimoiresDir = path.resolve(path.join(__dirname, '..', 'grimoires'));
  var resolvedPath = path.resolve(profilePath);
  if (!resolvedPath.startsWith(grimoiresDir)) {
    return res.status(400).json({ error: 'Slug inválido' });
  }

  try {
    if (!fs.existsSync(resolvedPath)) {
      return res.status(404).json({
        status: 'pending',
        message: 'Perfil em preparação',
        slug: slug
      });
    }

    var content = fs.readFileSync(resolvedPath, 'utf8');
    var data = JSON.parse(content);

    // Cache for 5 minutes (profile changes are rare)
    res.setHeader('Cache-Control', 'public, max-age=300');
    return res.status(200).json(data);
  } catch (err) {
    console.error('client-profile error:', err.message);
    return res.status(500).json({ error: 'Erro ao carregar perfil' });
  }
};
