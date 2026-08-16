const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser, authAdmin } = require('../middleware/auth');

router.use(authUser, authAdmin);

router.get('/stats', async (req, res) => {
  const users = await get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['user']);
  const pendingDeposits = await get('SELECT COUNT(*) as count FROM deposits WHERE status = ?', ['pending']);
  const pendingWithdrawals = await get('SELECT COUNT(*) as count FROM withdrawals WHERE status = ?', ['pending']);
  const totalBalance = await get('SELECT COALESCE(SUM(balance),0) as sum FROM users WHERE role = ?', ['user']);
  const hotels = await get('SELECT COUNT(*) as count FROM hotels');
  res.json({
    code: 0,
    data: {
      users: users.count,
      pendingDeposits: pendingDeposits.count,
      pendingWithdrawals: pendingWithdrawals.count,
      totalBalance: totalBalance.sum,
      hotels: hotels.count,
    },
  });
});

router.get('/users', async (req, res) => {
  const rows = await all(
    `SELECT u.id, u.username, u.role, u.balance, u.level_id, l.name as level_name, u.created_at
     FROM users u LEFT JOIN levels l ON u.level_id = l.id
     WHERE u.role = ? ORDER BY u.created_at DESC`,
    ['user']
  );
  res.json({ code: 0, data: rows });
});

router.put('/users/:id', async (req, res) => {
  try {
    const { username, balance, levelId } = req.body;
    const user = await get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!user) return res.status(404).json({ code: 404, message: 'المستخدم غير موجود' });
    if (user.role === 'admin') return res.status(400).json({ code: 400, message: 'لا يمكن تعديل حساب الأدمن' });

    if (username !== undefined && username !== null && username !== user.username) {
      if (!String(username).trim()) return res.status(400).json({ code: 400, message: 'اسم المستخدم لا يمكن أن يكون فارغاً' });
      const dup = await get('SELECT id FROM users WHERE username = ? AND id != ?', [String(username).trim(), user.id]);
      if (dup) return res.status(400).json({ code: 400, message: 'اسم المستخدم مستخدم بالفعل' });
      await run('UPDATE users SET username = ? WHERE id = ?', [String(username).trim(), user.id]);
    }

    if (balance !== undefined && balance !== null && Number(balance) >= 0 && Number(balance) !== user.balance) {
      const newBalance = Number(balance);
      await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
      await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
        [user.id, 'admin_adjust', newBalance - user.balance, newBalance, 'تعديل رصيد من قبل الأدمن']);
    }

    if (levelId !== undefined && levelId !== null && Number(levelId) !== user.level_id) {
      const level = await get('SELECT id FROM levels WHERE id = ?', [levelId]);
      if (level) await run('UPDATE users SET level_id = ? WHERE id = ?', [Number(levelId), user.id]);
    }

    const updated = await get(
      `SELECT u.id, u.username, u.role, u.balance, u.level_id, l.name as level_name, u.created_at
       FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.id = ?`,
      [user.id]
    );
    res.json({ code: 0, data: updated, message: 'تم تحديث بيانات المستخدم' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تعديل المستخدم' });
  }
});

router.get('/deposits', async (req, res) => {
  const { status } = req.query;
  let sql = `SELECT d.*, u.username FROM deposits d JOIN users u ON d.user_id = u.id`;
  const params = [];
  if (status) {
    sql += ` WHERE d.status = ?`;
    params.push(status);
  }
  sql += ` ORDER BY d.created_at DESC`;
  const rows = await all(sql, params);
  res.json({ code: 0, data: rows });
});

router.post('/deposits/:id/approve', async (req, res) => {
  const deposit = await get('SELECT * FROM deposits WHERE id = ?', [req.params.id]);
  if (!deposit) return res.status(404).json({ code: 404, message: 'الطلب غير موجود' });
  if (deposit.status !== 'pending') return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });

  const user = await get('SELECT * FROM users WHERE id = ?', [deposit.user_id]);
  const newBalance = user.balance + deposit.amount;
  await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
  await run('UPDATE deposits SET status = ?, processed_at = datetime(\'now\'), admin_id = ? WHERE id = ?',
    ['approved', req.user.id, deposit.id]);
  await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
    [deposit.user_id, 'deposit', deposit.amount, newBalance, 'إيداع عبر شام كاش']);

  res.json({ code: 0, message: 'تمت الموافقة على الإيداع وإضافة الرصيد' });
});

router.post('/deposits/:id/reject', async (req, res) => {
  const deposit = await get('SELECT * FROM deposits WHERE id = ?', [req.params.id]);
  if (!deposit) return res.status(404).json({ code: 404, message: 'الطلب غير موجود' });
  if (deposit.status !== 'pending') return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });

  await run('UPDATE deposits SET status = ?, processed_at = datetime(\'now\'), admin_id = ? WHERE id = ?',
    ['rejected', req.user.id, deposit.id]);
  res.json({ code: 0, message: 'تم رفض طلب الإيداع' });
});

