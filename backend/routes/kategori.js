// File: backend/routes/kategori.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// GET: Mendapatkan semua kategori
router.get('/', async (req, res) => {
    const categories = await prisma.category.findMany();
    res.json(categories);
});

// POST: Membuat kategori baru
router.post('/', async (req, res) => {
    const newCategory = await prisma.category.create({ data: req.body });
    res.status(201).json(newCategory);
});

// PUT: Mengupdate kategori berdasarkan ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedCategory = await prisma.category.update({
        where: { id: parseInt(id) },
        data: req.body,
    });
    res.json(updatedCategory);
});

// DELETE: Menghapus kategori berdasarkan ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.category.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
});

module.exports = router;