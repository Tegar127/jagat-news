// backend/routes/berita.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET all news
router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true,
                category: true,
            },
            orderBy: {
                publishedAt: 'desc'
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data berita: " + error.message });
    }
});

// GET a single news by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(id) },
            include: {
                author: true,
                category: true,
            },
        });
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Berita tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil detail berita: " + error.message });
    }
});

// POST: Create new news (LOGIKA DIPERBAIKI)
router.post('/', async (req, res) => {
    // Nama field category di body request adalah 'category'
    const { title, status, category: categoryName, content, imageUrl } = req.body;

    try {
        // 1. Ambil penulis pertama sebagai default. Di aplikasi nyata, ini harus dari sesi login.
        const author = await prisma.user.findFirst();
        if (!author) {
            return res.status(400).json({ error: "Tidak ada pengguna di sistem untuk dijadikan penulis." });
        }

        // 2. Cari atau buat kategori berdasarkan nama.
        const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {}, // Jangan update apa-apa jika sudah ada
            create: { name: categoryName }, // Buat baru jika belum ada
        });

        // 3. Buat post baru dengan authorId dan categoryId yang valid
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
                status: status.toUpperCase(),
                authorId: author.id,      // Gunakan ID dari user yang ditemukan
                categoryId: category.id,  // Gunakan ID dari kategori yang ditemukan/dibuat
            },
        });
        res.status(201).json(newPost);

    } catch (error) {
        console.error("Error saat membuat berita baru:", error);
        res.status(500).json({ error: "Gagal membuat berita baru: " + error.message });
    }
});


// PUT: Update news (LOGIKA DIPERBAIKI)
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status, category: categoryName, content, imageUrl } = req.body;

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
                content,
                imageUrl,
                status: status.toUpperCase(),
                categoryId: category.id,
            },
        });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengupdate berita: " + error.message });
    }
});


// DELETE: Delete news
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