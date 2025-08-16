// File: backend/routes/berita.js (Diperbaiki)
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all news (assuming you have this route)
router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                category: true,
            },
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data berita: " + error.message });
    }
});


// POST: Membuat berita baru (MODIFIKASI)
router.post('/', async (req, res) => {
    // Ambil title, status, authorName, dan categoryName dari body request
    const { title, status, author: authorName, category: categoryName } = req.body;

    try {
        // 1. Ambil penulis (author) pertama sebagai penulis default.
        // Di aplikasi nyata, ini seharusnya diambil dari data sesi pengguna yang sedang login.
        const author = await prisma.user.findFirst();
        if (!author) {
            return res.status(400).json({ error: "Tidak ada pengguna di dalam sistem untuk dijadikan penulis." });
        }

        // 2. Gunakan `upsert` untuk mencari atau membuat kategori.
        // `upsert` akan mencari kategori berdasarkan nama. Jika tidak ditemukan, ia akan membuatnya.
        const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
        });

        // 3. Buat post baru dengan ID penulis dan kategori yang sudah valid
        const newPost = await prisma.post.create({
            data: {
                title,
                status: status.toUpperCase(), // Pastikan status dalam format uppercase
                authorId: author.id,
                categoryId: category.id,
            },
        });
        res.status(201).json(newPost);

    } catch (error) {
        console.error("Error creating new post:", error);
        res.status(500).json({ error: "Gagal membuat berita baru: " + error.message });
    }
});


// PUT: Mengupdate berita (assuming you have this route)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status, category: categoryName } = req.body;

    try {
        const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
        });

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: {
                title,
                status: status.toUpperCase(),
                categoryId: category.id,
            },
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengupdate berita: " + error.message });
    }
});

// DELETE: Menghapus berita (assuming you have this route)
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.post.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus berita: " + error.message });
    }
});


module.exports = router;