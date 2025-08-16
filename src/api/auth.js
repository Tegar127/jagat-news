// Simulasi data pengguna dari database eksternal
const mockDatabase = [
    {
        id: 1,
        email: 'admin@jagat.news',
        password: 'password123', // Di dunia nyata, ini akan di-hash
        name: 'Admin Tegar',
        role: 'Administrator'
    },
    {
        id: 2,
        email: 'budi@example.com',
        password: 'user123',
        name: 'User Budi',
        role: 'User'
    }
];

// Fungsi ini menyimulasikan panggilan API ke server autentikasi
export const login = (email, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const user = mockDatabase.find(u => u.email === email);

            if (user && user.password === password) {
                // Jangan kirim password kembali ke client
                const { password, ...userData } = user;
                resolve(userData);
            } else {
                reject(new Error('Email atau password salah.'));
            }
        }, 1000); // Simulasi delay jaringan 1 detik
    });
};