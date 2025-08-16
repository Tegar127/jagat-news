import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../api/auth'; // Mock API yang akan kita buat

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const userData = await apiLogin(email, password);
            setUser(userData);
            navigate('/admin/dashboard');
        } catch (error) {
            // Lempar error agar bisa ditangkap di form login
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook kustom untuk mempermudah penggunaan context
export const useAuth = () => {
    return useContext(AuthContext);
};