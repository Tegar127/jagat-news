// File: src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { User, X, Heart, MessageSquare, Star, Building, FlaskConical, Cpu, Briefcase, Scale, Send, Paperclip, ShoppingBag, Download, Link as LinkIcon, Printer, Headset } from 'lucide-react';
import EventsSection from '../components/EventsSection';
import FeaturedThreadsSection from '../components/FeaturedThreadsSection';

// Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

// === MOCK DATA ===
const promoSlides = [
  { id: 1, title: "Mau riset lebih hemat?", subtitle: "Cek hibah & promo pendanaan di Portal RDI!", buttonText: "Cek Sekarang", imageUrl: "https://placehold.co/800x400/3B82F6/FFFFFF?text=Riset+Hemat" },
  { id: 2, title: "Dana Hibah Penelitian Terbaru", subtitle: "Jelajahi kesempatan pendanaan untuk proyek riset inovatif Anda.", buttonText: "Cari Info Hibah", imageUrl: "https://placehold.co/800x400/10B981/FFFFFF?text=Dana+Hibah" },
  { id: 3, title: "Kolaborasi Riset Antar Universitas", subtitle: "Temukan partner peneliti dari institusi terkemuka di seluruh Indonesia.", buttonText: "Mulai Kolaborasi", imageUrl: "https://placehold.co/800x400/F59E0B/FFFFFF?text=Kolaborasi" }
];
const featuredJournals = [
  {
    id: 1,
    title: "Analisis Sentimen Opini Publik terhadap Kebijakan AI Nasional",
    author: "Dr. Budi Santoso, M.Kom.",
    publisher: "Jurnal Teknologi Informasi (JUTI)",
    rating: 4.5,
    citations: 128,
    // Gambar yang relevan dengan AI dan analisis data
    imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2070&auto=format&fit=crop",
    category: "Teknologi",
    abstract: "Penelitian ini bertujuan untuk menganalisis sentimen opini publik terhadap kebijakan kecerdasan buatan (AI) nasional yang baru diluncurkan. Menggunakan metode machine learning dengan algoritma Naive Bayes, data opini dari media sosial Twitter dianalisis untuk mengklasifikasikan sentimen menjadi positif, negatif, atau netral. Hasil menunjukkan bahwa mayoritas publik (65%) memiliki sentimen positif, menyoroti harapan akan inovasi dan kemajuan teknologi. Namun, sekitar 25% menunjukkan sentimen negatif terkait kekhawatiran privasi data dan dampak pada tenaga kerja. Sisanya (10%) bersifat netral."
  },
  {
    id: 2,
    title: "Efektivitas Vaksin Generasi Baru pada Varian Virus Influenza H5N1",
    author: "Dr. Citra Lestari, Apt.",
    publisher: "Indonesian Journal of Medicine",
    rating: 4.8,
    citations: 345,
    // Gambar penelitian medis atau vaksin
    imageUrl: "https://assetd.kompas.id/S6M6su24yO6U5D3uWDLcc9_i7qo=/1024x683/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2022%2F12%2F07%2F0e98f6ff-1e8d-46d3-b504-ecce96de9787_jpg.jpg",
    category: "Kesehatan",
    abstract: "Studi klinis ini mengevaluasi efektivitas dan keamanan vaksin mRNA generasi baru terhadap varian virus influenza H5N1 yang sangat patogen. Penelitian melibatkan 500 partisipan dewasa sehat yang dibagi menjadi kelompok vaksin dan plasebo. Hasil menunjukkan efikasi vaksin sebesar 94.5% dalam mencegah infeksi simptomatik. Efek samping yang dilaporkan umumnya ringan dan bersifat sementara. Vaksin ini menunjukkan potensi besar sebagai alat pencegahan pandemi influenza di masa depan."
  },
  {
    id: 3,
    title: "Dampak Pembangunan Infrastruktur terhadap Pertumbuhan Ekonomi Lokal",
    author: "Prof. Dr. Rahmat Hidayat, S.E.",
    publisher: "Jurnal Ekonomi Pembangunan",
    rating: 4.7,
    citations: 210,
    // Gambar infrastruktur jalan tol yang modern
    imageUrl: "https://awsimages.detik.net.id/community/media/visual/2024/05/07/progres-pembangunan-seksi-satu-ruas-tol-sibanceh-1_169.jpeg?w=1200",
    category: "Bisnis",
    abstract: "Riset ini mengkaji dampak pembangunan infrastruktur jalan tol terhadap pertumbuhan ekonomi di kabupaten-kabupaten yang dilaluinya di Pulau Jawa. Dengan menggunakan model regresi data panel selama periode 10 tahun, kami menemukan bahwa setiap peningkatan 10% dalam panjang jalan tol berkorelasi dengan peningkatan PDRB per kapita sebesar 2.5%. Dampak positif ini terutama terlihat pada sektor perdagangan, transportasi, dan akomodasi. Studi ini merekomendasikan percepatan pembangunan infrastruktur yang terintegrasi untuk pemerataan pertumbuhan ekonomi."
  },
  {
    id: 4,
    title: "Kajian Hukum Perlindungan Data Pribadi di Era Digital",
    author: "Dr. Anisa Wulandari, S.H., M.H.",
    publisher: "Jurnal Supremasi Hukum",
    rating: 4.6,
    citations: 189,
    // Gambar yang merepresentasikan hukum, data, dan keamanan
    imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop",
    category: "Hukum",
    abstract: "Artikel ini menganalisis kerangka hukum perlindungan data pribadi di Indonesia pasca-pemberlakuan UU PDP. Melalui pendekatan yuridis normatif dan komparatif dengan GDPR di Uni Eropa, penelitian ini mengidentifikasi beberapa tantangan implementasi, termasuk pembentukan lembaga pengawas independen dan kesadaran hukum di kalangan pengendali data. Diperlukan peraturan turunan yang lebih teknis dan sosialisasi masif untuk memastikan efektivitas perlindungan hak-hak subjek data di era digital."
  },
];
const categories = [
    { name: "Kesehatan", icon: <Heart className="w-8 h-8" />, color: "text-red-500", hoverBg: "hover:bg-red-100", href: '/login' },
    { name: "Teknologi", icon: <Cpu className="w-8 h-8" />, color: "text-blue-500", hoverBg: "hover:bg-blue-100", href: '/login' },
    { name: "Sains Murni", icon: <FlaskConical className="w-8 h-8" />, color: "text-green-500", hoverBg: "hover:bg-green-100", href: '/login' },
    { name: "Ekonomi", icon: <Briefcase className="w-8 h-8" />, color: "text-yellow-500", hoverBg: "hover:bg-yellow-100", href: '/login' },
    { name: "Hukum", icon: <Scale className="w-8 h-8" />, color: "text-indigo-500", hoverBg: "hover:bg-indigo-100", href: '/login' },
    { name: "Sosial", icon: <Building className="w-8 h-8" />, color: "text-gray-500", hoverBg: "hover:bg-gray-100", href: '/login' },
];
const marketplaceItems = [
  {
    id: 1,
    title: "Jasa Analisis Statistik (SPSS & R)",
    provider: "Statista Labs",
    price: "Mulai dari Rp500.000",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Analisis Data"
  },
  {
    id: 2,
    title: "Proofreading & Editing Naskah (Bahasa Inggris)",
    provider: "GrammarCheck Pro",
    price: "Rp150/kata",
    imageUrl: "data:image/jpeg;base64,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",
    category: "Publikasi"
  },
  {
    id: 3,
    title: "Sewa Spektrometer UV-Vis",
    provider: "Lab-Rent Indonesia",
    price: "Rp1.200.000/hari",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKqCdymJmQ_W1TsM-li1lhCg2y9nv0Ketteg&s",
    category: "Sewa Alat Lab"
  },
  {
    id: 4,
    title: "Konsultasi Metodologi Penelitian",
    provider: "Dr. Amanda Laras, M.Sc.",
    price: "Rp750.000/jam",
    imageUrl: "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Konsultasi"
  },
];

