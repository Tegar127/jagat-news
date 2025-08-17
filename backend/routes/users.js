// tegar127/jagat-news/jagat-news-484ca85cf68061a08fe7435d5b0a49863b94f172/backend/routes/users.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Konfigurasi Multer untuk avatar
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/avatars/'),
    filename: (req, file, cb) => cb(null, 'avatar-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });


// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: { id: true, name: true, email: true, role: true, avatar: true } // Jangan kirim password
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data pengguna." });
    }
});

// POST a new user
router.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // <-- Hash password
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // <-- Simpan password yang sudah di-hash
                role
            }
        });
        const { password: _, ...userWithoutPassword } = newUser;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: "Gagal membuat pengguna baru. Email mungkin sudah ada." });
    }
});

// PUT update a user
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, role, password: newPassword } = req.body;

    try {
        const dataToUpdate = { name, email, role };

        // Jika ada password baru yang dikirim, hash password tersebut sebelum disimpan
        if (newPassword) {
            dataToUpdate.password = await bcrypt.hash(newPassword, 10);
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });
        const { password, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(400).json({ error: "Gagal memperbarui pengguna." });
    }
});

// DELETE a user
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Tambahkan validasi agar tidak bisa menghapus diri sendiri jika diperlukan
        await prisma.user.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus pengguna." });
    }
});

// New route for profile update
router.put('/profile/:id', upload.single('avatar'), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    let avatarUrl;

    if (req.file) {
        avatarUrl = `${req.protocol}://${req.get('host')}/uploads/avatars/${req.file.filename}`;
    }

    try {
        const dataToUpdate = { name };
        if (avatarUrl) {
            dataToUpdate.avatar = avatarUrl;
        }

        const updatedUser = await prisma.user.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
        });

        const { password, ...userWithoutPassword } = updatedUser;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui profil." });
    }
});


module.exports = router;