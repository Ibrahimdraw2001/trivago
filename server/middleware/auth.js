const jwt = require('jsonwebtoken');
const { get } = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'wallet_secret_key';

function sign(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
}

async function authUser(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) {
      return res.status(401).json({ code: 401, message: 'غير مسجل الدخول' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await get('SELECT id, username, role, balance, level_id FROM users WHERE id = ?', [decoded.id]);
    if (!user) {
      return res.status(401).json({ code: 401, message: 'المستخدم غير موجود' });
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

module.exports = { JWT_SECRET, sign, authUser, authAdmin };
