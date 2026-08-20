const router = require('express').Router();
const { all, get } = require('../db');
const { authUser, authAdmin } = require('../middleware/auth');

router.get('/', authUser, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
  const offset = (page - 1) * limit;

  const countRow = await get('SELECT COUNT(*) as total FROM activity_log WHERE user_id = ?', [req.user.id]);
  const total = countRow.total;
  const rows = await all(
    'SELECT * FROM activity_log WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?',
    [req.user.id, limit, offset]
  );
  res.json({ code: 0, data: { items: rows, total, page, limit, pages: Math.ceil(total / limit) } });
});

router.get('/all', authUser, authAdmin, async (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 50));
  const offset = (page - 1) * limit;

  const countRow = await get('SELECT COUNT(*) as total FROM activity_log');
  const total = countRow.total;
  const rows = await all(
    `SELECT a.*, u.username FROM activity_log a LEFT JOIN users u ON a.user_id = u.id ORDER BY a.created_at DESC LIMIT ? OFFSET ?`,
    [limit, offset]
  );
  res.json({ code: 0, data: { items: rows, total, page, limit, pages: Math.ceil(total / limit) } });
});

module.exports = router;
