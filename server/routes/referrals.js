const router = require('express').Router();
const { all, get } = require('../db');
const { authUser } = require('../middleware/auth');

const MAX_REFERRALS = 15;

router.get('/', authUser, async (req, res) => {
  const rows = await all(
    `SELECT r.*, u.username as invitee_name, l.name as level_name
     FROM referrals r
     JOIN users u ON r.invitee_id = u.id
     LEFT JOIN levels l ON u.level_id = l.id
     WHERE r.inviter_id = ?
     ORDER BY r.created_at DESC`,
    [req.user.id]
  );
  res.json({ code: 0, data: rows });
});

router.get('/stats', authUser, async (req, res) => {
  const total = await get('SELECT COUNT(*) as count FROM referrals WHERE inviter_id = ?', [req.user.id]);
  const completed = await get("SELECT COUNT(*) as count FROM referrals WHERE inviter_id = ? AND status = 'completed'", [req.user.id]);
  const pending = await get("SELECT COUNT(*) as count FROM referrals WHERE inviter_id = ? AND status = 'pending'", [req.user.id]);
  const user = await get('SELECT referral_code FROM users WHERE id = ?', [req.user.id]);
  res.json({
    code: 0,
    data: {
      referralCode: user.referral_code,
      total: total.count,
      completed: completed.count,
      pending: pending.count,
      remaining: MAX_REFERRALS - total.count,
    },
  });
});

module.exports = router;
