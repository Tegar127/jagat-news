import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import BeritaPage from './pages/BeritaPage';
import BeritaDetailPage from './pages/BeritaDetailPage';
import AboutPage from './pages/AboutPage';
import { LoginPage, DaftarPage } from './pages/LoginPage';

const KontakPage = () => (
    <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold">Halaman Kontak</h1>
        <p className="mt-4">Informasi kontak akan ditampilkan di sini.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">Kembali ke Beranda</Link>
    </div>
);

const MainLayout = ({ children }) => {
    const location = useLocation();
    const noNavFooterRoutes = ['/login', '/daftar'];
    const shouldShowNavAndFooter = !noNavFooterRoutes.includes(location.pathname);

    return (
        <div className="bg-white font-sans antialiased flex flex-col min-h-screen">
            {shouldShowNavAndFooter && <Navbar />}
            <main className="flex-grow">
                {children}
            </main>
            {shouldShowNavAndFooter && <Footer />}
        </div>
    );
};

export default function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/berita" element={<BeritaPage />} />
                    <Route path="/berita/:id" element={<BeritaDetailPage />} />
                    <Route path="/kontak" element={<KontakPage />} />
                    <Route path="/tentang" element={<AboutPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/daftar" element={<DaftarPage />} />
                    <Route path="*" element={
                        <div className="text-center py-20">
                            <h1 className="text-4xl font-bold">404</h1>
                            <p className="mt-2 text-lg">Halaman Tidak Ditemukan</p>
                            <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">Kembali ke Beranda</Link>
                        </div>
                    } />
                </Routes>
            </MainLayout>
        </Router>
    );
}