// === CHILD COMPONENTS specific to HomePage ===

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[100] flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col animate-scale-in">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-800">Detail Jurnal</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-2 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                </div>
                <div className="overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

const JournalDetailContent = ({ journal }) => {
    if(!journal) return null;
    return (
        <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                     <img className="w-full h-auto object-cover rounded-lg shadow-md" src={journal.imageUrl} alt={`Cover Jurnal ${journal.title}`} />
                     <div className="mt-6 space-y-3">
                        <a href="/login" className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" data-aos="fade-up" data-aos-duration="500" data-aos-delay="100">
                            <Download className="w-5 h-5"/>Unduh PDF
                        </a>
                         <a href="/login" className="flex items-center justify-center gap-3 w-full bg-gray-100 text-gray-700 font-bold py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors" data-aos="fade-up" data-aos-duration="500" data-aos-delay="200">
                            <Printer className="w-5 h-5"/>Cetak Halaman
                        </a>
                     </div>
                </div>
                <div className="lg:col-span-2">
                    <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-3 py-1 rounded-full mb-3" data-aos="fade-left" data-aos-duration="600" data-aos-delay="100">
                        {journal.category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2" data-aos="fade-left" data-aos-duration="600" data-aos-delay="200">
                        {journal.title}
                    </h2>
                    <p className="text-md text-gray-500 mb-4" data-aos="fade-left" data-aos-duration="600" data-aos-delay="300">
                        Oleh: <span className="font-semibold text-gray-700">{journal.author}</span>
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-600 mb-6 pb-6 border-b border-gray-200" data-aos="fade-left" data-aos-duration="600" data-aos-delay="400">
                         <div className="flex items-center gap-2"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="font-bold text-gray-800">{journal.rating}</span></div>
                        <div className="font-semibold text-gray-800">{journal.citations} <span className="font-normal text-gray-600">Sitasi</span></div>
                        <p className="font-semibold text-gray-800">{journal.publisher}</p>
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2" data-aos="fade-left" data-aos-duration="600" data-aos-delay="500">Abstrak</h4>
                    <p className="text-gray-600 leading-relaxed text-justify" data-aos="fade-left" data-aos-duration="600" data-aos-delay="600">{journal.abstract}</p>
                    <div className="mt-8 p-4 bg-gray-50 rounded-lg" data-aos="fade-up" data-aos-duration="600" data-aos-delay="700">
                        <h5 className="font-bold text-gray-700 mb-2">Bagikan atau Sitasi</h5>
                        <div className="flex flex-col md:flex-row gap-3">
                            <input type="text" readOnly value={`https://portal-rdi.id/jurnal/${journal.id}`} className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                            <button className="flex-shrink-0 flex items-center justify-center gap-2 bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"><LinkIcon className="w-4 h-4" />Salin Tautan</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const JournalCard = ({ journal, onDetailClick, index }) => ( // Add index prop
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col border border-gray-200/80"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay={index * 150} // Staggered delay for cards
        data-aos-once="true"
    >
        <div className="relative">
            <img className="w-full h-48 object-cover" src={journal.imageUrl} alt={`Cover Jurnal ${journal.title}`} />
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">{journal.category}</div>
            <button className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded-full p-2 text-gray-600 hover:text-red-500 transition-colors duration-200"><Heart className="w-5 h-5" /></button>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-blue-700 mb-1">{journal.publisher}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 h-14 overflow-hidden">{journal.title}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{journal.author}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="text-gray-800 font-bold">{journal.rating}</span></div>
                <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">{journal.citations}</span> sitasi</div>
            </div>
        </div>
        <div className="p-3 bg-gray-50 border-t border-gray-200/80">
            <button onClick={() => onDetailClick(journal)} className="block w-full text-center bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">Lihat Detail</button>
        </div>
    </div>
);

const MarketplaceCard = ({ item, index }) => ( // Add index prop
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col border border-gray-200/80"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay={index * 150} // Staggered delay for cards
        data-aos-once="true"
    >
        <div className="relative">
            <img className="w-full h-48 object-cover" src={item.imageUrl} alt={item.title} />
            <div className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">{item.category}</div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-4">oleh <span className="font-semibold">{item.provider}</span></p>
        </div>
        <div className="p-4 bg-gray-50 border-t border-gray-200/80 flex justify-between items-center">
             <p className="text-lg font-bold text-teal-600">{item.price}</p>
            <a href="/login" className="bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-teal-600 transition-colors duration-200">Pesan</a>
        </div>
    </div>
);

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {/* ... (kode chat window tidak berubah) ... */}
            <div className={`fixed bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-80 h-96 bg-white rounded-lg shadow-2xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                 <div className="flex flex-col h-full">
                    <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg"><h3 className="font-bold">Chat dengan Admin</h3><button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-blue-700"><X className="w-5 h-5"/></button></div>
                    <div className="flex-grow p-4 overflow-y-auto space-y-4">
                        <div className="flex items-start gap-2.5">
                            <div className="flex-shrink-0 bg-gray-200 rounded-full p-2"><User className="w-5 h-5 text-gray-600"/></div>
                            <div className="bg-gray-100 p-3 rounded-lg rounded-tl-none"><p className="text-sm text-gray-800">Halo! Ada yang bisa kami bantu? Silakan tinggalkan pertanyaan Anda di sini.</p><p className="text-xs text-gray-500 text-right mt-1">10:04 AM</p></div>
                        </div>
                    </div>
                    <div className="p-2 border-t border-gray-200">
                        <div className="relative">
                           <input type="text" placeholder="Ketik pesan Anda..." className="w-full pl-4 pr-20 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                           <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center"><button className="p-2 text-gray-500 hover:text-gray-700"><Paperclip className="w-5 h-5"/></button><button className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700"><Send className="w-5 h-5"/></button></div>
                        </div>
                    </div>
                </div>
            </div>
            <button
                id="chat-button"
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transform transition-all duration-300 hover:bg-blue-700 hover:scale-110 ${isOpen ? 'scale-0' : 'scale-100'}`}
                data-aos="zoom-in"
                data-aos-duration="300"
                data-aos-once="true"
                data-aos-offset="20"
            >
                {/* --- IKON DIGANTI MENJADI HEADSET --- */}
                <Headset className="w-8 h-8" />
            </button>
        </>
    );
}
// === SECTIONS ===

const PromoBannerSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nextSlide = useCallback(() => { setCurrentIndex(prev => (prev === promoSlides.length - 1 ? 0 : prev + 1)); }, []);
    useEffect(() => { const timer = setInterval(nextSlide, 5000); return () => clearInterval(timer); }, [nextSlide]);
    const currentSlide = promoSlides[currentIndex];
    return (
        <section className="relative w-full h-[400px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden my-8 shadow-2xl shadow-blue-500/20"
            data-aos="fade-zoom-in"
            data-aos-duration="1000"
            data-aos-once="true"
        >
            {promoSlides.map((slide, index) => ( <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}><img src={slide.imageUrl} alt={slide.title} className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div></div> ))}
            <div className="relative z-10 h-full flex flex-col justify-center items-start text-white p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 max-w-lg" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                    {currentSlide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 max-w-md opacity-90" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                    {currentSlide.subtitle}
                </p>
                <a href="/login" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" data-aos-once="true">
                    {currentSlide.buttonText}
                </a>
            </div>
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">{promoSlides.map((_, index) => ( <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-6' : 'bg-white/50'}`} /> ))}</div>
        </section>
    );
};

