// tegar127/jagat-news/jagat-news-fe7d803b6f9c7356db28f446f52ea3d22477216b/backend/routes/berita.js
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

// Izinkan unggahan banyak file, dengan nama field 'imageFiles' dan maksimal 10 file
const upload = multer({ storage: storage });

// GET semua berita, sertakan relasi gambar
router.get('/', async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: { 
                author: true, 
                category: true, 
                images: true // Sertakan gambar
            },
            orderBy: { publishedAt: 'desc' }
        });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data berita: " + error.message });
    }
});

// GET berita terbaru
router.get('/latest', async (req, res) => {
    try {
        const latestPosts = await prisma.post.findMany({
            take: 5,
            orderBy: { publishedAt: 'desc' },
            include: { category: true, images: true }, // Sertakan gambar
        });
        res.json(latestPosts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil berita terbaru." });
    }
});

// GET berita populer
router.get('/popular', async (req, res) => {
    try {
        const popularPosts = await prisma.post.findMany({
            take: 5,
            orderBy: { viewCount: 'desc' },
            include: { category: true, images: true }, // Sertakan gambar
        });
        res.json(popularPosts);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil berita terpopuler." });
    }
});

// GET satu berita berdasarkan ID (dan tingkatkan jumlah tampilan)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Gunakan transaksi untuk memastikan keduanya berjalan
        const [post, _] = await prisma.$transaction([
            prisma.post.findUnique({
                where: { id: parseInt(id) },
                include: { author: true, category: true, images: true }, // Sertakan gambar
            }),
            prisma.post.update({
                where: { id: parseInt(id) },
                data: { viewCount: { increment: 1 } },
            })
        ]);
        
        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: "Berita tidak ditemukan" });
        }
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil detail berita: " + error.message });
    }
});

// POST: Buat berita baru dengan unggahan banyak gambar
router.post('/', upload.array('imageFiles', 10), async (req, res) => {
    const { title, status, category: categoryName, content, canBeCopied } = req.body;

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
                canBeCopied: canBeCopied === 'true',
                status: status.toUpperCase(),
                authorId: author.id,
                categoryId: category.id,
                // Buat entri gambar untuk setiap file yang diunggah
                images: {
                    create: req.files.map(file => ({
                        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
                    }))
                }
            },
            include: { images: true }
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error saat membuat berita:", error);
        res.status(500).json({ error: "Gagal membuat berita baru: " + error.message });
    }
});

// PUT: Perbarui berita dengan unggahan gambar baru
router.put('/:id', upload.array('imageFiles', 10), async (req, res) => {
    const { id } = req.params;
    const { title, status, category: categoryName, content, canBeCopied, imagesToDelete } = req.body;
    
    try {
        // Hapus gambar yang diminta untuk dihapus
        if (imagesToDelete) {
            const idsToDelete = JSON.parse(imagesToDelete).map(id => parseInt(id));
            if (idsToDelete.length > 0) {
                await prisma.image.deleteMany({
                    where: { id: { in: idsToDelete } }
                });
            }
        }

        const category = await prisma.category.upsert({
            where: { name: categoryName },
            update: {},
            create: { name: categoryName },
        });
        
        const dataToUpdate = {
            title,
            content,
            canBeCopied: canBeCopied === 'true',
            status: status.toUpperCase(),
            categoryId: category.id,
        };
        
        // Jika ada file baru yang diunggah, tambahkan ke post yang ada
        if (req.files && req.files.length > 0) {
            dataToUpdate.images = {
                create: req.files.map(file => ({
                    url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
                }))
            };
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(id) },
            data: dataToUpdate,
            include: { images: true }
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengupdate berita: " + error.message });
    }
});

// DELETE: Hapus berita
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Hapus semua gambar yang terkait terlebih dahulu untuk menghindari error constraint
        await prisma.image.deleteMany({
            where: { postId: parseInt(id) }
        });
        
        // Kemudian hapus post itu sendiri
        await prisma.post.delete({ 
            where: { id: parseInt(id) } 
        });

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus berita: " + error.message });
    }
});

module.exports = router;