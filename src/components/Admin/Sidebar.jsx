import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Newspaper, Users, Tag, LogOut, X, Megaphone, MessageSquare } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
    const { user, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    // Array navLinks yang sudah diperbaiki
    const navLinks = [
        { to: "/admin/dashboard", icon: <LayoutDashboard size={20} />, text: "Dashboard", roles: ['ADMIN', 'ADMINISTRATOR'] },
        { to: "/admin/promo", icon: <Megaphone size={20} />, text: "Promo", roles: ['ADMIN', 'ADMINISTRATOR'] },
        { to: "/admin/berita", icon: <Newspaper size={20} />, text: "Berita", roles: ['ADMIN', 'ADMINISTRATOR'] },
        { to: "/admin/kategori", icon: <Tag size={20} />, text: "Kategori", roles: ['ADMIN', 'ADMINISTRATOR'] },
        { to: "/admin/chat", icon: <MessageSquare size={20} />, text: "Chat", roles: ['ADMIN', 'ADMINISTRATOR'] },
        { to: "/admin/users", icon: <Users size={20} />, text: "Pengguna", roles: ['ADMINISTRATOR'] }, // Hanya ada satu 'Pengguna'
    ];

    const NavItem = ({ to, icon, text }) => (
        <NavLink
            to={to}
            className={({ isActive }) => `flex items-center px-4 py-3 transition-colors duration-200 rounded-lg ${isActive ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 hover:bg-gray-200"}`}
            onClick={() => setSidebarOpen(false)}
        >
            {icon}
            <span className="ml-3 font-medium">{text}</span>
        </NavLink>
    );

    return (
        <>
            <aside className={`fixed inset-y-0 left-0 bg-card shadow-xl z-30 w-64 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-between p-4 border-b border-custom">
                    <div className="flex items-center gap-2">
                        <Newspaper className="w-8 h-8 text-blue-700" />
                        <span className="text-xl font-bold text-card-foreground">Admin Jagat</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground">
                        <X size={24} />
                    </button>
                </div>
                <nav className="p-4 flex flex-col justify-between h-[calc(100%-65px)]">
                    <div className="space-y-2">
                        {navLinks.map(link => (
                            // Logika render berdasarkan peran tidak berubah
                            link.roles.includes(user?.role) && <NavItem key={link.to} {...link} />
                        ))}
                    </div>
                    <div>
                        <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 text-muted-foreground hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
                            <LogOut size={20} />
                            <span className="ml-3 font-medium">Keluar</span>
                        </button>
                    </div>
                </nav>
            </aside>
            {isSidebarOpen && <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"></div>}
        </>
    );
};

export default Sidebar;