const CategorySection = () => (
    <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4" data-aos="fade-down" data-aos-duration="800" data-aos-once="true">
                Jelajahi Berdasarkan Kategori
            </h2>
            <p className="text-lg text-center text-gray-500 mb-12 max-w-2xl mx-auto" data-aos="fade-down" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                Temukan penelitian relevan dengan lebih cepat melalui kategori yang terstruktur.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">{categories.map((c, index) => (
                 <a
                    key={c.name}
                    href={c.href}
                    className={`group text-center p-6 bg-gray-50 rounded-xl border border-transparent hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer ${c.hoverBg}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100} // Staggered delay for category cards
                    data-aos-duration="700"
                    data-aos-once="true"
                >
            <div className={`inline-flex items-center justify-center p-4 bg-white rounded-full shadow-md mb-4 transition-colors duration-300 ${c.color} group-hover:bg-blue-500 group-hover:text-white`}>
                {c.icon}
            </div>
            <h3 className="font-semibold text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                {c.name}
            </h3>
        </a>
    ))}
                </div>
        </div>
    </section>
);

const FeaturedJournalsSection = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJournal, setSelectedJournal] = useState(null);
    const handleOpenModal = (journal) => { setSelectedJournal(journal); setIsModalOpen(true); };
    const handleCloseModal = () => { setIsModalOpen(false); setSelectedJournal(null); };
    return (
        <section id="featured" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-down" data-aos-duration="800" data-aos-once="true">
                    Jurnal Unggulan Saat Ini
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{featuredJournals.map((j, index) => (
                    <JournalCard key={j.id} journal={j} onDetailClick={handleOpenModal} index={index} />
                ))}</div>
                 <div className="mt-12 text-center">
                    <a href="/login" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                        data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                        Lihat Semua Jurnal
                    </a>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}><JournalDetailContent journal={selectedJournal} /></Modal>
        </section>
    );
};

const MarketplaceSection = () => (
    <section id="marketplace" className="py-16 bg-teal-50/50">
        <div className="container mx-auto px-4">
             <div className="text-center mb-12" data-aos="fade-down" data-aos-duration="800" data-aos-once="true">
                <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-teal-500"/>Marketplace Riset
                </h2>
                <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
                    Temukan jasa dan layanan untuk mendukung kelancaran riset Anda.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">{marketplaceItems.map((item, index) => (
                <MarketplaceCard key={item.id} item={item} index={index} />
            ))}</div>
             <div className="mt-12 text-center">
                <a href="/login" className="inline-block bg-white text-teal-600 font-semibold py-3 px-8 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                    data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                    Jelajahi Semua Layanan
                </a>
            </div>
        </div>
    </section>
);


// === MAIN HOMEPAGE COMPONENT ===
export default function HomePage() {
  useEffect(() => {
    AOS.init({
      disable: false,
      startEvent: 'DOMContentLoaded',
      initClassName: 'aos-init',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,

      offset: 120,
      delay: 0,
      duration: 600, // Durasi default disesuaikan untuk konsistensi
      easing: 'ease-out', // Easing default disesuaikan
      once: true, // Animasi terjadi hanya sekali saat elemen masuk viewport
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
    // Optional: Refresh AOS if content changes dynamically (e.g., after data fetch)
    // AOS.refresh();
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <PromoBannerSection />
      </div>
      <CategorySection />
      <FeaturedJournalsSection />
      <EventsSection />
      <MarketplaceSection />
      <FeaturedThreadsSection />
      <ChatWidget />
    </>
  )
}