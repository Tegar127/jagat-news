// src/pages/BeritaDetailPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { User, Calendar, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../supabaseClient';

const API_URL = '/api';

const InfoTag = ({ icon, text }) => (
    <div className="flex items-center text-sm text-zinc-600">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);

// Komponen baru untuk galeri gambar
const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Jika tidak ada gambar, tampilkan placeholder
    if (!images || images.length === 0) {
        return <img src="https://placehold.co/800x450" alt="Placeholder" className="w-full h-auto md:h-[450px] object-cover" />;
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (
        <div className="relative w-full h-auto md:h-[450px] overflow-hidden bg-gray-200">
            {/* Tampilkan gambar saat ini */}
            <img src={images[currentIndex].url} alt={`Gambar berita ${currentIndex + 1}`} className="w-full h-full object-cover transition-transform duration-500" />
            
            {/* Tampilkan tombol navigasi hanya jika gambar lebih dari 1 */}
            {images.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none">
                        <ChevronRight size={24} />
                    </button>
                    {/* Indikator slide */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <div key={index} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default function BeritaDetailPage() {
    const { id } = useParams();
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchNewsDetail = async () => {
            setLoading(true);
            try {
                // 2. Ambil detail berita dari Supabase
                const { data, error } = await supabase
                    .from('Post')
                    .select(`
                        *,
                        author:User ( name ),
                        category:Category ( name ),
                        images:Image ( id, url )
                    `)
                    .eq('id', id)
                    .single(); // .single() untuk mendapatkan satu objek, bukan array

                if (error) {
                    setNews(null); // Jika tidak ditemukan, data akan null
                    throw error;
                }

                setNews(data);

                // 3. Panggil Edge Function untuk menambah view count (tanpa menunggu hasilnya)
                supabase.functions.invoke('increment-view-count', {
                    body: { postId: id },
                });

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
        return <Navigate to="/404" replace />;
    }

    const canCopyClass = news.canBeCopied ? '' : 'select-none';

    return (
        <div className={`bg-zinc-50 font-sans min-h-screen ${canCopyClass}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-6">
                    <Link to="/berita" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar Berita
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-zinc-200">
                       {/* Gunakan komponen ImageGallery di sini */}
                       <ImageGallery images={news.images} />

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