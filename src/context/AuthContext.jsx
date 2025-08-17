// tegar127/jagat-news/jagat-news-484ca85cf68061a08fe7435d5b0a49863b94f172/src/context/AuthContext.jsx

// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
const API_URL = 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem('user');
            return storedUser ? JSON.parse(storedUser) : null;
        } catch { return null; }
    });
    const navigate = useNavigate();

    // State baru untuk modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login'); // 'login' or 'register'

    const openModal = (type = 'login') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const handleLoginSuccess = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        closeModal(); // Tutup modal setelah berhasil login
        // SEMUA PENGGUNA DIARAHKAN KE HALAMAN UTAMA SETELAH LOGIN
        navigate('/');
    };
    
    const updateUser = (newUserData) => {
        setUser(newUserData);
        localStorage.setItem('user', JSON.stringify(newUserData));
    };


    const login = async (email, password) => {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        handleLoginSuccess(data);
    };

    const loginWithGoogle = async (token) => {
        const response = await fetch(`${API_URL}/auth/google-login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        handleLoginSuccess(data);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        navigate('/'); // DIARAHKAN KE HOME SETELAH LOGOUT
    };

    const value = { 
        user, 
        login, 
        logout, 
        loginWithGoogle, 
        isAuthenticated: !!user,
        updateUser,
        // Tambahkan state dan fungsi modal ke context value
        isModalOpen,
        modalType,
        openModal,
        closeModal
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};