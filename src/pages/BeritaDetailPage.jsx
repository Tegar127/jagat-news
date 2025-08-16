import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import { User, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { beritaData } from './BeritaPage';

const InfoTag = ({ icon, text }) => (
    <div className="flex items-center text-sm text-zinc-600">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);

const findNewsById = (id) => {
    for (const categoryKey in beritaData) {
        const news = beritaData[categoryKey].find(p => p.id === parseInt(id));
        if (news) {
            return news;
        }
    }
    return null;
};

export default function BeritaDetailPage() {
    const { id } = useParams();
    const news = findNewsById(id);

    if (!news) {
        return <Navigate to="/berita" />;
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
                       <img src={news.imageUrl} alt={news.title} className="w-full h-auto md:h-[450px] object-cover" />
                       <div className="p-8">
                            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-indigo-100 text-indigo-800">
                                {news.category}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">{news.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 border-y border-zinc-200 py-4">
                               <InfoTag icon={<User className="w-4 h-4 text-zinc-500" />} text={news.author} />
                               <InfoTag icon={<Calendar className="w-4 h-4 text-zinc-500" />} text="17 Agustus 2024" />
                            </div>

                            <div className="mt-6 prose lg:prose-xl max-w-none">
                                <p>{news.description}</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p>
                                <p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor.</p>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    );
}