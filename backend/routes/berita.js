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
                publishedAt: 'desc' // Tampilkan yang terbaru
            }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data berita: " + error.message });
    }
});

// GET a single news by ID (ENDPOINT BARU)
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

// POST: Create new news
router.post('/', async (req, res) => {
    const { title, status, author: authorName, category: categoryName, content, imageUrl } = req.body;

    try {
        const author = await prisma.user.findFirst();
        if (!author) {
            return res.status(400).json({ error: "Tidak ada pengguna di sistem untuk dijadikan penulis." });
        }

        const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
        });

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
                status: status.toUpperCase(),
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

// PUT: Update news
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