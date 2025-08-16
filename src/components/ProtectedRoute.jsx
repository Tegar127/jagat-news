import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        // Jika tidak ada user, redirect ke halaman login
        return <Navigate to="/login" />;
    }

    return children;
};

export default ProtectedRoute;