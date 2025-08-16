// File: backend/server.js (Versi diperbarui)
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import Routes
const beritaRoutes = require('./routes/berita');
const kategoriRoutes = require('./routes/kategori');

// Gunakan Routes dengan prefix
app.use('/api/berita', beritaRoutes);
app.use('/api/kategori', kategoriRoutes);

app.get('/', (req, res) => {
    res.send('Selamat datang di Jagat News API!');
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});