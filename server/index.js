require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');
const { init } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 600,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, message: 'طلبات كثيرة جداً، حاول بعد قليل' },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, message: 'محاولات كثيرة، انتظر 15 دقيقة ثم أعد المحاولة' },
});

app.use('/api', apiLimiter);
app.use('/api/auth', authLimiter);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/deposits', require('./routes/deposits'));
app.use('/api/withdrawals', require('./routes/withdrawals'));
app.use('/api/levels', require('./routes/levels'));
app.use('/api/tasks', require('./routes/tasks'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/admin', require('./routes/admin'));

app.use('/api', (req, res) => res.status(404).json({ code: 404, message: 'غير موجود' }));

const distCandidates = [path.join(__dirname, 'dist'), path.join(__dirname, '..', 'wallet-app', 'dist')];
const distDir = distCandidates.find((d) => fs.existsSync(d));

if (distDir) {
  app.use(express.static(distDir));
  app.use((req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ code: 500, message: 'خطأ داخلي في الخادم' });
});

init()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database init failed:', err);
    process.exit(1);
  });
