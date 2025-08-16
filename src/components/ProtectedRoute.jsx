// src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
// Path diubah dari "./context/AuthContext" menjadi "../context/AuthContext"
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    // Menggunakan user atau isAuthenticated untuk memeriksa status login
    const { user } = useAuth();

    if (!user) {
        // Jika tidak ada user (belum login), arahkan ke halaman login
        return <Navigate to="/login" />;
    }

    // Jika sudah login, tampilkan komponen yang diminta
    return children;
};

export default ProtectedRoute;