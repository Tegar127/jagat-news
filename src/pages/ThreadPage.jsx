// File: src/pages/ThreadPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, PenSquare } from 'lucide-react';
import ThreadCard from '../components/ThreadCard'; // <-- IMPORTING THE NEW COMPONENT

// Mock data for discussion threads
const threads = [
    {
        id: 1,
        title: "Rekomendasi Jasa Proofreading untuk Jurnal Internasional Q1?",
        author: "Dr. Anisa Wulandari",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        category: "Publikasi",
        replies: 12,
        views: 145,
        lastReply: { author: "Prof. Rahmat H.", time: "2 jam lalu" },
        tags: ["proofreading", "editing", "q1-journal"]
    },
    {
        id: 2,
        title: "Pengalaman menggunakan Jasa Analisis Statistik Statista Labs",
        author: "Bima Sanjaya, S.Kom",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
        category: "Analisis Data",
        replies: 8,
        views: 231,
        lastReply: { author: "Citra Lestari", time: "5 jam lalu" },
        tags: ["spss", "analisis-data", "review"]
    },
    {
        id: 3,
        title: "Di mana bisa sewa alat Spektrometer UV-Vis area Jakarta?",
        author: "Dr. Budi Santoso",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704a",
        category: "Sewa Alat Lab",
        replies: 5,
        views: 98,
        lastReply: { author: "Lab-Rent Indo", time: "1 hari lalu" },
        tags: ["sewa-alat", "lab", "jakarta"]
    },
    {
        id: 4,
        title: "Tips & Trik Konsultasi Metodologi Penelitian yang Efektif",
        author: "Prof. Rina Puspita",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
        category: "Konsultasi",
        replies: 21,
        views: 450,
        lastReply: { author: "Dr. Amanda L.", time: "3 hari lalu" },
        tags: ["metodologi", "konsultasi", "tips"]
    }
];

const categories = ["Semua Kategori", "Analisis Data", "Publikasi", "Sewa Alat Lab", "Konsultasi", "Lainnya"];
const popularTags = ["review", "proofreading", "spss", "sewa-alat", "metodologi", "q1-journal", "tips", "jakarta"];

// Note: ThreadCard component has been moved to its own file.

const ThreadPage = () => {
    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-3">Forum Diskusi</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Tempat untuk bertanya, berbagi pengalaman, dan berdiskusi seputar layanan di Marketplace Riset.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                            <div className="relative w-full md:w-auto md:flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input type="text" placeholder="Cari diskusi..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <Link to="/login" className="flex-shrink-0 w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors">
                                <PenSquare className="w-5 h-5" />
                                <span>Mulai Diskusi Baru</span>
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {threads.map(thread => (
                                <ThreadCard key={thread.id} thread={thread} />
                            ))}
                        </div>
                        
                        {/* Pagination */}
                        <div className="mt-8 text-center">
                            <div className="inline-flex items-center space-x-1 rounded-md shadow-sm">
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-gray-300">1</button>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">2</button>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">3</button>
                                <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Next</button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-5 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Kategori</h3>
                            <ul className="space-y-2">
                                {categories.map(cat => (
                                    <li key={cat}>
                                        <Link to="/login" className="flex justify-between items-center text-gray-600 hover:text-blue-600 hover:font-semibold">
                                            <span>{cat}</span>
                                            <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-5 rounded-lg border border-gray-200">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">Tag Populer</h3>
                            <div className="flex flex-wrap gap-2">
                                {popularTags.map(tag => (
                                    <Link to="/login" key={tag} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-full hover:bg-blue-200 hover:text-blue-800">
                                        #{tag}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ThreadPage;
