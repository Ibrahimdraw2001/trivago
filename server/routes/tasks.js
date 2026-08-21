const router = require('express').Router();
const { run, get, all, tx } = require('../db');
const { authUser } = require('../middleware/auth');
const { logActivity } = require('../helpers/activity');
const { getCached, setCache } = require('../helpers/cache');

const HOTELS_CACHE_TTL = 60 * 1000;

function todayStr() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

router.get('/cities', authUser, async (req, res) => {
  const cacheKey = 'hotel_cities';
  let cities = getCached(cacheKey, 5 * 60 * 1000);
  if (!cities) {
    cities = await all("SELECT DISTINCT city, country FROM hotels WHERE active = 1 AND city != '' ORDER BY country, city");
    setCache(cacheKey, cities);
  }
  res.json({ code: 0, data: cities });
});

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
         FROM hotels h WHERE h.active = 1 AND h.id NOT IN (${placeholders}) ORDER BY RANDOM() LIMIT ?`
      : `SELECT h.*, (SELECT ROUND(AVG(r.stars),1) FROM ratings r WHERE r.hotel_id = h.id) as avg_rating,
         (SELECT COUNT(*) FROM ratings r WHERE r.hotel_id = h.id) as rating_count
         FROM hotels h WHERE h.active = 1 ORDER BY RANDOM() LIMIT ?`;
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
    if (!hotelId || isNaN(value) || value < 1 || value > 10) {
      return res.status(400).json({ code: 400, message: 'التقييم يجب أن يكون من 1 إلى 10 نجوم' });
    }

    const result = await tx(async () => {
      const user = await get(
        `SELECT u.*, l.name as level_name, l.daily_videos, l.reward_per_video
         FROM users u LEFT JOIN levels l ON u.level_id = l.id WHERE u.id = ?`,
        [req.user.id]
      );
      if (!user.level_id) {
        throw Object.assign(new Error('يجب شراء مستوى أولاً'), { status: 400 });
      }

      const hotel = await get('SELECT * FROM hotels WHERE id = ? AND active = 1', [hotelId]);
      if (!hotel) {
        throw Object.assign(new Error('الفندق غير موجود'), { status: 404 });
      }

      const today = todayStr();
      const levelPurchasedToday = user.level_date === today;

      try {
        await run(
          'INSERT INTO ratings (user_id, hotel_id, stars, reward) VALUES (?, ?, ?, 0)',
          [req.user.id, hotelId, value]
        );
      } catch (e) {
        if (e.message && e.message.includes('UNIQUE')) {
          throw Object.assign(new Error('لقد قيّمت هذا الفندق اليوم بالفعل'), { status: 400 });
        }
        throw e;
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
      if (countToday.count > user.daily_videos) {
        throw Object.assign(new Error('وصلت إلى الحد الأقصى لتقييمات اليوم'), { status: 400 });
      }

      const reward = user.reward_per_video;
      const updateResult = await run(
        'UPDATE users SET balance = balance + ? WHERE id = ?',
        [reward, user.id]
      );
      if (updateResult.changes === 0) {
        throw Object.assign(new Error('حدث خطأ في تحديث الرصيد'), { status: 500 });
      }

      const updatedUser = await get('SELECT balance FROM users WHERE id = ?', [user.id]);
      await run('UPDATE ratings SET reward = ? WHERE user_id = ? AND hotel_id = ? AND date(created_at) = ?',
        [reward, req.user.id, hotelId, today]);
      await run('INSERT INTO transactions (user_id, type, amount, balance_after, description) VALUES (?, ?, ?, ?, ?)',
        [req.user.id, 'reward', reward, updatedUser.balance, `مكافأة تقييم: ${hotel.name}`]);

      return { reward, balance: updatedUser.balance, hotelName: hotel.name };
    });

    logActivity(req.user.id, 'rate_hotel', `تقييم فندق ${result.hotelName}: ${value} نجوم، مكافأة ${result.reward}$`);

    res.json({ code: 0, data: result, message: 'تم حفظ تقييمك وحصولك على المكافأة' });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ code: status, message: err.message || 'حدث خطأ في إرسال التقييم' });
  }
});

module.exports = router;
