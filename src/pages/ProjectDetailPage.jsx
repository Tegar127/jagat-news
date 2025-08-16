import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom'; 
import { User, MapPin, MessageSquare, Share2, Bookmark, ArrowLeft } from 'lucide-react';
import { katalogData, categoryDetails } from './KatalogPage';


const InfoTag = ({ icon, text }) => (
    <div className="flex items-center text-sm text-zinc-600">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);

const findProjectById = (id) => {
    for (const categoryKey in katalogData) {
        const project = katalogData[categoryKey].find(p => p.id === parseInt(id));
        if (project) {
            return {
                ...project,
                category: {
                    key: categoryKey,
                    title: categoryDetails[categoryKey].title,
                    badgeColor: categoryDetails[categoryKey].badgeColor,
                }
            };
        }
    }
    return null;
};


export default function ProjectDetailPage() {
    const { id } = useParams();
    const project = findProjectById(id);

   
    if (!project) {
        return <Navigate to="/katalog" />;
    }

    return (
        <div className="bg-zinc-50 font-sans min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                
                <div className="mb-6">
                    <Link to="/katalog" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Katalog
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                    
                    {/* KOLOM KIRI */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-zinc-200">
                           <img src={project.imageUrl} alt={project.title} className="w-full h-auto md:h-[450px] object-cover" />
                        </div>

                        <div className="mt-8">
                            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${project.category.badgeColor}`}>
                                {project.category.title}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-zinc-900 tracking-tight">{project.title}</h1>
                            
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 border-y border-zinc-200 py-4">
                               <InfoTag icon={<User className="w-4 h-4 text-zinc-500" />} text={project.peneliti.nama} />
                               {/* Menggunakan project.universitas */}
                               <InfoTag icon={<MapPin className="w-4 h-4 text-zinc-500" />} text={project.universitas} />
                            </div>

                            <div className="mt-6">
                                <h2 className="text-xl font-bold text-zinc-800 mb-3">Deskripsi Detail</h2>
                                <p className="text-zinc-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
                                    {project.detailDeskripsi}
                                </p>
                            </div>

                            <div className="mt-8">
                                <h3 className="text-lg font-bold text-zinc-800 mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map(tag => (
                                        <span key={tag} className="bg-zinc-200 text-zinc-700 text-xs font-medium px-3 py-1.5 rounded-md">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8 bg-white rounded-2xl shadow-lg border border-zinc-200 p-6">
                            <h2 className="text-lg font-bold text-zinc-800 mb-4">Tertarik untuk Beli atau Kolaborasi?</h2>
                            
                            <div className="flex items-center mb-6">
                                <img src={project.peneliti.avatarUrl} alt={project.peneliti.nama} className="w-14 h-14 rounded-full mr-4" />
                                <div>
                                    <p className="font-bold text-zinc-800">{project.peneliti.nama}</p>
                                    <p className="text-sm text-zinc-500">Peneliti Utama</p>
                                </div>
                            </div>
                            
                            <p className="text-sm text-zinc-600 mb-6">
                                Diskusikan detail teknis, peluang investasi, atau bentuk kolaborasi lainnya langsung dengan penelitinya.
                            </p>

                            <a href="/login" className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-indigo-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                <MessageSquare className="w-5 h-5 mr-2.5" />
                                Chat Peneliti
                            </a>

                            <div className="flex justify-around mt-6 pt-6 border-t border-zinc-200">
                                <button className="flex items-center text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                                    <Bookmark className="w-4 h-4 mr-1.5" />
                                    Simpan
                                </button>
                                <button className="flex items-center text-sm font-medium text-zinc-600 hover:text-indigo-600 transition-colors">
                                    <Share2 className="w-4 h-4 mr-1.5" />
                                    Bagikan
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}