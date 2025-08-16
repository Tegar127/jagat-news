// File: backend/routes/berita.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// ... (GET, PUT, DELETE routes tetap sama)

// POST: Membuat berita baru (MODIFIKASI)
router.post('/', async (req, res) => {
    // Ambil title, status, authorName, dan categoryName dari body request
    const { title, status, author: authorName, category: categoryName } = req.body;

    try {
        // 1. Cari atau buat penulis (author)
        let author = await prisma.user.findFirst({ where: { name: authorName } });
        if (!author) {
            // Jika tidak ada, untuk sementara kita akan gunakan user pertama yang ada.
            // Di aplikasi nyata, Anda mungkin ingin membuat user baru atau memberikan error.
            author = await prisma.user.findFirst();
            if(!author) throw new Error("Tidak ada user di database.");
        }

        // 2. Cari atau buat kategori
        let category = await prisma.category.findUnique({ where: { name: categoryName } });
        if (!category) {
            category = await prisma.category.create({ data: { name: categoryName } });
        }

        // 3. Buat post baru dengan ID yang benar
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
        res.status(500).json({ error: "Gagal membuat berita baru: " + error.message });
    }
});

module.exports = router;