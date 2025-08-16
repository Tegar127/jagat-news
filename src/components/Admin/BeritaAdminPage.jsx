// File: src/pages/Admin/BeritaAdminPage.jsx

import React from 'react';
import { PlusCircle, Search } from 'lucide-react';

const BeritaAdminPage = () => {
    // Data dummy, idealnya ini dari API
    const newsData = [
        { id: 1, title: 'Revolusi AI Generatif', category: 'Teknologi', author: 'Andi Wijaya', status: 'Published' },
        { id: 2, title: 'Timnas Garuda Lolos', category: 'Olahraga', author: 'Budi Santoso', status: 'Published' },
        { id: 3, title: 'Proyek Infrastruktur Baru', category: 'Ekonomi', author: 'Citra Lestari', status: 'Draft' },
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Berita</h1>
                <button className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusCircle size={20} className="mr-2" />
                    Tambah Berita
                </button>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80">
                <div className="mb-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Cari berita..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Judul</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Kategori</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Penulis</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {newsData.map(news => (
                                <tr key={news.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{news.title}</td>
                                    <td className="py-3 px-4">{news.category}</td>
                                    <td className="py-3 px-4">{news.author}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${news.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {news.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <button className="text-blue-600 hover:underline mr-4">Edit</button>
                                        <button className="text-red-600 hover:underline">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BeritaAdminPage;