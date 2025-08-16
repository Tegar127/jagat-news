// File: backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware (Fungsi perantara)
app.use(cors()); // Mengizinkan akses dari domain lain (frontend React Anda)
app.use(express.json()); // Membaca data JSON yang dikirim dari frontend

// Halaman Awal API
app.get('/', (req, res) => {
    res.send('Selamat datang di Jagat News API!');
});

app.listen(PORT, () => {
  console.log(`Server backend berjalan di http://localhost:${PORT}`);
});