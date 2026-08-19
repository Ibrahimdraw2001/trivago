const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function nowStr() {
  return new Date().toISOString().slice(0, 19).replace('T', ' ');
}

const REFERRAL_REWARDS = {
  30: { inviter: 5, invitee: 2 },
  60: { inviter: 10, invitee: 4 },
  100: { inviter: 15, invitee: 5 },
};

router.get('/', async (req, res) => {
  const rows = await all('SELECT * FROM levels ORDER BY price');
  res.json({ code: 0, data: rows });
});

router.post('/purchase', authUser, async (req, res) => {
  try {
    const { levelId } = req.body;
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

    const result = await run(
      'UPDATE users SET balance = balance - ?, level_id = ?, level_date = ?, level_purchased_at = ? WHERE id = ? AND balance >= ?',
      [level.price, level.id, todayStr(), nowStr(), user.id, level.price]
    );
    if (result.changes === 0) {
      return res.status(400).json({ code: 400, message: 'الرصيد غير كافٍ لشراء هذا المستوى' });
    }

    const newBalance = user.balance - level.price;
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
      [user.id, 'level', -level.price, newBalance, `شراء ${level.name}`]);

    if (user.referred_by) {
      const referral = await get(
        "SELECT id FROM referrals WHERE inviter_id = ? AND invitee_id = ? AND status = 'pending'",
        [user.referred_by, user.id]
      );
      if (referral) {
        const rewards = REFERRAL_REWARDS[level.price] || { inviter: 5, invitee: 2 };

        await run(
          "UPDATE referrals SET status = 'completed', inviter_reward = ?, invitee_reward = ?, completed_at = datetime('now') WHERE id = ?",
          [rewards.inviter, rewards.invitee, referral.id]
        );

        await run('UPDATE users SET balance = balance + ? WHERE id = ?', [rewards.inviter, user.referred_by]);
        const inviter = await get('SELECT balance FROM users WHERE id = ?', [user.referred_by]);
        await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
          [user.referred_by, 'referral_reward', rewards.inviter, inviter.balance, `مكافأة دعوة: ${user.username}`]);

        await run('UPDATE users SET balance = balance + ? WHERE id = ?', [rewards.invitee, user.id]);
        const updatedUser = await get('SELECT balance FROM users WHERE id = ?', [user.id]);
        await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
          [user.id, 'referral_bonus', rewards.invitee, updatedUser.balance, 'مكافأة ترحيبية من الدعوة']);
      }
    }

    const finalUser = await get('SELECT balance FROM users WHERE id = ?', [user.id]);
    res.json({ code: 0, data: { balance: finalUser.balance, level_id: level.id }, message: `تم تفعيل ${level.name}` });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في شراء المستوى' });
  }
});

module.exports = router;
