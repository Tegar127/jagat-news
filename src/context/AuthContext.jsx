// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('login');

    useEffect(() => {
        const handleAuthStateChange = async (session) => {
            if (session?.user) {
                // Pengguna berhasil login. Sekarang, ambil profil mereka dari tabel "User".
                const { data: profile, error } = await supabase
                    .from('User')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('Gagal mengambil profil pengguna:', error);
                }

                // Gabungkan data autentikasi dengan data profil (termasuk peran/role)
                setUser({
                    ...session.user,
                    ...profile // Ini akan menambahkan properti 'name', 'role', 'avatar', dll.
                });
            } else {
                // Pengguna logout
                setUser(null);
            }
            setLoading(false);
        };

        // Cek sesi yang ada saat aplikasi pertama kali dimuat
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            await handleAuthStateChange(session);
        };

        getInitialSession();

        // Dengarkan perubahan status autentikasi (login, logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            handleAuthStateChange(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const openModal = (type = 'login') => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    // Fungsi login, register, dan logout tidak perlu diubah
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
                data: { name: name }
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
    
    const updateUser = (newUserData) => {
        setUser(prevUser => ({ ...prevUser, ...newUserData }));
    };

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout,
        loginWithGoogle,
        register,
        updateUser,
        isModalOpen,
        modalType,
        openModal,
        closeModal
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);