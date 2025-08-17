const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan folder untuk upload ada
const uploadDir = 'public/uploads/';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi Multer untuk penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Simpan file di folder backend/public/uploads
    },
    filename: function (req, file, cb) {
        // Buat nama file unik untuk menghindari tumpukan nama
        cb(null, 'berita-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// GET all news
router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { author: true, category: true },
            orderBy: { publishedAt: 'desc' }
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
            include: { author: true, category: true },
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

// POST: Create new news with image upload
router.post('/', upload.single('imageFile'), async (req, res) => {
    const { title, status, category: categoryName, content, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    if (req.file) {
        finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    try {
        const author = await prisma.user.findFirst();
        if (!author) {
            return res.status(400).json({ error: "Tidak ada pengguna di sistem." });
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
                imageUrl: finalImageUrl,
                status: status.toUpperCase(),
                authorId: author.id,
                categoryId: category.id,
            },
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error saat membuat berita:", error);
        res.status(500).json({ error: "Gagal membuat berita baru: " + error.message });
    }
});

// PUT: Update news with image upload
router.put('/:id', upload.single('imageFile'), async (req, res) => {
    const { id } = req.params;
    const { title, status, category: categoryName, content, imageUrl } = req.body;
    let finalImageUrl;

    if (req.file) {
        finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else {
        finalImageUrl = imageUrl;
    }
    
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
                imageUrl: finalImageUrl,
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