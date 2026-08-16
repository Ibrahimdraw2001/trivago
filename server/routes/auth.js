const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { run, get } = require('../db');
const { sign, authUser } = require('../middleware/auth');

const PASSWORD_RE = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    if (!PASSWORD_RE.test(password)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط' });
    }
    const exists = await get('SELECT id FROM users WHERE username = ?', [username]);
    if (exists) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم مستخدم بالفعل' });
    }
    const hash = bcrypt.hashSync(password, 10);
    const result = await run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hash]);
    const user = await get('SELECT id, username, role, balance, level_id FROM users WHERE id = ?', [result.lastID]);
    const token = sign(user);
    res.json({ code: 0, data: { token, user } });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في التسجيل' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    const user = await get('SELECT * FROM users WHERE username = ?', [username]);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ code: 401, message: 'اسم المستخدم أو كلمة المرور غير صحيحة' });
    }
    const payload = { id: user.id, username: user.username, role: user.role, balance: user.balance, level_id: user.level_id };
    const token = sign(payload);
    res.json({ code: 0, data: { token, user: payload } });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تسجيل الدخول' });
  }
});

router.get('/profile', authUser, async (req, res) => {
  const user = await get(
    `SELECT u.id, u.username, u.role, u.balance, u.level_id, l.name as level_name
     FROM users u LEFT JOIN levels l ON u.level_id = l.id
     WHERE u.id = ?`,
    [req.user.id]
  );
  res.json({ code: 0, data: user });
});

router.post('/change-password', authUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ code: 404, message: 'المستخدم غير موجود' });
    if (!bcrypt.compareSync(currentPassword || '', user.password)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الحالية غير صحيحة' });
    }
    if (!PASSWORD_RE.test(newPassword || '')) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل وتحتوي أحرفاً وأرقاماً فقط' });
    }
    const hash = bcrypt.hashSync(String(newPassword), 10);
    await run('UPDATE users SET password = ? WHERE id = ?', [hash, user.id]);
    res.json({ code: 0, message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تغيير كلمة المرور' });
  }
});

module.exports = router;
