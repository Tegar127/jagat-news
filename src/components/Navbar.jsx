// File: src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, Newspaper } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Desktop Header */}
                <div className="hidden lg:flex items-center justify-between py-4">
                    <Link to="/" className="flex items-center gap-2">
                        <Newspaper className="w-8 h-8 text-blue-700" />
                        <span className="text-2xl font-bold text-gray-900">Jagat News</span>
                    </Link>
                    <nav className="flex items-center gap-x-6 text-sm text-gray-600 font-medium">
                        <Link to="/" className="hover:text-blue-600">Beranda</Link>
                        <Link to="/berita" className="hover:text-blue-600">Berita</Link>
                        <Link to="/tentang" className="hover:text-blue-600">Tentang Kami</Link>
                        <Link to="/kontak" className="hover:text-blue-600">Kontak</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input 
                                type="text" 
                                placeholder="Cari berita..." 
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <a href="/login" className="px-5 py-2 rounded-full font-bold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                            Masuk
                        </a>
                        <a href="/daftar" className="px-5 py-2 rounded-full font-bold text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                            Daftar
                        </a>
                    </div>
                </div>

                {/* Mobile Header */}
                <div className="lg:hidden flex items-center justify-between h-20">
                    <Link to="/" className="flex items-center gap-2">
                        <Newspaper className="w-8 h-8 text-blue-700" />
                        <span className="text-xl font-bold text-gray-900">Jagat News</span>
                    </Link>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col gap-1 px-4 py-4">
                        <Link to="/" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Beranda</Link>
                        <Link to="/berita" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Berita</Link>
                        <Link to="/tentang" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Tentang Kami</Link>
                        <Link to="/kontak" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>Kontak</Link>
                        <div className="pt-4 mt-4 border-t border-gray-200 flex gap-4">
                            <a href="/login" className="flex-1 text-center px-5 py-2.5 rounded-lg font-bold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100">
                                Masuk
                            </a>
                            <a href="/daftar" className="flex-1 text-center px-5 py-2.5 rounded-lg font-bold text-sm bg-blue-500 text-white hover:bg-blue-600">
                                Daftar
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;