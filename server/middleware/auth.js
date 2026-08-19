const jwt = require('jsonwebtoken');
const { get } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;

function sign(user) {
  return jwt.sign({ id: user.id, role: user.role, tv: user.token_version || 0 }, JWT_SECRET, { expiresIn: '7d' });
}

async function authUser(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const headerToken = header.startsWith('Bearer ') ? header.slice(7) : null;
    const token = headerToken || req.cookies?.token;
    if (!token) {
      return res.status(401).json({ code: 401, message: 'غير مسجل الدخول' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    let user;
    try {
      user = await get('SELECT id, username, role, balance, level_id, token_version FROM users WHERE id = ?', [decoded.id]);
    } catch (_) {
      user = await get('SELECT id, username, role, balance, level_id FROM users WHERE id = ?', [decoded.id]);
    }
    if (!user) {
      return res.status(401).json({ code: 401, message: 'المستخدم غير موجود' });
    }
    if (user.token_version !== undefined && decoded.tv !== undefined && decoded.tv !== user.token_version) {
      return res.status(401).json({ code: 401, message: 'انتهت الجلسة، سجل الدخول مجدداً' });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ code: 401, message: 'انتهت الجلسة، سجل الدخول مجدداً' });
  }
}

async function authAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ code: 403, message: 'ليس لديك صلاحية' });
  }
  next();
}

module.exports = { sign, authUser, authAdmin };
