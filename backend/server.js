// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Import Routes
const beritaRoutes = require('./routes/berita');
const kategoriRoutes = require('./routes/kategori');
const promoRoutes = require('./routes/promo');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth'); // <-- TAMBAHKAN INI

// Gunakan Routes dengan prefix
app.use('/api/berita', beritaRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/promo', promoRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // <-- TAMBAHKAN INI

app.get('/', (req, res) => {
    res.send('Selamat datang di Jagat News API!');
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});