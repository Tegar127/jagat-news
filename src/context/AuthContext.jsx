// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        // Logika login sederhana
        if (email === 'admin@jagat.news' && password === 'password123') {
            const userData = { name: 'Admin Jagat', role: 'Administrator' };
            setUser(userData);
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