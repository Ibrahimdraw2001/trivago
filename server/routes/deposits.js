const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');

router.post('/', authUser, async (req, res) => {
  try {
    const { amount, shamTxnId } = req.body;
    const value = Number(amount);
    if (!shamTxnId || !value || value <= 0) {
      return res.status(400).json({ code: 400, message: 'المبلغ ورقم العملية مطلوبان' });
    }
    const exists = await get('SELECT id FROM deposits WHERE sham_txn_id = ?', [shamTxnId]);
    if (exists) {
      return res.status(400).json({ code: 400, message: 'رقم العملية مستخدم بالفعل' });
    }
    const result = await run('INSERT INTO deposits (user_id, amount, sham_txn_id) VALUES (?, ?, ?)', [req.user.id, value, shamTxnId]);
    res.json({ code: 0, data: { id: result.lastID, status: 'pending' }, message: 'تم إرسال طلب الإيداع، بانتظار موافقة الأدمن' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في الإيداع' });
  }
});

router.get('/', authUser, async (req, res) => {
  const rows = await all('SELECT * FROM deposits WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json({ code: 0, data: rows });
});

module.exports = router;
