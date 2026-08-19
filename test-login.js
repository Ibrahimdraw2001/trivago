process.env.JWT_SECRET = 'test123';
process.env.ADMIN_PASSWORD = 'admin123';
process.env.NODE_ENV = 'production';

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));

app.use((err, req, res, next) => {
  console.error('GLOBAL ERROR:', err);
  res.status(500).json({ code: 500, message: 'خطأ داخلي في الخادم' });
});

const { init } = require('./db');
init().then(() => {
  const server = app.listen(3001, async () => {
    console.log('Test server on 3001');
    
    // Test login
    const res = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'admin', password: 'wrong' }),
    });
    const data = await res.json();
    console.log('Login response:', res.status, JSON.stringify(data));
    
    server.close();
    process.exit(0);
  });
}).catch(err => {
  console.error('Init failed:', err);
  process.exit(1);
});
