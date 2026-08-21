const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { run, get, all } = require('../db');
const { authUser, authAdmin } = require('../middleware/auth');
const { logActivity } = require('../helpers/activity');
const { todayLocal, nowLocal } = require('../helpers/time');
const { round2 } = require('../db');

const BEP20_RE = /^0x[0-9a-fA-F]{40}$/;

router.use(authUser, authAdmin);

router.get('/stats', async (req, res) => {
  const users = await get('SELECT COUNT(*) as count FROM users WHERE role = ?', ['user']);
  const pendingDeposits = await get('SELECT COUNT(*) as count FROM deposits WHERE status = ?', ['pending']);
  const pendingWithdrawals = await get('SELECT COUNT(*) as count FROM withdrawals WHERE status = ?', ['pending']);
  const totalBalance = await get('SELECT COALESCE(SUM(balance),0) as sum FROM users WHERE role = ?', ['user']);
  const hotels = await get('SELECT COUNT(*) as count FROM hotels');
  const totalDeposits = await get('SELECT COALESCE(SUM(amount),0) as sum FROM deposits WHERE status = ?', ['approved']);
  const totalWithdrawals = await get('SELECT COALESCE(SUM(amount),0) as sum FROM withdrawals WHERE status = ?', ['approved']);
  const totalRatings = await get('SELECT COUNT(*) as count FROM ratings');
  const totalReferrals = await get('SELECT COUNT(*) as count FROM referrals WHERE status = ?', ['completed']);
  res.json({
    code: 0,
    data: {
      users: users.count,
      pendingDeposits: pendingDeposits.count,
      pendingWithdrawals: pendingWithdrawals.count,
      totalBalance: totalBalance.sum,
      hotels: hotels.count,
      totalDeposits: totalDeposits.sum,
      totalWithdrawals: totalWithdrawals.sum,
      totalRatings: totalRatings.count,
      totalReferrals: totalReferrals.count,
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
    let { username, balance, levelId } = req.body;
    const user = await get('SELECT * FROM users WHERE id = ?', [req.params.id]);
    if (!user) return res.status(404).json({ code: 404, message: 'المستخدم غير موجود' });
    if (user.role === 'admin') return res.status(400).json({ code: 400, message: 'لا يمكن تعديل حساب الأدمن' });

    const ts = nowLocal();
    const today = todayLocal();

    if (username !== undefined && username !== null && username !== user.username) {
      username = String(username).trim().slice(0, 30);
      if (!username) return res.status(400).json({ code: 400, message: 'اسم المستخدم لا يمكن أن يكون فارغاً' });
      if (username.length < 3) return res.status(400).json({ code: 400, message: 'اسم المستخدم يجب أن يكون 3 أحرف على الأقل' });
      const dup = await get('SELECT id FROM users WHERE username = ? AND id != ?', [username, user.id]);
      if (dup) return res.status(400).json({ code: 400, message: 'اسم المستخدم مستخدم بالفعل' });
      await run('UPDATE users SET username = ? WHERE id = ?', [username, user.id]);
    }

    if (balance !== undefined && balance !== null && Number(balance) >= 0 && Number(balance) !== user.balance) {
      const newBalance = round2(Number(balance));
      await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
      await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
        [user.id, 'admin_adjust', newBalance - user.balance, newBalance, 'تعديل رصيد من قبل الأدمن', ts]);
    }

    if (levelId !== undefined && Number(levelId) !== (user.level_id || 0)) {
      if (levelId === null || levelId === '' || levelId === 0) {
        await run('UPDATE users SET level_id = NULL, level_date = NULL, level_purchased_at = NULL WHERE id = ?',
          [user.id]);
      } else {
        const level = await get('SELECT id FROM levels WHERE id = ?', [levelId]);
        if (level) {
          await run('UPDATE users SET level_id = ?, level_date = ?, level_purchased_at = ? WHERE id = ?',
            [Number(levelId), today, ts, user.id]);
        }
      }
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
  try {
    const ts = nowLocal();
    const deposit = await get('SELECT * FROM deposits WHERE id = ? AND status = ?', [req.params.id, 'pending']);
    if (!deposit) {
      return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });
    }

    await run(
      "UPDATE deposits SET status = 'approved', processed_at = ?, admin_id = ? WHERE id = ?",
      [ts, req.user.id, deposit.id]
    );
    await run('UPDATE users SET balance = balance + ? WHERE id = ?', [deposit.amount, deposit.user_id]);
    const user = await get('SELECT balance FROM users WHERE id = ?', [deposit.user_id]);
    const newBalance = round2(user.balance);
    await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, deposit.user_id]);
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [deposit.user_id, 'deposit', deposit.amount, newBalance, 'إيداع عبر USDT', ts]);
    logActivity(deposit.user_id, 'deposit_approved', `إيداع $${deposit.amount} تمت الموافقة عليه`);
    res.json({ code: 0, message: 'تمت الموافقة على الإيداع وإضافة الرصيد' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في الموافقة على الإيداع' });
  }
});

