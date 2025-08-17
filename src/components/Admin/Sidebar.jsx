// src/components/Admin/Sidebar.jsx

import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, Tag, LogOut, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext'; // Tambahkan impor ini

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const { logout } = useAuth(); // Ambil fungsi logout dari context

    const navLinks = [
        { to: "/admin/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard" },
        { to: "/admin/promo", icon: <Announce size={20} />, text: "Promo" },
        { to: "/admin/berita", icon: <Newspaper size={20} />, text: "Berita" },
        { to: "/admin/kategori", icon: <Tag size={20} />, text: "Kategori" },
        { to: "/admin/users", icon: <Users size={20} />, text: "Pengguna" },
    ];

    const NavItem = ({ to, icon, text }) => (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center px-4 py-3 transition-colors duration-200 rounded-lg ${
                    isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-600 hover:bg-gray-200"
                }`
            }
            onClick={() => setSidebarOpen(false)}
        >
            {icon}
            <span className="ml-3 font-medium">{text}</span>
        </NavLink>
    );

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 bg-white shadow-xl z-30 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-2">
                         <Newspaper className="w-8 h-8 text-blue-700" />
                        <span className="text-xl font-bold text-gray-800">Admin Jagat</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 flex flex-col justify-between h-[calc(100%-65px)]">
                    <div className="space-y-2">
                        {navLinks.map(link => <NavItem key={link.to} {...link} />)}
                    </div>
                    <div>
                        {/* Tombol logout yang memanggil fungsi logout dari context */}
                        <button 
                            onClick={logout} 
                            className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                            <LogOut size={20} />
                            <span className="ml-3 font-medium">Keluar</span>
                        </button>
                    </div>
                </nav>
            </aside>
            {/* Overlay untuk mobile saat sidebar terbuka */}
            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"></div>}
        </>
    );
};

export default Sidebar;