const path = require('path');
const bcrypt = require('bcryptjs');
const { HOTELS } = require('./hotels-data');

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
    await run('INSERT INTO settings (key, value) VALUES (?, ?)', ['deposit_wallet', '0991234567']);
  }

  const admin = await get('SELECT id FROM users WHERE role = ?', ['admin']);
  if (!admin) {
    const hash = bcrypt.hashSync(process.env.ADMIN_PASSWORD || 'admin123', 10);
    await run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', ['admin', hash, 'admin']);
  }

  const levelCount = await get('SELECT COUNT(*) as count FROM levels');
  if (levelCount.count === 0) {
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 1', 1000, 2, 5]);
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 2', 2500, 4, 6]);
    await run('INSERT INTO levels (name, price, daily_videos, reward_per_video) VALUES (?, ?, ?, ?)', ['المستوى 3', 5000, 8, 8]);
  }

  const hotelCols = await all('PRAGMA table_info(hotels)');
  if (hotelCols && !hotelCols.some((c) => c.name === 'country')) {
    await run("ALTER TABLE hotels ADD COLUMN country TEXT NOT NULL DEFAULT ''");
  }

  const hotelsVersion = await get('SELECT value FROM settings WHERE key = ?', ['hotels_version']);
  if (!hotelsVersion || hotelsVersion.value !== '2') {
    await run('DELETE FROM hotels');
    for (const h of HOTELS) {
      await run('INSERT INTO hotels (name, city, country, image, description) VALUES (?, ?, ?, ?, ?)',
        [h.name, h.city, h.country, h.image, h.description]);
    }
    await run("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = ?",
      ['hotels_version', '2', '2']);
  }
}

module.exports = { db, run, get, all, init };