router.post('/deposits/:id/reject', async (req, res) => {
  try {
    const ts = nowLocal();
    const result = await run(
      "UPDATE deposits SET status = 'rejected', processed_at = ?, admin_id = ? WHERE id = ? AND status = 'pending'",
      [ts, req.user.id, req.params.id]
    );
    if (result.changes === 0) {
      return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً أو غير موجود' });
    }
    res.json({ code: 0, message: 'تم رفض طلب الإيداع' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في رفض الإيداع' });
  }
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
  try {
    const ts = nowLocal();
    const withdrawal = await get('SELECT * FROM withdrawals WHERE id = ? AND status = ?', [req.params.id, 'pending']);
    if (!withdrawal) {
      return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً أو غير موجود' });
    }

    await run(
      "UPDATE withdrawals SET status = 'approved', processed_at = ?, admin_id = ? WHERE id = ?",
      [ts, req.user.id, withdrawal.id]
    );
    logActivity(withdrawal.user_id, 'withdrawal_approved', `سحب تمت الموافقة عليه`);
    res.json({ code: 0, message: 'تم تحويل المبلغ عبر USDT والموافقة على السحب' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في الموافقة على السحب' });
  }
});

router.post('/withdrawals/:id/reject', async (req, res) => {
  try {
    const ts = nowLocal();
    const withdrawal = await get('SELECT * FROM withdrawals WHERE id = ?', [req.params.id]);
    if (!withdrawal) return res.status(404).json({ code: 404, message: 'الطلب غير موجود' });
    if (withdrawal.status !== 'pending') return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });

    const result = await run(
      "UPDATE withdrawals SET status = 'rejected', processed_at = ?, admin_id = ? WHERE id = ? AND status = 'pending'",
      [ts, req.user.id, req.params.id]
    );
    if (result.changes === 0) {
      return res.status(400).json({ code: 400, message: 'تمت معالجة هذا الطلب مسبقاً' });
    }

    await run('UPDATE users SET balance = balance + ? WHERE id = ?', [withdrawal.amount, withdrawal.user_id]);
    const user = await get('SELECT balance FROM users WHERE id = ?', [withdrawal.user_id]);
    const newBalance = round2(user.balance);
    await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, withdrawal.user_id]);
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [withdrawal.user_id, 'withdraw_refund', withdrawal.amount, newBalance, 'إرجاع مبلغ السحب المرفوض', ts]);

    res.json({ code: 0, message: 'تم رفض السحب وإرجاع المبلغ للرصيد' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في رفض السحب' });
  }
});

router.get('/hotels', async (req, res) => {
  const rows = await all('SELECT * FROM hotels ORDER BY created_at DESC');
  res.json({ code: 0, data: rows });
});

router.post('/hotels', async (req, res) => {
  let { name, city, country, image, description } = req.body;
  name = String(name || '').trim().slice(0, 100);
  city = String(city || '').trim().slice(0, 100);
  country = String(country || '').trim().slice(0, 100);
  image = String(image || '').trim().slice(0, 500);
  description = String(description || '').trim().slice(0, 1000);
  if (!name) return res.status(400).json({ code: 400, message: 'اسم الفندق مطلوب' });
  const result = await run('INSERT INTO hotels (name, city, country, image, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
    [name, city, country, image, description, nowLocal()]);
  res.json({ code: 0, data: { id: result.lastID }, message: 'تمت إضافة الفندق' });
});

router.put('/hotels/:id', async (req, res) => {
  let { name, city, country, image, description, active } = req.body;
  const hotel = await get('SELECT id, active FROM hotels WHERE id = ?', [req.params.id]);
  if (!hotel) return res.status(404).json({ code: 404, message: 'الفندق غير موجود' });
  name = String(name || '').trim().slice(0, 100);
  city = String(city || '').trim().slice(0, 100);
  country = String(country || '').trim().slice(0, 100);
  image = String(image || '').trim().slice(0, 500);
  description = String(description || '').trim().slice(0, 1000);
  const isActive = active !== undefined ? (active ? 1 : 0) : hotel.active;
  await run('UPDATE hotels SET name = ?, city = ?, country = ?, image = ?, description = ?, active = ? WHERE id = ?',
    [name, city, country, image, description, isActive, req.params.id]);
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
  let { name, price, dailyVideos, rewardPerVideo } = req.body;
  name = String(name || '').trim().slice(0, 50);
  price = Number(price);
  dailyVideos = Number(dailyVideos);
  rewardPerVideo = Number(rewardPerVideo);
  if (!name || !Number.isFinite(price) || price <= 0 || !Number.isFinite(dailyVideos) || dailyVideos <= 0 || !Number.isFinite(rewardPerVideo) || rewardPerVideo <= 0) {
    return res.status(400).json({ code: 400, message: 'جميع الحقول مطلوبة ويجب أن تكون أرقام موجبة' });
  }
  const result = await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)',
    [name, price, dailyVideos, rewardPerVideo]);
  res.json({ code: 0, data: { id: result.lastID }, message: 'تمت إضافة المستوى' });
});

