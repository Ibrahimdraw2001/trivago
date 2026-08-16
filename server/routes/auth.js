const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { run, get } = require('../db');
const { sign, authUser } = require('../middleware/auth');

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ code: 400, message: 'اسم المستخدم وكلمة المرور مطلوبان' });
    }
    if (password.length < 6) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' });
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

module.exports = router;
