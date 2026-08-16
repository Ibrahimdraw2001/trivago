const router = require('express').Router();
const { all } = require('../db');
const { authUser } = require('../middleware/auth');

router.get('/', authUser, async (req, res) => {
  const rows = await all('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
  res.json({ code: 0, data: rows });
});

module.exports = router;
