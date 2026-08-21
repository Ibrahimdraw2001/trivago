const { run } = require('../db');
const { nowLocal } = require('./time');

async function logActivity(userId, action, details) {
  try {
    await run(
      'INSERT INTO activity_log (user_id, action, details, created_at) VALUES (?, ?, ?, ?)',
      [userId, action, details ? String(details).slice(0, 500) : null, nowLocal()]
    );
  } catch (e) {
    console.warn('Activity log error:', e.message);
  }
}

module.exports = { logActivity };
