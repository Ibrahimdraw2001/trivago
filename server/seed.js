require('dotenv').config();
const { init, run, get } = require('./db');
const { HOTELS } = require('./hotels-data');

async function seed() {
  await init();
  let added = 0;
  for (const h of HOTELS) {
    const exists = await get('SELECT id FROM hotels WHERE name = ?', [h.name]);
    if (!exists) {
      await run('INSERT INTO hotels (name, city, country, image, description) VALUES (?, ?, ?, ?, ?)', [h.name, h.city, h.country, '', h.description]);
      added++;
    }
  }
  console.log(`تمت إضافة ${added} فندق (من أصل ${HOTELS.length}).`);
}

seed().catch((err) => {
  console.error('Seed error:', err.message);
  process.exit(1);
});
