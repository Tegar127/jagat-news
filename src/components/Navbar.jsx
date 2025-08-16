// File: src/components/Navbar.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, X, BookOpen, FileText, Handshake, Download } from 'lucide-react'; // Menambahkan ikon Download

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Dummy PDF file (ganti dengan URL file PDF asli Anda jika sudah ada)
    const dummyPdfUrl = '/dummy.pdf'; // Pastikan file dummy.pdf ada di folder 'public' Anda

    // Data dummy untuk dropdown kesepakatan
    const agreements = [
        {
            type: 'MoU',
            header: 'MoU dengan PT. Contoh Sejahtera',
            detail: 'Kerja sama dalam pengembangan produk digital dan pelatihan.',
            icon: <FileText className="w-5 h-5 text-blue-500" />,
            file: dummyPdfUrl
        },
        {
            type: 'MoA',
            header: 'MoA dengan Universitas ABC',
            detail: 'Pelaksanaan penelitian bersama di bidang kecerdasan buatan.',
            icon: <Handshake className="w-5 h-5 text-green-500" />,
            file: dummyPdfUrl
        },
        {
            type: 'MoU',
            header: 'MoU dengan Pemerintah Kota DEF',
            detail: 'Program pengabdian masyarakat untuk peningkatan literasi digital.',
            icon: <FileText className="w-5 h-5 text-blue-500" />,
            file: dummyPdfUrl
        }
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="container mx-auto px-4">
                {/* Desktop Header */}
                <div className="hidden lg:flex flex-row items-center py-4">
                    <div className="flex items-center gap-2 mr-8" style={{ position: 'relative', top: '-15px' }}>
                        <Link to="/" className="flex items-center gap-2">
                            <BookOpen className="w-8 h-8 text-blue-700" />
                            <span className="text-2xl font-bold text-gray-900">Portal RDI</span>
                        </Link>
                    </div>
                    <div className="flex-grow flex flex-col">
                        <div className="flex items-center w-full">
                            <div className="relative flex-grow">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input 
                                    type="text" 
                                    placeholder="Cari di Portal RDI...." 
                                    className="w-full pl-11 pr-4 py-2.5 border border-blue-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left" 
                                />
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0 ml-6">
                                {/* Dropdown Kesepakatan */}
                                <div className="relative">
                                    <button 
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        <Handshake className="w-6 h-6 text-gray-600" />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col p-2">
                                            <h3 className="font-semibold text-gray-800 px-3 py-2 border-b border-gray-200">Daftar Kesepakatan</h3>
                                            {agreements.map((agreement, index) => (
                                                <div 
                                                    key={index} 
                                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
                                                >
                                                    <Link 
                                                        to="/login" // Mengarahkan ke halaman login
                                                        className="flex items-center gap-3 flex-grow" // flex-grow agar mengisi ruang
                                                        onClick={() => setIsDropdownOpen(false)} // Tutup dropdown setelah klik
                                                    >
                                                        <div className="flex-shrink-0">
                                                            {agreement.icon}
                                                        </div>
                                                        <div className="flex-grow">
                                                            <p className="font-medium text-gray-900 text-sm">{agreement.header}</p>
                                                            <p className="text-gray-600 text-xs mt-0.5">{agreement.detail}</p>
                                                        </div>
                                                    </Link>
                                                    <a 
                                                        href={agreement.file} 
                                                        download // Atribut download untuk mengunduh file
                                                        className="flex-shrink-0 p-2 ml-2 rounded-full hover:bg-blue-100 text-blue-600"
                                                        onClick={() => setIsDropdownOpen(false)} // Tutup dropdown setelah download
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </a>
                                                </div>
                                            ))}
                                            {agreements.length === 0 && (
                                                <p className="text-gray-500 text-sm p-3">Tidak ada kesepakatan terbaru.</p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="h-6 border-l border-gray-300"></div>
                                <a href="/login" className="px-5 py-2 rounded-lg font-bold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                                    Masuk
                                </a>
                                <a href="/daftar" className="px-5 py-2 rounded-lg font-bold text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                                    Daftar
                                </a>
                            </div>
                        </div>
                        <div className="hidden xl:flex items-center gap-x-4 text-xs text-gray-500 mt-4 justify-start">
                            <Link to="/" className="hover:text-blue-600">Beranda</Link>
                            <Link to="/tentang" className="hover:text-blue-600">Profile RDI</Link>
                            <Link to="/katalog" className="hover:text-blue-600">Katalog</Link>
                            <Link to="/thread" className="hover:text-blue-600">Thread</Link>
                            <Link to="/acara" className="hover:text-blue-600">Event</Link>
                            <Link to="/kontak" className="hover:text-blue-600">Kontak</Link>
                        </div>
                    </div>
                </div>

                {/* Mobile Header Bar */}
                <div className="lg:hidden flex items-center justify-between h-20">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                    <Link to="/" className="flex items-center gap-2">
                        <BookOpen className="w-8 h-8 text-blue-700" />
                        <span className="text-xl font-bold text-gray-900">Portal RDI</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg">
                            <Search className="w-6 h-6 text-gray-600" />
                        </button>
                        {/* Dropdown Kesepakatan untuk Mobile */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                                className="p-2 rounded-lg"
                            >
                                <Handshake className="w-6 h-6 text-gray-600" />
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-md shadow-lg z-10 flex flex-col p-2">
                                    <h3 className="font-semibold text-gray-800 px-3 py-2 border-b border-gray-200">Daftar Kesepakatan</h3>
                                    {agreements.map((agreement, index) => (
                                        <div 
                                            key={index} 
                                            className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
                                        >
                                            <Link 
                                                to="/login" 
                                                className="flex items-center gap-3 flex-grow"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <div className="flex-shrink-0">
                                                    {agreement.icon}
                                                </div>
                                                <div className="flex-grow">
                                                    <p className="font-medium text-gray-900 text-sm">{agreement.header}</p>
                                                    <p className="text-gray-600 text-xs mt-0.5">{agreement.detail}</p>
                                                </div>
                                            </Link>
                                            <a 
                                                href={agreement.file} 
                                                download 
                                                className="flex-shrink-0 p-2 ml-2 rounded-full hover:bg-blue-100 text-blue-600"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                <Download className="w-5 h-5" />
                                            </a>
                                        </div>
                                    ))}
                                    {agreements.length === 0 && (
                                        <p className="text-gray-500 text-sm p-3">Tidak ada kesepakatan terbaru.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-200">
                    <nav className="flex flex-col gap-1 px-4 py-4">
                        <div className="pb-4 mb-4 border-b border-gray-200 flex gap-4">
                            <a href="/login" className="flex-1 text-center px-5 py-2.5 rounded-lg font-bold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors">
                                Masuk
                            </a>
                            <a href="/daftar" className="flex-1 text-center px-5 py-2.5 rounded-lg font-bold text-sm bg-blue-500 text-white hover:bg-green-600 transition-colors">
                                Daftar
                            </a>
                        </div>
                        <Link to="/tentang" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100 transition-colors">Profile RDI</Link>
                        <Link to="/katalog" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100 transition-colors">Katalog</Link>
                        <Link to="/thread" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100 transition-colors">Thread</Link>
                        <Link to="/acara" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100 transition-colors">Event</Link>
                        <Link to="/kontak" className="text-gray-700 font-medium p-3 rounded-md hover:bg-gray-100 transition-colors">Kontak</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Navbar;