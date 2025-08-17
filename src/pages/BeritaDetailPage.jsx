// src/pages/BeritaDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import { User, Calendar, ArrowLeft } from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const InfoTag = ({ icon, text }) => (
    <div className="flex items-center text-sm text-zinc-600">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);

export default function BeritaDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0); // Selalu scroll ke atas saat halaman dimuat
        const fetchNewsDetail = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_URL}/berita/${id}`);
                if (!response.ok) {
                    setNews(null); // Set berita jadi null jika tidak ditemukan
                } else {
                    const data = await response.json();
                    setNews(data);
                }
            } catch (error) {
                console.error("Gagal mengambil detail berita:", error);
                setNews(null);
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [id]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Memuat Berita...</div>;
    }

    if (!news) {
        // Arahkan ke halaman 404 jika berita tidak ditemukan setelah loading selesai
        return <Navigate to="/404" replace />;
    }

    return (
        <div className="bg-zinc-50 font-sans min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-6">
                    <Link to="/berita" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar Berita
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-zinc-200">
                       <img src={news.imageUrl || 'https://placehold.co/800x450'} alt={news.title} className="w-full h-auto md:h-[450px] object-cover" />
                       <div className="p-8">
                            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-indigo-100 text-indigo-800">
                                {news.category?.name || 'Tanpa Kategori'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">{news.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 border-y border-zinc-200 py-4">
                               <InfoTag icon={<User className="w-4 h-4 text-zinc-500" />} text={news.author?.name || 'Admin'} />
                               <InfoTag icon={<Calendar className="w-4 h-4 text-zinc-500" />} text={new Date(news.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} />
                            </div>

                            <div className="mt-6 prose lg:prose-xl max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: news.content?.replace(/\n/g, '<br />') || 'Konten tidak tersedia.' }}>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}