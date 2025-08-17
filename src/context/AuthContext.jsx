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
        if (userData.role === 'ADMIN' || userData.role === 'ADMINISTRATOR') {
            navigate('/admin/dashboard');
        } else {
            navigate('/');
        }
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
        navigate('/login');
    };

    const value = { 
        user, 
        login, 
        logout, 
        loginWithGoogle, 
        isAuthenticated: !!user,
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