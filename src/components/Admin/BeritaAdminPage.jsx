import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, Edit, Trash2, Upload } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const BeritaAdminPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState({ id: null, title: '', category: '', status: 'DRAFT', imageUrl: '', content: '', canBeCopied: true });
    const [imageFile, setImageFile] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchNews = async () => {
        try {
            const response = await fetch(`${API_URL}/berita`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const formattedData = data.map(news => ({
                ...news,
                author: news.author ? news.author.name : 'N/A',
                category: news.category ? news.category.name : 'N/A',
            }));
            setNewsData(formattedData);
        } catch (error) {
            console.error("Gagal mengambil data berita:", error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentNews({ ...currentNews, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleAddNew = () => {
        setCurrentNews({ id: null, title: '', category: '', status: 'DRAFT', imageUrl: '', content: '', canBeCopied: true });
        setImageFile(null);
        setIsFormVisible(true);
    };

    const handleEdit = (news) => {
        setCurrentNews(news);
        setImageFile(null);
        setIsFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', currentNews.title);
        formData.append('category', currentNews.category);
        formData.append('status', currentNews.status);
        formData.append('content', currentNews.content);
        formData.append('canBeCopied', currentNews.canBeCopied);

        if (imageFile) {
            formData.append('imageFile', imageFile);
        } else {
            formData.append('imageUrl', currentNews.imageUrl);
        }

        const method = currentNews.id ? 'PUT' : 'POST';
        const url = currentNews.id ? `${API_URL}/berita/${currentNews.id}` : `${API_URL}/berita`;

        try {
            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Gagal menyimpan berita');
            }

            await fetchNews(); // Ambil data terbaru
            setIsFormVisible(false); // Tutup form
        } catch (error) {
            console.error('Error saat submit:', error);
            alert('Terjadi kesalahan: ' + error.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Apakah Anda yakin ingin menghapus berita ini?')) {
            await fetch(`${API_URL}/berita/${id}`, { method: 'DELETE' });
            fetchNews();
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
                            <label className="block text-gray-700 text-sm font-bold mb-2">URL Gambar (Opsional)</label>
                            <input type="text" name="imageUrl" value={currentNews.imageUrl} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" placeholder="https://contoh.com/gambar.jpg"/>
                        </div>
                        <div className="flex items-center justify-center w-full mb-4">
                            <span className="text-gray-500 text-sm mx-4 font-semibold">ATAU</span>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Upload Gambar dari Komputer</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                            <span>Pilih file untuk diupload</span>
                                            <input id="file-upload" name="imageFile" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" />
                                        </label>
                                    </div>
                                    {imageFile ? 
                                        <p className="text-sm text-green-600 mt-2">File dipilih: {imageFile.name}</p> : 
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Isi Berita</label>
                            <textarea name="content" value={currentNews.content} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" rows="5" placeholder="Tulis isi berita di sini..."></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                            <select name="status" value={currentNews.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                                <option value="PUBLISHED">Published</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input type="checkbox" name="canBeCopied" checked={currentNews.canBeCopied} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <span className="ml-2 text-gray-700">Izinkan teks berita disalin</span>
                            </label>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">Simpan</button>
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
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${news.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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