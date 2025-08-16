// File: backend/routes/berita.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: Mendapatkan semua berita (termasuk nama penulis & kategori)
router.get('/', async (req, res) => {
    const allNews = await prisma.post.findMany({
        include: {
            author: { select: { name: true } },
            category: { select: { name: true } },
        },
    });
    res.json(allNews);
});

// POST: Membuat berita baru
router.post('/', async (req, res) => {
    const { title, status, author, category } = req.body;
    // Untuk sekarang, kita asumsikan author dan kategori sudah ada
    // Di aplikasi nyata, ini akan lebih kompleks
    const newPost = await prisma.post.create({
        data: { title, status, authorId: 1, categoryId: 1 }, // Hardcode untuk contoh
    });
    res.status(201).json(newPost);
});

// PUT: Mengupdate berita berdasarkan ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status } = req.body;
    const updatedPost = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, status },
    });
    res.json(updatedPost);
});

// DELETE: Menghapus berita berdasarkan ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.post.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
});

module.exports = router;