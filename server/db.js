const path = require('path');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { HOTELS } = require('./hotels-data');

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function generateRefCode() {
  let code = '';
  for (let i = 0; i < 6; i++) code += CHARS[crypto.randomInt(CHARS.length)];
  return code;
}

const USE_REMOTE = !!process.env.TURSO_DATABASE_URL;

let run;
let get;
let all;
let db;

if (USE_REMOTE) {
  const { createClient } = require('@libsql/client');
  db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    ...(process.env.TURSO_AUTH_TOKEN ? { authToken: process.env.TURSO_AUTH_TOKEN } : {}),
  });

  run = async (sql, params = []) => {
    const rs = await db.execute({ sql, args: params });
    return { lastID: Number(rs.lastInsertRowid), changes: rs.rowsAffected };
  };

  get = async (sql, params = []) => {
    const rs = await db.execute({ sql, args: params });
    return rs.rows[0];
  };

  all = async (sql, params = []) => {
    const rs = await db.execute({ sql, args: params });
    return rs.rows;
  };
} else {
  const sqlite3 = require('sqlite3').verbose();
  db = new sqlite3.Database(path.join(__dirname, 'wallet.db'));

  run = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.run(sql, params, function (err) {
        if (err) return reject(err);
        resolve({ lastID: this.lastID, changes: this.changes });
      });
    });

  get = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });

  all = (sql, params = []) =>
    new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
}

async function init() {
  await run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    balance REAL NOT NULL DEFAULT 0,
    level_id INTEGER,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  await run(`CREATE TABLE IF NOT EXISTS levels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    daily_videos INTEGER NOT NULL DEFAULT 0,
    reward_per_video REAL NOT NULL DEFAULT 0
  )`);

  await run(`CREATE TABLE IF NOT EXISTS deposits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    sham_txn_id TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    processed_at TEXT,
    admin_id INTEGER
  )`);

  await run(`CREATE TABLE IF NOT EXISTS withdrawals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    amount REAL NOT NULL,
    sham_cash_number TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    processed_at TEXT,
    admin_id INTEGER
  )`);

  const legacyVideos = await get("SELECT name FROM sqlite_master WHERE type='table' AND name='videos'");
  if (legacyVideos) {
    await run('DROP TABLE IF EXISTS ratings');
    await run('DROP TABLE videos');
  }

  await run(`CREATE TABLE IF NOT EXISTS hotels (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    city TEXT NOT NULL DEFAULT '',
    image TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    active INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  await run(`CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    hotel_id INTEGER NOT NULL,
    stars INTEGER NOT NULL,
    reward REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  await run(`CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    amount REAL NOT NULL,
    balance_after REAL NOT NULL,
    description TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )`);

  await run(`CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  )`);

  const depositWallet = await get('SELECT value FROM settings WHERE key = ?', ['deposit_wallet']);
  if (!depositWallet) {
    await run('INSERT INTO settings (key, value) VALUES (?, ?)', ['deposit_wallet', '0x1111111111111111111111111111111111111111']);
  } else if (depositWallet.value === '0991234567') {
    await run("UPDATE settings SET value = ? WHERE key = 'deposit_wallet'", ['0x1111111111111111111111111111111111111111']);
  }

  const admin = await get('SELECT id FROM users WHERE role = ?', ['admin']);
  if (!admin) {
    const adminPass = process.env.ADMIN_PASSWORD;
    if (!adminPass) {
      console.warn('WARNING: ADMIN_PASSWORD is not set. Admin account will not be created.');
    } else {
      const hash = bcrypt.hashSync(adminPass, 10);
      await run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
    }
  }

  const levelCount = await get('SELECT COUNT(*) as count FROM levels');
  if (levelCount.count === 0) {
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 1', 30, 2, 1]);
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 2', 60, 4, 1]);
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 3', 100, 4, 2]);
  }

  const levelsVersion = await get("SELECT value FROM settings WHERE key = 'levels_version'");
  if (!levelsVersion || levelsVersion.value !== '2') {
    await run('UPDATE levels SET price = 30, daily_videos = 2, reward_per_video = 1 WHERE name = ?', ['المستوى 1']);
    await run('UPDATE levels SET price = 60, daily_videos = 4, reward_per_video = 1 WHERE name = ?', ['المستوى 2']);
    await run('UPDATE levels SET price = 100, daily_videos = 4, reward_per_video = 2 WHERE name = ?', ['المستوى 3']);
    await run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?",
      ['levels_version', '2', '2']);
  }

  const userCols = await all('PRAGMA table_info(users)');
  if (!userCols.some((c) => c.name === 'level_date')) {
    await run("ALTER TABLE users ADD COLUMN level_date TEXT");
  }
  if (!userCols.some((c) => c.name === 'level_purchased_at')) {
    await run("ALTER TABLE users ADD COLUMN level_purchased_at TEXT");
  }
  if (!userCols.some((c) => c.name === 'referral_code')) {
    await run("ALTER TABLE users ADD COLUMN referral_code TEXT");
  }
  if (!userCols.some((c) => c.name === 'referred_by')) {
    await run("ALTER TABLE users ADD COLUMN referred_by INTEGER");
  }

  await run(`CREATE TABLE IF NOT EXISTS referrals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    inviter_id INTEGER NOT NULL,
    invitee_id INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    inviter_reward REAL NOT NULL DEFAULT 0,
    invitee_reward REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    completed_at TEXT
  )`);

  const usersNeedingCode = await all('SELECT id FROM users WHERE referral_code IS NULL');
  for (const u of usersNeedingCode) {
    let code;
    let dup;
    do {
      code = generateRefCode();
      dup = await get('SELECT id FROM users WHERE referral_code = ?', [code]);
    } while (dup);
    await run('UPDATE users SET referral_code = ? WHERE id = ?', [code, u.id]);
  }

  const depositCols = await all('PRAGMA table_info(deposits)');
  if (!depositCols.some((c) => c.name === 'txn_id')) {
    await run('ALTER TABLE deposits ADD COLUMN txn_id TEXT');
  }
  await run('UPDATE deposits SET txn_id = sham_txn_id WHERE txn_id IS NULL');

  const withdrawalCols = await all('PRAGMA table_info(withdrawals)');
  if (!withdrawalCols.some((c) => c.name === 'wallet_address')) {
    await run('ALTER TABLE withdrawals ADD COLUMN wallet_address TEXT');
  }
  await run('UPDATE withdrawals SET wallet_address = sham_cash_number WHERE wallet_address IS NULL');

  const hotelCols = await all('PRAGMA table_info(hotels)');
  if (hotelCols && !hotelCols.some((c) => c.name === 'country')) {
    await run("ALTER TABLE hotels ADD COLUMN country TEXT NOT NULL DEFAULT ''");
  }

  const hotelsVersion = await get('SELECT value FROM settings WHERE key = ?', ['hotels_version']);
  if (!hotelsVersion || hotelsVersion.value !== '4') {
    await run('DELETE FROM hotels');
    for (const h of HOTELS) {
      await run('INSERT INTO hotels (name, city, country, image, description) VALUES (?, ?, ?, ?, ?)',
        [h.name, h.city, h.country, h.image || '', h.description]);
    }
    await run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?",
      ['hotels_version', '4', '4']);
  }
}

module.exports = { db, run, get, all, init, generateRefCode };
