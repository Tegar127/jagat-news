// backend/server.js

const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambahkan ini
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Tambahkan baris ini untuk menyajikan file statis dari folder 'public'
// Gambar yang di-upload akan dapat diakses melalui URL seperti http://localhost:5000/uploads/namafile.jpg
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

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