const router = require('express').Router();
const { run, get, all } = require('../db');
const { authUser } = require('../middleware/auth');
const { logActivity } = require('../helpers/activity');
const { getCached, setCache } = require('../helpers/cache');
const { todayLocal, nowLocal } = require('../helpers/time');
const { round2 } = require('../db');

const HOTELS_CACHE_TTL = 60 * 1000;

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

  const today = todayLocal();
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

    const ts = nowLocal();
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

    const today = todayLocal();
    const levelPurchasedToday = user.level_date === today;

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

    try {
      await run(
        'INSERT INTO ratings (user_id, hotel_id, stars, reward, created_at) VALUES (?, ?, ?, 0, ?)',
        [req.user.id, hotelId, value, ts]
      );
    } catch (e) {
      if (e.message && e.message.includes('UNIQUE')) {
        return res.status(400).json({ code: 400, message: 'لقد قيّمت هذا الفندق اليوم بالفعل' });
      }
      throw e;
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
    const newBalance = round2(updatedUser.balance);
    await run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, user.id]);
    await run('UPDATE ratings SET reward = ? WHERE user_id = ? AND hotel_id = ? AND date(created_at) = ?',
      [reward, req.user.id, hotelId, today]);
    await run('INSERT INTO transactions (user_id, type, amount, balance_after, description, created_at) VALUES (?, ?, ?, ?, ?, ?)',
      [req.user.id, 'reward', reward, newBalance, `مكافأة تقييم: ${hotel.name}`, ts]);

    logActivity(req.user.id, 'rate_hotel', `تقييم فندق ${hotel.name}: ${value} نجوم، مكافأة ${reward}$`);

    res.json({ code: 0, data: { reward, balance: newBalance, hotelName: hotel.name }, message: 'تم حفظ تقييمك وحصولك على المكافأة' });
  } catch (err) {
    const status = err.status || 500;
    res.status(status).json({ code: status, message: err.message || 'حدث خطأ في إرسال التقييم' });
  }
});

module.exports = router;
