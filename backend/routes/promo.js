// backend/routes/promo.js

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');

// Konfigurasi Multer (sama seperti di berita.js)
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/uploads/'),
    filename: (req, file, cb) => cb(null, 'promo-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// GET all active promos
router.get('/', async (req, res) => {
    try {
        const promos = await prisma.promo.findMany({ where: { isActive: true } });
        res.json(promos);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil data promo." });
    }
});

// GET all promos for admin
router.get('/all', async (req, res) => {
    try {
        const promos = await prisma.promo.findMany();
        res.json(promos);
    } catch (error) {
        res.status(500).json({ error: "Gagal mengambil semua data promo." });
    }
});

// POST a new promo
router.post('/', upload.single('imageFile'), async (req, res) => {
    const { title, subtitle, buttonText, buttonLink, imageUrl } = req.body;
    let finalImageUrl = imageUrl;

    if (req.file) {
        finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    try {
        const newPromo = await prisma.promo.create({
            data: { title, subtitle, buttonText, buttonLink, imageUrl: finalImageUrl }
        });
        res.status(201).json(newPromo);
    } catch (error) {
        res.status(500).json({ error: "Gagal membuat promo baru." });
    }
});

// PUT update a promo
router.put('/:id', upload.single('imageFile'), async (req, res) => {
    const { id } = req.params;
    const { title, subtitle, buttonText, buttonLink, imageUrl, isActive } = req.body;
    let finalImageUrl;
    
    if (req.file) {
        finalImageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    } else {
        finalImageUrl = imageUrl;
    }

    try {
        const updatedPromo = await prisma.promo.update({
            where: { id: parseInt(id) },
            data: { 
                title, 
                subtitle, 
                buttonText, 
                buttonLink, 
                imageUrl: finalImageUrl,
                isActive: JSON.parse(isActive) // Convert string 'true'/'false' to boolean
            }
        });
        res.json(updatedPromo);
    } catch (error) {
        res.status(500).json({ error: "Gagal memperbarui promo." });
    }
});

// DELETE a promo
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.promo.delete({ where: { id: parseInt(id) } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Gagal menghapus promo." });
    }
});

module.exports = router;