const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

router.get('/', authUser, async (req, res) => {
  const user = await get(
    `SELECT u.*, l.name as level_name, l.daily_videos, l.reward_per_video
     FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.id = ?`,
    [req.user.id]
  );

  if (!user.level_id) {
    return res.json({ code: 0, data: { hasLevel: false, hotels: [], ratedCount: 0, dailyLimit: 0 } });
  }

  const today = todayStr();
  const levelPurchasedToday = user.level_date === today;

  const allRatedToday = await all(
    `SELECT hotel_id FROM ratings WHERE user_id = ? AND date(created_at) = ?`,
    [req.user.id, today]
  );
  const ratedIds = allRatedToday.map((r) => r.hotel_id);

  let ratedCount;
  if (levelPurchasedToday && user.level_purchased_at) {
    const row = await get(
      `SELECT COUNT(*) as count FROM ratings WHERE user_id = ? AND date(created_at) = ? AND created_at >= ?`,
      [req.user.id, today, user.level_purchased_at]
    );
    ratedCount = row ? row.count : 0;
  } else {
    ratedCount = ratedIds.length;
  }

  let hotels = [];
  if (ratedCount < user.daily_videos) {
    const placeholders = ratedIds.map(() => '?').join(',');
    const sql = ratedIds.length
      ? `SELECT h.*, (SELECT ROUND(AVG(r.stars),1) FROM ratings r WHERE r.hotel_id = h.id) as avg_rating,
         (SELECT COUNT(*) FROM ratings r WHERE r.hotel_id = h.id) as rating_count
         FROM hotels h WHERE h.active = 1 AND h.id NOT IN (${placeholders}) LIMIT ?`
      : `SELECT h.*, (SELECT ROUND(AVG(r.stars),1) FROM ratings r WHERE r.hotel_id = h.id) as avg_rating,
         (SELECT COUNT(*) FROM ratings r WHERE r.hotel_id = h.id) as rating_count
         FROM hotels h WHERE h.active = 1 LIMIT ?`;
    hotels = await all(sql, [...ratedIds, user.daily_videos - ratedCount]);
  }

  res.json({
    code: 0,
    data: {
      hasLevel: true,
      levelName: user.level_name,
      dailyLimit: user.daily_videos,
      ratedCount,
      rewardPerHotel: user.reward_per_video,
      hotels,
    },
  });
});

router.post('/rate', authUser, async (req, res) => {
  try {
    const { hotelId, stars } = req.body;
    const value = Math.round(Number(stars));
    if (!hotelId || isNaN(value) || value < 0 || value > 10) {
      return res.status(400).json({ code: 400, message: 'التقييم يجب أن يكون من 0 إلى 10 نجوم' });
    }

    const user = await get(
      `SELECT u.*, l.name as level_name, l.daily_videos, l.reward_per_video
       FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.id = ?`,
      [req.user.id]
    );
    if (!user.level_id) {
      return res.status(400).json({ code: 400, message: 'يجب شراء مستوى أولاً' });
    }

    const hotel = await get('SELECT * FROM hotels WHERE id = ? AND active = 1', [hotelId]);
    if (!hotel) {
      return res.status(404).json({ code: 404, message: 'الفندق غير موجود' });
    }

    const today = todayStr();
    const levelPurchasedToday = user.level_date === today;

    const dup = await get(
      'SELECT id FROM ratings WHERE user_id = ? AND hotel_id = ? AND date(created_at) = ?',
      [req.user.id, hotelId, today]
    );
    if (dup) {
      return res.status(400).json({ code: 400, message: 'لقد قيّمت هذا الفندق اليوم بالفعل' });
    }

    let countToday;
    if (levelPurchasedToday && user.level_purchased_at) {
      countToday = await get(
        'SELECT COUNT(*) as count FROM ratings WHERE user_id = ? AND date(created_at) = ? AND created_at >= ?',
        [req.user.id, today, user.level_purchased_at]
      );
    } else {
      countToday = await get(
        'SELECT COUNT(*) as count FROM ratings WHERE user_id = ? AND date(created_at) = ?',
        [req.user.id, today]
      );
    }
    if (countToday.count >= user.daily_videos) {
      return res.status(400).json({ code: 400, message: 'وصلت إلى الحد الأقصى لتقييمات اليوم' });
    }

    const reward = user.reward_per_video;
    const result = await run(
      'UPDATE users SET balance = balance + ? WHERE id = ?',
      [reward, user.id]
    );
    if (result.changes === 0) {
      return res.status(500).json({ code: 500, message: 'حدث خطأ في تحديث الرصيد' });
    }

    const newBalance = user.balance + reward;
    await run('INSERT INTO ratings (user_id, hotel_id, stars, reward) VALUES (?, ?, ?, ?)', [req.user.id, hotelId, value, reward]);
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, 'reward', reward, newBalance, `مكافأة تقييم: ${hotel.name}`]);

    res.json({ code: 0, data: { reward, balance: newBalance }, message: 'تم حفظ تقييمك وحصولك على المكافأة' });
  } catch (err) {
    res.status(500).json({ code: 500, message: 'حدث خطأ في إرسال التقييم' });
  }
});

module.exports = router;
