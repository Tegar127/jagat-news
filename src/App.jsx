import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';

// Import Halaman Publik
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeritaPage from './pages/BeritaPage';
import BeritaDetailPage from './pages/BeritaDetailPage';
import AboutPage from './pages/AboutPage';
import LoginModal from './components/LoginModal'; // <-- Impor komponen modal baru
import ProfilePage from './pages/ProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ChatAdminPage from './components/Admin/ChatAdminPage';

// Import Layout dan Halaman Admin
import AdminLayout from './layouts/AdminLayout';
import DashboardPage from './components/Admin/DashboardPage';
import BeritaAdminPage from './components/Admin/BeritaAdminPage';
import KategoriAdminPage from './components/Admin/KategoriAdminPage';
import UserAdminPage from './components/Admin/UserAdminPage';
import PromoAdminPage from './components/Admin/PromoAdminPage';

// Impor dari Context dan Protected Route
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Komponen placeholder untuk halaman yang belum dibuat
const KontakPage = () => (
    <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold">Halaman Kontak</h1>
        <p className="mt-4">Informasi kontak akan ditampilkan di sini.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">Kembali ke Beranda</Link>
    </div>
);

// Layout untuk halaman publik (yang memiliki Navbar dan Footer)
const PublicLayout = ({ theme, toggleTheme }) => ( // Terima props tema
    <div className="font-sans antialiased flex flex-col min-h-screen">
        <Navbar theme={theme} toggleTheme={toggleTheme} /> {/* Teruskan props ke Navbar */}
        <main className="flex-grow">
            <Outlet />
        </main>
        <Footer />
        <LoginModal />
    </div>
);

const AppContent = ({ theme, toggleTheme }) => { // Terima props tema
    return (
        <Routes>
            <Route element={<PublicLayout theme={theme} toggleTheme={toggleTheme} />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/berita" element={<BeritaPage />} />
                <Route path="/berita/:id" element={<BeritaDetailPage />} />
                <Route path="/search" element={<SearchResultsPage />} /> {/* Tambahkan rute ini */}
                <Route path="/kontak" element={<KontakPage />} />
                <Route path="/tentang" element={<AboutPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="users" element={<UserAdminPage />} />
                <Route path="chat" element={<ChatAdminPage />} /> {/* Tambahkan rute ini */}
        </Route>
            

            {/* HAPUS Rute yang tidak menggunakan layout (Login & Daftar) */}
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/daftar" element={<DaftarPage />} /> */}

            {/* Rute admin yang dilindungi dan menggunakan AdminLayout */}
            <Route
                path="/admin"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="promo" element={<PromoAdminPage />} />
                <Route path="berita" element={<BeritaAdminPage />} />
                <Route path="kategori" element={<KategoriAdminPage />} />
                <Route path="users" element={<UserAdminPage />} />
            </Route>
            
            <Route path="*" element={
                <div className="text-center py-20">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="mt-2 text-lg">Halaman Tidak Ditemukan</p>
                    <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">Kembali ke Beranda</Link>
                </div>
            } />
        </Routes>
    );
};

export default function App() {
    // Logika untuk mengelola tema
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'light';
    });

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <Router>
            <AuthProvider>
                <AppContent theme={theme} toggleTheme={toggleTheme} />
            </AuthProvider>
        </Router>
    );
}