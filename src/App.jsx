import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import ThreadPage from './pages/ThreadPage';
import KatalogPage from './pages/KatalogPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import PenelitiProfilePage from './pages/PenelitiProfilePage'; // Import the new profile page
// Correct the import based on the artifact structure
// The artifact exports LoginPage and DaftarPage as named exports.
import { LoginPage, DaftarPage } from './pages/LoginPage';
import AboutPage from './pages/AboutPage';

// This is a simple placeholder component. 
// In your project, you'll have your own version.
const KontakPage = () => (
    <div className="container mx-auto p-8 text-center">
        <h1 className="text-3xl font-bold">Halaman Kontak</h1>
        <p className="mt-4">Informasi kontak akan ditampilkan di sini.</p>
        <Link to="/" className="text-blue-500 hover:underline mt-6 inline-block">Kembali ke Beranda</Link>
    </div>
);

/**
 * NEW: A Layout Component
 * This component will wrap your pages and decide whether to show the Navbar and Footer.
 */
const MainLayout = ({ children }) => {
    const location = useLocation();
    const noNavFooterRoutes = ['/login', '/daftar'];

    // Check if the current URL path is in our list of routes that shouldn't have a navbar/footer.
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
                    {/* Your routes are now children of the MainLayout */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/katalog" element={<KatalogPage />} />
                    <Route path="/acara" element={<EventPage />} />
                    <Route path="/kontak" element={<KontakPage />} />
                    <Route path="/tentang" element={<AboutPage />} />
                    <Route path="/thread" element={<ThreadPage />} />
                    <Route path="/proyek/:id" element={<ProjectDetailPage />} />
                    <Route path="/peneliti/:penelitiId" element={<PenelitiProfilePage />} />
                    
                    {/* These routes will now correctly render without the Navbar and Footer */}
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