router.put('/levels/:id', async (req, res) => {
  let { name, price, dailyVideos, rewardPerVideo } = req.body;
  name = String(name || '').trim().slice(0, 50);
  price = Number(price);
  dailyVideos = Number(dailyVideos);
  rewardPerVideo = Number(rewardPerVideo);
  if (!name || !Number.isFinite(price) || price <= 0 || !Number.isFinite(dailyVideos) || dailyVideos <= 0 || !Number.isFinite(rewardPerVideo) || rewardPerVideo <= 0) {
    return res.status(400).json({ code: 400, message: 'جميع الحقول مطلوبة ويجب أن تكون أرقام موجبة' });
  }
  const level = await get('SELECT id FROM levels WHERE id = ?', [req.params.id]);
  if (!level) return res.status(404).json({ code: 404, message: 'المستوى غير موجود' });
  await run('UPDATE levels SET name = ?, price = ?, daily_videos = ?, reward_per_video = ? WHERE id = ?',
    [name, price, dailyVideos, rewardPerVideo, req.params.id]);
  res.json({ code: 0, message: 'تم تحديث المستوى' });
});

router.delete('/levels/:id', async (req, res) => {
  const subscribers = await get('SELECT COUNT(*) as count FROM users WHERE level_id = ?', [req.params.id]);
  if (subscribers.count > 0) {
    return res.status(400).json({ code: 400, message: `لا يمكن حذف المستوى لوجود ${subscribers.count} مشتركين به` });
  }
  await run('DELETE FROM levels WHERE id = ?', [req.params.id]);
  res.json({ code: 0, message: 'تم حذف المستوى' });
});

router.get('/transactions', async (req, res) => {
  const rows = await all(
    `SELECT t.*, u.username FROM transactions t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC LIMIT 100`
  );
  res.json({ code: 0, data: rows });
});

