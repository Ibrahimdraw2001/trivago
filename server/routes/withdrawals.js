const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');

const MIN_WITHDRAW = 500;

router.post('/', authUser, async (req, res) => {
  try {
    const { amount, shamCashNumber } = req.body;
    const value = Number(amount);
    if (!shamCashNumber || !value || value <= 0) {
      return res.status(400).json({ code: 400, message: 'المبلغ ورقم المحفظة مطلوبان' });
    }
    if (value < MIN_WITHDRAW) {
      return res.status(400).json({ code: 400, message: `الحد الأدنى للسحب هو ${MIN_WITHDRAW}` });
    }
    const user = await get('SELECT balance FROM users WHERE id = ?', [req.user.id]);
    if (!user || user.balance < value) {
      return res.status(400).json({ code: 400, message: 'الرصيد غير كافٍ' });
    }
    const newBalance = user.balance - value;
    await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, req.user.id]);
    const result = await run(
      'INSERT INTO withdrawals (user_id, amount, sham_cash_number) VALUES (?, ?, ?)',
      [req.user.id, value, shamCashNumber]
    );
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'withdraw', -value, newBalance, 'طلب سحب بانتظار الموافقة']);
    res.json({ code: 0, data: { id: result.lastID, status: 'pending' }, message: 'تم إرسال طلب السحب، بانتظار موافقة الأدمن' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في السحب' });
  }
});

router.get('/', authUser, async (req, res) => {
  const rows = await all('SELECT * FROM withdrawals WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json({ code: 0, data: rows });
});

module.exports = router;