router.get('/withdrawals', async (req, res) => {
  const { status } = req.query;
  let sql = `SELECT w.*, u.username FROM withdrawals w JOIN users u ON w.user_id = u.id`;
  const params = [];
  if (status) {
    sql += ` WHERE w.status = ?`;
    params.push(status);
  }
  sql += ` ORDER BY w.created_at DESC`;
  const rows = await all(sql, params);
  res.json({ code: 0, data: rows });
});

router.post('/withdrawals/:id/approve', async (req, res) => {
  const withdrawal = await get('SELECT * FROM withdrawals WHERE id = ?', [req.params.id]);
  if (!withdrawal) return res.status(404).json({ code: 404, message: 'الطلب غير موجود' });
  if (withdrawal.status !== 'pending') return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });

  await run('UPDATE withdrawals SET status = ?, processed_at = datetime(\'now\'), admin_id = ? WHERE id = ?',
    ['approved', req.user.id, withdrawal.id]);
  res.json({ code: 0, message: 'تم تحويل المبلغ عبر شام كاش والموافقة على السحب' });
});

router.post('/withdrawals/:id/reject', async (req, res) => {
  const withdrawal = await get('SELECT * FROM withdrawals WHERE id = ?', [req.params.id]);
  if (!withdrawal) return res.status(404).json({ code: 404, message: 'الطلب غير موجود' });
  if (withdrawal.status !== 'pending') return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });

  const user = await get('SELECT * FROM users WHERE id = ?', [withdrawal.user_id]);
  const newBalance = user.balance + withdrawal.amount;
  await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
  await run('UPDATE withdrawals SET status = ?, processed_at = datetime(\'now\'), admin_id = ? WHERE id = ?',
    ['rejected', req.user.id, withdrawal.id]);
  await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
    [withdrawal.user_id, 'withdraw_refund', withdrawal.amount, newBalance, 'إرجاع مبلغ السحب المرفوض']);

  res.json({ code: 0, message: 'تم رفض السحب وإرجاع المبلغ للرصيد' });
});

router.get('/hotels', async (req, res) => {
  const rows = await all('SELECT * FROM hotels ORDER BY created_at DESC');
  res.json({ code: 0, data: rows });
});

router.post('/hotels', async (req, res) => {
  const { name, city, image, description } = req.body;
  if (!name) return res.status(400).json({ code: 400, message: 'اسم الفندق مطلوب' });
  const result = await run('INSERT INTO hotels (name, city, image, description) VALUES (?, ?, ?, ?)',
    [name, city || '', image || '', description || '']);
  res.json({ code: 0, data: { id: result.lastID }, message: 'تمت إضافة الفندق' });
});

router.put('/hotels/:id', async (req, res) => {
  const { name, city, image, description, active } = req.body;
  const hotel = await get('SELECT id FROM hotels WHERE id = ?', [req.params.id]);
  if (!hotel) return res.status(404).json({ code: 404, message: 'الفندق غير موجود' });
  await run('UPDATE hotels SET name = ?, city = ?, image = ?, description = ?, active = ? WHERE id = ?',
    [name, city || '', image || '', description || '', active ? 1 : 0, req.params.id]);
  res.json({ code: 0, message: 'تم تحديث الفندق' });
});

router.delete('/hotels/:id', async (req, res) => {
  await run('DELETE FROM hotels WHERE id = ?', [req.params.id]);
  res.json({ code: 0, message: 'تم حذف الفندق' });
});

router.get('/levels', async (req, res) => {
  const rows = await all('SELECT * FROM levels ORDER BY price');
  res.json({ code: 0, data: rows });
});

router.post('/levels', async (req, res) => {
  const { name, price, dailyVideos, rewardPerVideo } = req.body;
  if (!name || !price || !dailyVideos || !rewardPerVideo) {
    return res.status(400).json({ code: 400, message: 'جميع الحقول مطلوبة' });
  }
  const result = await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)',
    [name, price, dailyVideos, rewardPerVideo]);
  res.json({ code: 0, data: { id: result.lastID }, message: 'تمت إضافة المستوى' });
});

router.put('/levels/:id', async (req, res) => {
  const { name, price, dailyVideos, rewardPerVideo } = req.body;
  const level = await get('SELECT id FROM levels WHERE id = ?', [req.params.id]);
  if (!level) return res.status(404).json({ code: 404, message: 'المستوى غير موجود' });
  await run('UPDATE levels SET name = ?, price = ?, daily_videos = ?, reward_per_video = ? WHERE id = ?',
    [name, price, dailyVideos, rewardPerVideo, req.params.id]);
  res.json({ code: 0, message: 'تم تحديث المستوى' });
});

router.delete('/levels/:id', async (req, res) => {
  await run('DELETE FROM levels WHERE id = ?', [req.params.id]);
  res.json({ code: 0, message: 'تم حذف المستوى' });
});

router.get('/transactions', async (req, res) => {
  const rows = await all(
    `SELECT t.*, u.username FROM transactions t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC LIMIT 100`
  );
  res.json({ code: 0, data: rows });
});

module.exports = router;
