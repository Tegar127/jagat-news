// src/api/auth.js

// Alamat base URL dari backend server Anda
const API_URL = 'http://localhost:3001/api';

/**
 * Fungsi untuk melakukan login ke API backend.
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} Data pengguna dan token
 */
export const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        // Jika response dari server tidak OK (misal: 401 Unauthorized), lempar error
        throw new Error(data.message || 'Terjadi kesalahan saat login.');
    }
    
    // Kembalikan data user dan token
    return data; 
};


/**
 * Fungsi untuk mendaftarkan pengguna baru.
 * @param {object} userData - { name, email, password }
 * @returns {Promise<object>} Pesan sukses dari server
 */
export const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Gagal mendaftar.');
    }
    
    return data;
};