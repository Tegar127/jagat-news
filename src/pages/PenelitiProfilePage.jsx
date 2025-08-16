import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { katalogData } from './KatalogPage';
import { Mail, Briefcase, Phone, Instagram, Facebook, Gitlab, ChevronRight, Lock } from 'lucide-react';

// --- Data Preparation ---
// First, let's create a more detailed, centralized database for researchers.
// In a real app, this would come from an API.
const allProjects = [
    ...katalogData.siapHilirisasi,
    ...katalogData.tahapAkhir,
    ...katalogData.tahapAwal
];

// Create a map of researchers with their projects
const researcherMap = new Map();

allProjects.forEach(project => {
    const researcherName = project.peneliti.nama;
    const researcherId = researcherName.toLowerCase().replace(/\s+/g, '-');

    if (!researcherMap.has(researcherId)) {
        researcherMap.set(researcherId, {
            id: researcherId,
            nama: researcherName,
            avatarUrl: project.peneliti.avatarUrl,
            universitas: project.universitas,
            email: `${researcherId.split('-')[0]}@portairdi.com`,
            bio: "Peneliti ahli di bidang teknologi dan inovasi dengan pengalaman lebih dari 10 tahun dalam pengembangan produk dari riset fundamental hingga siap hilirisasi. Berkomitmen untuk menciptakan solusi yang berdampak bagi masyarakat.",
            kontak: {
                telepon: '0812-3456-7890',
                instagram: 'https://instagram.com/portalrdi',
                facebook: 'https://facebook.com/portalrdi',
                gitlab: `https://gitlab.com/${researcherId.split('-')[0]}`
            },
            projects: []
        });
    }
    researcherMap.get(researcherId).projects.push(project);
});

const allResearchers = Array.from(researcherMap.values());
// --- End Data Preparation ---


// Small card component for related projects
const RelatedProjectCard = ({ project }) => (
    <Link 
        to={`/proyek/${project.id}`} 
        className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex items-center space-x-4 border border-gray-200/80"
    >
        <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-grow">
            <h3 className="font-bold text-gray-800 text-md">{project.title}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{project.description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
    </Link>
);


export default function PenelitiProfilePage() {
    const { penelitiId } = useParams();
    const peneliti = allResearchers.find(p => p.id === penelitiId);
    const navigate = useNavigate();
    const handleContactClick = () => {
        navigate('/login');
    };

    if (!peneliti) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-bold text-indigo-600">404</h1>
                    <p className="text-xl text-gray-700 mt-2">Profil Peneliti tidak ditemukan.</p>
                    <Link to="/katalog" className="mt-6 inline-block bg-indigo-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:bg-indigo-700 transition-colors">
                        Kembali ke Katalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 font-sans antialiased">
            {/* --- Profile Header --- */}
            <div>
                <div className="h-40 md:h-56 bg-gradient-to-r from-gray-700 via-gray-900 to-black"></div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="-mt-16 sm:-mt-20 flex flex-col sm:flex-row items-center sm:items-end sm:space-x-5">
                        <img
                            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                            src={peneliti.avatarUrl}
                            alt={peneliti.nama}
                        />
                        <div className="mt-3 sm:mt-0 py-4">
                            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 text-center sm:text-left">{peneliti.nama}</h1>
                            <p className="text-md text-gray-600 flex items-center justify-center sm:justify-start mt-1">
                                <Briefcase className="w-4 h-4 mr-2" />
                                {peneliti.universitas}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Main Content Grid --- */}
            <main className="container mx-auto p-4 sm:p-6 lg:p-8 mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (Profile Details) */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* About Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Tentang Saya</h2>
                            <p className="text-gray-600 leading-relaxed">{peneliti.bio}</p>
                        </div>

                         <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Hubungi Saya</h2>
                            <div className="relative">
                                {/* Blurred Background Content */}
                                <div className="space-y-4 filter blur-md select-none">
                                    <div className="flex items-center text-gray-700">
                                        <Mail className="w-5 h-5 mr-3 text-gray-400" />
                                        <span>email-peneliti@portal.com</span>
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <i className="fab fa-whatsapp w-5 h-5 mr-3 text-gray-400 text-xl text-center"></i>
                                        <span>081234567XXX</span>
                                    </div>
                                    <div className="pt-4 mt-4 border-t flex justify-start space-x-5">
                                        <span className="text-gray-400"><Instagram className="w-7 h-7"/></span>
                                        <span className="text-gray-400"><Facebook className="w-7 h-7"/></span>
                                        <span className="text-gray-400"><Gitlab className="w-7 h-7"/></span>
                                    </div>
                                </div>
                                
                                {/* Overlay and Button */}
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-xl">
                                    <button
                                        onClick={handleContactClick}
                                        className="flex items-center gap-3 bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                                    >
                                        <Lock className="w-5 h-5" />
                                        Login untuk Melihat Kontak
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* === END OF MODIFIED CARD === */}
                    </div>

                    {/* Right Column (Related Projects) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/80">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Proyek Terkait</h2>
                            {peneliti.projects.length > 0 ? (
                                <div className="space-y-5">
                                    {peneliti.projects.map(project => (
                                        <RelatedProjectCard key={project.id} project={project} />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">Belum ada proyek yang dipublikasikan.</p>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}