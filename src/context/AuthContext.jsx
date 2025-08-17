// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    // Coba ambil data user dari localStorage saat pertama kali load
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {
            return null;
        }
    });
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                // Jika login gagal, lempar error dengan pesan dari server
                throw new Error(data.error || 'Gagal untuk login.');
            }
            
            // Jika berhasil, simpan data user ke state dan localStorage
            setUser(data);
            localStorage.setItem('user', JSON.stringify(data));
            
            navigate('/admin/dashboard');

        } catch (error) {
            console.error('Login failed:', error);
            // Lempar kembali error agar bisa ditangkap di halaman login
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user'); // Hapus data dari localStorage saat logout
        navigate('/login');
    };

    const value = { user, login, logout, isAuthenticated: !!user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};