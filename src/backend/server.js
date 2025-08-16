// backend/server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'your-very-secret-key-that-is-long-and-secure'; // Ganti dengan secret key yang kuat

// Path ke file database
const dbPath = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Helper function untuk membaca database
const readDB = () => {
    const data = fs.readFileSync(dbPath);
    return JSON.parse(data);
};

// Helper function untuk menulis ke database
const writeDB = (data) => {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// --- ROUTES ---
app.get('/', (req, res) => {
    res.json({ 
        message: 'Selamat datang di API Jagat News!',
        status: 'Server berjalan dengan baik.',
        endpoints: {
            login: 'POST /api/login',
            register: 'POST /api/register'
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});

// Endpoint untuk Registrasi
app.post('/api/register', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
    }

    const db = readDB();
    const userExists = db.users.find(u => u.email === email);

    if (userExists) {
        return res.status(409).json({ message: 'Email sudah terdaftar' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        role: 'User' // Default role
    };

    db.users.push(newUser);
    writeDB(db);

    res.status(201).json({ message: 'Registrasi berhasil!' });
});

// Endpoint untuk Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi' });
    }
    
    const db = readDB();
    const user = db.users.find(u => u.email === email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).json({ message: 'Email atau password salah.' });
    }

    // Buat token JWT
    const { password: _, ...userData } = user;
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: '1h' });

    res.json({
        message: 'Login berhasil!',
        token,
        user: userData
    });
});


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});