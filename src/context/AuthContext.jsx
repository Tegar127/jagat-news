// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const navigate = useNavigate();

    // Efek ini akan berjalan saat komponen pertama kali dirender
    // untuk memeriksa apakah ada token di localStorage
    useEffect(() => {
        if (token) {
            // Di aplikasi production, Anda harus memverifikasi token ini ke backend
            // Untuk sekarang, kita asumsikan token valid dan decode data user
            // Ini adalah simplifikasi, idealnya ada endpoint /api/profile
            try {
                // Ambil data user dari localStorage juga jika ada
                const storedUser = localStorage.getItem('user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error("Gagal mem-parsing user dari localStorage", error);
                logout();
            }
        }
    }, [token]);


    const login = async (email, password) => {
        try {
            const data = await apiLogin(email, password);
            setUser(data.user);
            setToken(data.token);
            // Simpan token dan data user ke localStorage untuk persistensi
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/admin/dashboard');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};