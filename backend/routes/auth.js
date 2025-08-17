// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Endpoint untuk login
// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email dan password harus diisi.' });
    }

    try {
        // 1. Cari pengguna berdasarkan email
        const user = await prisma.user.findUnique({
            where: { email: email },
        });

        // 2. Jika pengguna tidak ditemukan atau password tidak cocok
        // Di aplikasi nyata, gunakan hashing (misal: bcrypt) untuk membandingkan password
        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Email atau password salah.' });
        }

        // 3. Jika berhasil, kirim data pengguna (tanpa password)
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

module.exports = router;