// File: src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => (
    <footer className="bg-gray-800 text-gray-300">
        <div className="container mx-auto px-4 pt-16 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="md:col-span-2 lg:col-span-1">
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-8 h-8 text-white" />
                        <span className="text-2xl font-bold text-white">Portal RDI</span>
                    </Link>
                    <p className="text-sm text-gray-400">Platform terdepan untuk agregasi, sitasi, dan diseminasi riset dan jurnal ilmiah di Indonesia.</p>
                </div>
                <div>
                    <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Tautan Cepat</h3>
                    <ul className="space-y-2">
                        <li><Link to="/tentang" className="hover:text-white transition-colors">Tentang Kami</Link></li>
                        <li><Link to="/bantuan" className="hover:text-white transition-colors">Bantuan & FAQ</Link></li>
                        <li><Link to="/privasi" className="hover:text-white transition-colors">Kebijakan Privasi</Link></li>
                        <li><Link to="/syarat" className="hover:text-white transition-colors">Syarat & Ketentuan</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Untuk Peneliti</h3>
                     <ul className="space-y-2">
                        <li><Link to="/kirim-naskah" className="hover:text-white transition-colors">Kirim Naskah</Link></li>
                        <li><Link to="/panduan-penulis" className="hover:text-white transition-colors">Panduan Penulis</Link></li>
                        <li><Link to="/proses-review" className="hover:text-white transition-colors">Proses Review</Link></li>
                    </ul>
                </div>
                <div>
                     <h3 className="font-semibold text-white tracking-wider uppercase mb-4">Terhubung</h3>
                    <div className="flex space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Facebook /></a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Twitter /></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Linkedin /></a>
                    </div>
                </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} Portal RDI. Seluruh hak cipta dilindungi.</p>
            </div>
        </div>
    </footer>
);

export default Footer;