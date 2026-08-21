const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');
const { logActivity } = require('../helpers/activity');
const { todayLocal, nowLocal } = require('../helpers/time');
const { round2 } = require('../db');

router.get('/', async (req, res) => {
  const rows = await all('SELECT * FROM levels ORDER BY price');
  res.json({ code: 0, data: rows });
});

router.post('/purchase', authUser, async (req, res) => {
  try {
    const { levelId } = req.body;
    const ts = nowLocal();
    const today = todayLocal();

    const level = await get('SELECT * FROM levels WHERE id = ?', [levelId]);
    if (!level) {
      return res.status(404).json({ code: 404, message: 'المستوى غير موجود' });
    }
    const user = await get('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (user.level_id === level.id) {
      return res.status(400).json({ code: 400, message: 'أنت مشترك بهذا المستوى بالفعل' });
    }
    if (user.level_id) {
      const currentLevel = await get('SELECT * FROM levels WHERE id = ?', [user.level_id]);
      if (currentLevel && currentLevel.price >= level.price) {
        return res.status(400).json({ code: 400, message: 'لا يمكنك شراء مستوى أقل من المستوى الحالي' });
      }
    }

    const updateResult = await run(
      'UPDATE users SET balance = balance - ?, level_id = ?, level_date = ?, level_purchased_at = ? WHERE id = ? AND balance >= ?',
      [level.price, level.id, today, ts, user.id, level.price]
    );
    if (updateResult.changes === 0) {
      return res.status(400).json({ code: 400, message: 'الرصيد غير كافٍ لشراء هذا المستوى' });
    }

    const userAfterDeduct = await get('SELECT balance FROM users WHERE id = ?', [user.id]);
    const newBalance = round2(userAfterDeduct.balance);
    await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [user.id, 'level', -level.price, newBalance, `شراء ${level.name}`, ts]);

    if (user.referred_by) {
      const referral = await get(
        "SELECT id FROM referrals WHERE inviter_id = ? AND invitee_id = ? AND status = 'pending'",
        [user.referred_by, user.id]
      );
      if (referral) {
        const rewards = {
          inviter: level.referral_inviter_reward || 5,
          invitee: level.referral_invitee_reward || 2,
        };

        await run(
          "UPDATE referrals SET status = 'completed', inviter_reward = ?, invitee_reward = ?, completed_at = ? WHERE id = ?",
          [rewards.inviter, rewards.invitee, ts, referral.id]
        );

        await run('UPDATE users SET balance = balance + ? WHERE id = ?', [rewards.inviter, user.referred_by]);
        const inviter = await get('SELECT balance FROM users WHERE id = ?', [user.referred_by]);
        const inviterBalance = round2(inviter.balance);
        await run('UPDATE users SET balance = ? WHERE id = ?', [inviterBalance, user.referred_by]);
        await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [user.referred_by, 'referral_reward', rewards.inviter, inviterBalance, `مكافأة دعوة: ${user.username}`, ts]);

        await run('UPDATE users SET balance = balance + ? WHERE id = ?', [rewards.invitee, user.id]);
        const invitee = await get('SELECT balance FROM users WHERE id = ?', [user.id]);
        const inviteeBalance = round2(invitee.balance);
        await run('UPDATE users SET balance = ? WHERE id = ?', [inviteeBalance, user.id]);
        await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
          [user.id, 'referral_bonus', rewards.invitee, inviteeBalance, 'مكافأة ترحيبية من الدعوة', ts]);

        logActivity(req.user.id, 'purchase_level', `شراء ${level.name} بسعر $${level.price}`);
        return res.json({ code: 0, data: { balance: inviteeBalance, level_id: level.id }, message: `تم تفعيل ${level.name}` });
      }
    }

    logActivity(req.user.id, 'purchase_level', `شراء ${level.name} بسعر $${level.price}`);
    res.json({ code: 0, data: { balance: newBalance, level_id: level.id }, message: `تم تفعيل ${level.name}` });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ code: status, message: err.message || 'حدث خطأ في شراء المستوى' });
  }
});

module.exports = router;
