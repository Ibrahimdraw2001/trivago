const { run } = require('../db');

async function logActivity(userId, action, details) {
  try {
    await run(
      'INSERT INTO activity_log (user_id, action, details) VALUES (?, ?, ?)',
      [userId, action, details ? String(details).slice(0, 500) : null]
    );
  } catch (e) {
    console.warn('Activity log error:', e.message);
  }
}

module.exports = { logActivity };
