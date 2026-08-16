const router = require('express').Router();
const { get, run } = require('../db');
const { authUser, authAdmin } = require('../middleware/auth');

router.get('/deposit-wallet', async (req, res) => {
  const row = await get('SELECT value FROM settings WHERE key = ?', ['deposit_wallet']);
  res.json({ code: 0, data: { wallet: row ? row.value : '' } });
});

router.put('/deposit-wallet', authUser, authAdmin, async (req, res) => {
  const { wallet } = req.body;
  if (!wallet) {
    return res.status(400).json({ code: 400, message: 'رقم المحفظة مطلوب' });
  }
  await run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?',
    ['deposit_wallet', wallet, wallet]);
  res.json({ code: 0, message: 'تم تحديث حساب الإيداع' });
});

module.exports = router;
