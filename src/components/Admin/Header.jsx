// src/components/Admin/Header.jsx

import React from 'react';
import { Menu, Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Impor useAuth untuk mengakses data pengguna

const Header = ({ setSidebarOpen }) => {
    // Ambil data pengguna dari AuthContext
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between p-4 bg-white border-b shadow-sm sticky top-0 z-10">
            <div className="flex items-center">
                <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none lg:hidden">
                    <Menu size={24} />
                </button>
                {/* Tampilkan nama pengguna jika ada, jika tidak tampilkan 'Admin' */}
                <h1 className="text-xl font-semibold text-gray-800 ml-4">Selamat Datang, {user ? user.name : 'Admin'}!</h1>
            </div>

            <div className="flex items-center space-x-4">
                <div className="flex items-center">
                    <span className="text-right mr-3 hidden sm:block">
                        {/* Tampilkan nama dan peran pengguna jika ada */}
                        <p className="font-semibold text-sm text-gray-800">{user ? user.name : 'Tegar'}</p>
                        <p className="text-xs text-gray-500">{user ? user.role : 'Administrator'}</p>
                    </span>
                    <UserCircle size={36} className="text-gray-600" />
                </div>
            </div>
        </header>
    );
};

export default Header;