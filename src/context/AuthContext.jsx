// src/context/AuthContext.jsx

import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Simulasikan data user dari database
    const MOCK_USERS = {
        'admin@jagat.news': { name: 'Admin Jagat', role: 'ADMINISTRATOR', password: 'password123' },
        'admin2@jagat.news': { name: 'Admin Kedua', role: 'ADMIN', password: 'password123' },
    };

    const login = async (email, password) => {
        const userData = MOCK_USERS[email];

        if (userData && userData.password === password) {
            // Simpan data user (tanpa password) ke state
            setUser({ name: userData.name, role: userData.role });
            navigate('/admin/dashboard');
        } else {
            throw new Error('Email atau password salah.');
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    const value = { user, login, logout, isAuthenticated: !!user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};