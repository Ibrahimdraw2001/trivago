const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { run, get, generateRefCode } = require('../db');
const { sign, authUser } = require('../middleware/auth');

const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
const MAX_REFERRALS = 15;
const MAX_LOGIN_ATTEMPTS = 10;
const LOCKOUT_MINUTES = 15;

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: '/',
};

function setAuthCookie(res, token) {
  res.cookie('token', token, COOKIE_OPTIONS);
}

router.post('/register', async (req, res) => {
  try {
    let { username, password, referralCode } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    username = String(username).trim().slice(0, 30);
    password = String(password);
    if (username.length < 3) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' });
    }
    if (!/^[A-Za-z0-9_-]+$/.test(username)) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط' });
    }
    if (!PASSWORD_RE.test(password)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط' });
    }
    const exists = await get('SELECT id FROM users WHERE username = ?', [username]);
    if (exists) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم مستخدم بالفعل' });
    }

    let inviterId = null;
    if (referralCode && String(referralCode).trim()) {
      const inviter = await get('SELECT id FROM users WHERE referral_code = ?', [String(referralCode).trim().toUpperCase()]);
      if (!inviter) {
        return res.status(400).json({ code: 400, message: 'كود الدعوة غير صحيح' });
      }
      const refCount = await get('SELECT COUNT(*) as count FROM referrals WHERE inviter_id = ?', [inviter.id]);
      if (refCount.count >= MAX_REFERRALS) {
        return res.status(400).json({ code: 400, message: 'كود الدعوة وصل للحد الأقصى' });
      }
      inviterId = inviter.id;
    }

    let code;
    let codeDup;
    do {
      code = generateRefCode();
      codeDup = await get('SELECT id FROM users WHERE referral_code = ?', [code]);
    } while (codeDup);

    const hash = bcrypt.hashSync(password, 10);
    const result = await run(
      'INSERT INTO users (username, password, referral_code, referred_by) VALUES (?, ?, ?, ?)',
      [username, hash, code, inviterId]
    );

    if (inviterId) {
      await run(
        'INSERT INTO referrals (inviter_id, invitee_id) VALUES (?, ?)',
        [inviterId, result.lastID]
      );
    }

    const user = await get('SELECT id, username, role, balance, level_id, referral_code, token_version FROM users WHERE id = ?', [result.lastID]);
    const token = sign(user);
    setAuthCookie(res, token);
    res.json({ code: 0, data: { user } });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في التسجيل' });
  }
});

router.post('/login', async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    username = String(username).trim().slice(0, 30);
    password = String(password);
    const ip = req.ip || req.connection?.remoteAddress || '';

    let locked = { count: 0 };
    try {
      locked = await get(
        "SELECT COUNT(*) as count FROM login_attempts WHERE username = ? AND success = 0 AND created_at > datetime('now', ?)",
        [username, `-${LOCKOUT_MINUTES} minutes`]
      );
    } catch (_) {}
    if (locked && locked.count >= MAX_LOGIN_ATTEMPTS) {
      return res.status(429).json({ code: 429, message: `تم قفل الحساب لمدة ${LOCKOUT_MINUTES} دقيقة بسبب محاولات كثيرة` });
    }

    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    const success = user && bcrypt.compareSync(password, user.password);

    try {
      await run('INSERT INTO login_attempts (username, ip, success) VALUES (?, ?, ?)', [username, ip, success ? 1 : 0]);
    } catch (_) {}

    if (!user || !success) {
      return res.status(401).json({ code: 401, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }

    const payload = { id: user.id, username: user.username, role: user.role, balance: user.balance, level_id: user.level_id, token_version: user.token_version || 0 };
    const token = sign(payload);
    setAuthCookie(res, token);
    res.json({ code: 0, data: { user: payload } });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تسجيل الدخول' });
  }
});

router.post('/admin-login', async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    username = String(username).trim().slice(0, 30);
    password = String(password);
    const ip = req.ip || req.connection?.remoteAddress || '';

    let locked = { count: 0 };
    try {
      locked = await get(
        "SELECT COUNT(*) as count FROM login_attempts WHERE username = ? AND success = 0 AND created_at > datetime('now', ?)",
        [username, `-${LOCKOUT_MINUTES} minutes`]
      );
    } catch (_) {}
    if (locked && locked.count >= MAX_LOGIN_ATTEMPTS) {
      return res.status(429).json({ code: 429, message: `تم قفل الحساب لمدة ${LOCKOUT_MINUTES} دقيقة بسبب محاولات كثيرة` });
    }

    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    const success = user && user.role === 'admin' && bcrypt.compareSync(password, user.password);

    try {
      await run('INSERT INTO login_attempts (username, ip, success) VALUES (?, ?, ?)', [username, ip, success ? 1 : 0]);
    } catch (_) {}

    if (!user || !success || user.role !== 'admin') {
      return res.status(401).json({ code: 401, message: 'بيانات الدخول غير صحيحة أو الحساب ليس أدمن' });
    }

    const payload = { id: user.id, username: user.username, role: user.role, balance: user.balance, level_id: user.level_id, token_version: user.token_version || 0 };
    const token = sign(payload);
    setAuthCookie(res, token);
    res.json({ code: 0, data: { user: payload } });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تسجيل الدخول' });
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
  res.json({ code: 0, message: 'تم تسجيل الخروج' });
});

router.get('/profile', authUser, async (req, res) => {
  const user = await get(
    `SELECT u.id, u.username, u.role, u.balance, u.level_id, u.referral_code, l.name as level_name
     FROM users u LEFT JOIN levels l ON u.level_id = l.id
     WHERE u.id = ?`,
    [req.user.id]
  );
  res.json({ code: 0, data: user });
});

router.post('/change-password', authUser, async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;
    currentPassword = String(currentPassword || '');
    newPassword = String(newPassword || '');
    const user = await get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ code: 404, message: 'المستخدم غير موجود' });
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الحالية غير صحيحة' });
    }
    if (!PASSWORD_RE.test(newPassword)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط' });
    }
    const hash = bcrypt.hashSync(newPassword, 10);
    await run('UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?', [hash, user.id]);
    res.json({ code: 0, message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تغيير كلمة المرور' });
  }
});

module.exports = router;
