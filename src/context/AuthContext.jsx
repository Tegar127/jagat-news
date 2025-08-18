// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Impor klien Supabase yang baru dibuat

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // State untuk modal (tidak berubah)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');

    useEffect(() => {
        // 1. Cek sesi pengguna saat aplikasi pertama kali dimuat
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setUser(session?.user ?? null);
            setLoading(false);
        };

        getSession();

        // 2. Dengarkan perubahan status autentikasi (login, logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        // 3. Hentikan listener saat komponen tidak lagi digunakan
        return () => subscription.unsubscribe();
    }, []);

    const openModal = (type = 'login') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // --- FUNGSI AUTENTIKASI BARU DENGAN SUPABASE ---

    const login = async (email, password) => {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw new Error(error.message);
        closeModal();
    };

    const loginWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) throw new Error(error.message);
    };

    const register = async (name, email, password) => {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    // Menyimpan metadata tambahan saat registrasi
                    name: name,
                }
            }
        });
        if (error) throw new Error(error.message);
        alert('Registrasi berhasil! Silakan cek email Anda untuk verifikasi.');
        closeModal();
    };

    const logout = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };
    
    // Fungsi ini tidak lagi terlalu relevan karena state user dikelola otomatis
    const updateUser = (newUserData) => {
        // Logika pembaruan manual bisa ditambahkan di sini jika perlu
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        loginWithGoogle,
        register, // Tambahkan fungsi register ke context
        updateUser,
        isModalOpen,
        modalType,
        openModal,
        closeModal
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);