const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');

const TXID_RE = /^[A-Za-z0-9]{8,128}$/;

router.post('/', authUser, async (req, res) => {
  try {
    let { amount, txnId } = req.body;
    txnId = String(txnId || '').trim().slice(0, 128);
    const value = Number(amount);
    if (!txnId || !value || value <= 0) {
      return res.status(400).json({ code: 400, message: 'المبلغ ورقم العملية (TxID) مطلوبان' });
    }
    if (!TXID_RE.test(txnId)) {
      return res.status(400).json({ code: 400, message: 'رقم العملية يجب أن يكون 8-128 حرف وأرقام' });
    }
    const exists = await get('SELECT id FROM deposits WHERE txn_id = ?', [txnId]);
    if (exists) {
      return res.status(400).json({ code: 400, message: 'رقم العملية مستخدم بالفعل' });
    }
    const result = await run('INSERT INTO deposits (user_id, amount, sham_txn_id, txn_id) VALUES (?, ?, ?, ?)', [req.user.id, value, txnId, txnId]);
    res.json({ code: 0, data: { id: result.lastID, status: 'pending' }, message: 'تم إرسال طلب الإيداع عبر USDT، بانتظار موافقة الأدمن' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في الإيداع' });
  }
});

router.get('/', authUser, async (req, res) => {
  const rows = await all('SELECT * FROM deposits WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json({ code: 0, data: rows });
});

module.exports = router;
