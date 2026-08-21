const router = require('express').Router();
const { get, all } = require('../db');
const { authUser } = require('../middleware/auth');
const { todayLocal, daysAgoLocal } = require('../helpers/time');

router.get('/', authUser, async (req, res) => {
  const user = await get(
    `SELECT u.*, l.name as level_name, l.daily_videos, l.reward_per_video
     FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.id = ?`,
    [req.user.id]
  );

  const totalRatings = await get('SELECT COUNT(*) as count FROM ratings WHERE user_id = ?', [req.user.id]);
  const totalEarnings = await get("SELECT COALESCE(SUM(amount),0) as sum FROM transactions WHERE user_id = ? AND type = 'reward'", [req.user.id]);
  const totalDeposits = await get("SELECT COALESCE(SUM(amount),0) as sum FROM deposits WHERE user_id = ? AND status = 'approved'", [req.user.id]);
  const totalWithdrawals = await get("SELECT COALESCE(SUM(amount),0) as sum FROM withdrawals WHERE user_id = ? AND status = 'approved'", [req.user.id]);
  const referralCount = await get("SELECT COUNT(*) as count FROM referrals WHERE inviter_id = ? AND status = 'completed'", [req.user.id]);
  const referralEarnings = await get("SELECT COALESCE(SUM(inviter_reward),0) as sum FROM referrals WHERE inviter_id = ? AND status = 'completed'", [req.user.id]);
  const today = todayLocal();
  const weekAgo = daysAgoLocal(7);

  const todayRatings = await get(
    "SELECT COUNT(*) as count FROM ratings WHERE user_id = ? AND date(created_at) = ?",
    [req.user.id, today]
  );
  const uniqueHotelsRated = await get('SELECT COUNT(DISTINCT hotel_id) as count FROM ratings WHERE user_id = ?', [req.user.id]);

  const recentRatings = await all(
    `SELECT r.*, h.name as hotel_name FROM ratings r
     JOIN hotels h ON r.hotel_id = h.id
     WHERE r.user_id = ? ORDER BY r.created_at DESC LIMIT 5`,
    [req.user.id]
  );

  const weeklyEarnings = await all(
    `SELECT date(created_at) as day, SUM(amount) as total
     FROM transactions WHERE user_id = ? AND type = 'reward' AND created_at >= ?
     GROUP BY date(created_at) ORDER BY day`,
    [req.user.id, weekAgo]
  );

  res.json({
    code: 0,
    data: {
      username: user.username,
      balance: user.balance,
      levelName: user.level_name,
      dailyLimit: user.daily_videos || 0,
      rewardPerHotel: user.reward_per_video || 0,
      totalRatings: totalRatings.count,
      totalEarnings: totalEarnings.sum,
      totalDeposits: totalDeposits.sum,
      totalWithdrawals: totalWithdrawals.sum,
      referralCount: referralCount.count,
      referralEarnings: referralEarnings.sum,
      todayRatings: todayRatings.count,
      uniqueHotelsRated: uniqueHotelsRated.count,
      recentRatings,
      weeklyEarnings,
    },
  });
});

module.exports = router;