router.put('/password', async (req, res) => {
  try {
    let { currentPassword, newPassword } = req.body;
    currentPassword = String(currentPassword || '');
    newPassword = String(newPassword || '');
    const admin = await get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!admin) return res.status(404).json({ code: 404, message: 'المستخدم غير موجود' });
    if (!await bcrypt.compare(currentPassword, admin.password)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الحالية غير صحيحة' });
    }
    if (!newPassword || String(newPassword).length < 8) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل' });
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
      return res.status(400).json({ code: 400, message: 'كلمة المرور يجب أن تحتوي على أحرف وأرقام' });
    }
    const hash = await bcrypt.hash(newPassword, 10);
    await run('UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?', [hash, admin.id]);

    const updatedAdmin = await get('SELECT * FROM users WHERE id = ?', [admin.id]);
    const payload = { id: updatedAdmin.id, username: updatedAdmin.username, role: updatedAdmin.role, balance: updatedAdmin.balance, level_id: updatedAdmin.level_id, token_version: updatedAdmin.token_version };
    const newToken = require('../middleware/auth').sign(payload);
    res.cookie('token', newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    res.json({ code: 0, data: { user: payload }, message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في تغيير كلمة المرور' });
  }
});

router.get('/export/:type', async (req, res) => {
  try {
    const { type } = req.params;
    let rows;
    let filename;
    let headers;

    if (type === 'users') {
      rows = await all(
        `SELECT u.id, u.username, u.balance, u.level_id, l.name as level_name, u.referral_code, u.created_at
         FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.role = 'user' ORDER BY u.id`
      );
      headers = ['ID', 'Username', 'Balance', 'Level', 'Referral Code', 'Registered'];
      filename = 'users.csv';
    } else if (type === 'deposits') {
      rows = await all(
        `SELECT d.id, u.username, d.amount, d.txn_id, d.status, d.created_at, d.processed_at
         FROM deposits d JOIN users u ON d.user_id = u.id ORDER BY d.created_at DESC`
      );
      headers = ['ID', 'Username', 'Amount', 'TxID', 'Status', 'Created', 'Processed'];
      filename = 'deposits.csv';
    } else if (type === 'withdrawals') {
      rows = await all(
        `SELECT w.id, u.username, w.amount, w.wallet_address, w.status, w.created_at, w.processed_at
         FROM withdrawals w JOIN users u ON w.user_id = u.id ORDER BY w.created_at DESC`
      );
      headers = ['ID', 'Username', 'Amount', 'Wallet', 'Status', 'Created', 'Processed'];
      filename = 'withdrawals.csv';
    } else if (type === 'transactions') {
      rows = await all(
        `SELECT t.id, u.username, t.type, t.amount, t.balance_after, t.description, t.created_at
         FROM transactions t JOIN users u ON t.user_id = u.id ORDER BY t.created_at DESC LIMIT 1000`
      );
      headers = ['ID', 'Username', 'Type', 'Amount', 'Balance After', 'Description', 'Date'];
      filename = 'transactions.csv';
    } else if (type === 'ratings') {
      rows = await all(
        `SELECT r.id, u.username, h.name as hotel_name, r.stars, r.reward, r.created_at
         FROM ratings r JOIN users u ON r.user_id = u.id JOIN hotels h ON r.hotel_id = h.id ORDER BY r.created_at DESC LIMIT 1000`
      );
      headers = ['ID', 'Username', 'Hotel', 'Stars', 'Reward', 'Date'];
      filename = 'ratings.csv';
    } else {
      return res.status(400).json({ code: 400, message: 'نوع غير صحيح' });
    }

    const csvEscape = (v) => {
      const s = String(v ?? '');
      const safe = /^[=+\-@\t\r\n]/.test(s) ? "'" + s : s;
      if (safe.includes(',') || safe.includes('"') || safe.includes('\n')) {
        return '"' + safe.replace(/"/g, '""') + '"';
      }
      return safe;
    };

    const csvRows = [headers.join(',')];
    for (const row of rows) {
      const vals = Object.values(row).map(csvEscape);
      csvRows.push(vals.join(','));
    }

    const csvContent = '\uFEFF' + csvRows.join('\r\n');
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csvContent);
  } catch (err) {
    console.error('CSV export error:', err);
    res.status(500).json({ code: 500, message: 'حدث خطأ في تصدير البيانات' });
  }
});

module.exports = router;
