require('dotenv').config();
const { init, run, get } = require('./db');
const { HOTELS } = require('./hotels-data');
const { nowLocal } = require('./helpers/time');

async function seed() {
  await init();
  let added = 0;
  let updated = 0;
  const ts = nowLocal();
  for (const h of HOTELS) {
    const exists = await get('SELECT id, image FROM hotels WHERE name = ?', [h.name]);
    if (!exists) {
      await run('INSERT INTO hotels (name, city, country, image, description, created_at) VALUES (?, ?, ?, ?, ?, ?)', [h.name, h.city, h.country, h.image || '', h.description, ts]);
      added++;
    } else if (!exists.image && h.image) {
      await run('UPDATE hotels SET image = ? WHERE id = ?', [h.image, exists.id]);
      updated++;
    }
  }
  console.log(`تمت إضافة ${added} فندق، وتحديث ${updated} فندق بالصور (من أصل ${HOTELS.length}).`);
}

seed().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
