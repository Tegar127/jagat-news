import React, { useState, useEffect } from 'react'; // Tambahkan useEffect
import { PlusCircle, Search, Edit, Trash2 } from 'lucide-react';

const API_URL = 'http://localhost:5000/api'; // Definisikan URL base API

const BeritaAdminPage = () => {
    const [newsData, setNewsData] = useState([]); // Awalnya data kosong
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState({ id: null, title: '', category: '', author: '', status: 'DRAFT' });
    const [searchTerm, setSearchTerm] = useState('');

    // Fungsi untuk mengambil data dari server
    const fetchNews = async () => {
        const response = await fetch(`${API_URL}/berita`);
        const data = await response.json();
        // Format data agar sesuai dengan state frontend
        const formattedData = data.map(news => ({
            ...news,
            author: news.author.name,
            category: news.category.name,
        }));
        setNewsData(formattedData);
    };

    // useEffect akan berjalan sekali saat komponen pertama kali dimuat
    useEffect(() => {
        fetchNews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentNews({ ...currentNews, [name]: value });
    };

    const handleAddNew = () => {
        setCurrentNews({ id: null, title: '', category: '', author: '', status: 'DRAFT' });
        setIsFormVisible(true);
    };

    const handleEdit = (news) => {
        setCurrentNews(news);
        setIsFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const method = currentNews.id ? 'PUT' : 'POST';
        const url = currentNews.id ? `${API_URL}/berita/${currentNews.id}` : `${API_URL}/berita`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(currentNews),
        });

        fetchNews(); // Ambil data terbaru setelah submit
        setIsFormVisible(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            await fetch(`${API_URL}/berita/${id}`, { method: 'DELETE' });
            fetchNews(); // Ambil data terbaru setelah hapus
        }
    };
    
    const filteredNews = newsData.filter(news => 
        news.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Berita</h1>
                <button onClick={handleAddNew} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    <PlusCircle size={20} className="mr-2" />
                    Tambah Berita
                </button>
            </div>

            {isFormVisible && (
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80 mb-6">
                    <h2 className="text-xl font-bold mb-4">{currentNews.id ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Judul</label>
                            <input type="text" name="title" value={currentNews.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                            <input type="text" name="category" value={currentNews.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Penulis</label>
                            <input type="text" name="author" value={currentNews.author} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                         <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                                <select name="status" value={currentNews.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                                    {/* Ubah nilai value menjadi huruf besar */}
                                    <option value="PUBLISHED">Published</option>
                                    <option value="DRAFT">Draft</option>
                                </select>
                            </div>

                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">Batal</button>
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">{currentNews.id ? 'Simpan Perubahan' : 'Simpan'}</button>
                        </div>
                    </form>
                </div>
            )}
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80">
                <div className="mb-4">
                     <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Cari berita..." onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                            {filteredNews.map(news => (
                                <tr key={news.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{news.title}</td>
                                    <td className="py-3 px-4">{news.category}</td>
                                    <td className="py-3 px-4">{news.author}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${news.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                                            {news.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button onClick={() => handleEdit(news)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                        <button onClick={() => handleDelete(news.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
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