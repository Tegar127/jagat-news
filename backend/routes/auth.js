// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');

const GOOGLE_CLIENT_ID = '420625961315-0rcj3l5cp2044hthbuasa2h51sjsqibp.apps.googleusercontent.com'; // <-- GANTI DENGAN CLIENT ID ANDA
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// Endpoint untuk registrasi user baru
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Hash password sebelum disimpan
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'USER' // Role default untuk registrasi publik
            }
        });

        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: "Email sudah terdaftar." });
    }
});

// Endpoint untuk login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            return res.status(401).json({ error: 'Email atau password salah.' });
        }

        // Bandingkan password yang diinput dengan hash di database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Email atau password salah.' });
        }
        
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: 'Terjadi kesalahan pada server.' });
    }
});

// Endpoint untuk Google Login
router.post('/google-login', async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });
        const { name, email, picture } = ticket.getPayload();

        // Cari user di DB, atau buat baru jika belum ada (upsert)
        const user = await prisma.user.upsert({
            where: { email },
            update: { name }, // Update nama jika sudah ada
            create: {
                name,
                email,
                password: await bcrypt.hash(Math.random().toString(36).substring(2), 10), // Buat password acak
                role: 'USER'
            }
        });
        
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);

    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Login dengan Google gagal, token tidak valid.' });
    }
});


module.exports = router;