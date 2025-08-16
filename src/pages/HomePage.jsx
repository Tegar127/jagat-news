// File: src/pages/HomePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageSquare, Star, Cpu, Briefcase, Scale, Send, Paperclip, ShoppingBag, Download, Link as LinkIcon, Printer, Headset, Newspaper, TrendingUp, Globe, X } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// === MOCK DATA ===
const promoSlides = [
  { id: 1, title: "Sorotan Utama Hari Ini", subtitle: "Perkembangan terbaru dalam dunia teknologi dan politik global.", buttonText: "Baca Selengkapnya", imageUrl: "https://placehold.co/800x400/3B82F6/FFFFFF?text=Berita+Utama" },
  { id: 2, title: "Analisis Mendalam", subtitle: "Kupas tuntas isu-isu terkini bersama para ahli di bidangnya.", buttonText: "Lihat Analisis", imageUrl: "https://placehold.co/800x400/10B981/FFFFFF?text=Analisis+Ahli" },
  { id: 3, title: "Liputan Khusus Olahraga", subtitle: "Jangan lewatkan momen-momen terbaik dari dunia olahraga.", buttonText: "Jelajahi Sekarang", imageUrl: "https://placehold.co/800x400/F59E0B/FFFFFF?text=Liputan+Olahraga" }
];
const featuredNews = [
    {
      id: 1,
      title: "Revolusi AI Generatif: Dampaknya pada Industri Kreatif",
      author: "Andi Wijaya",
      publisher: "Jagat News Teknologi",
      rating: 4.8,
      comments: 128,
      imageUrl: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2070&auto=format&fit=crop",
      category: "Teknologi",
      abstract: "Kecerdasan buatan generatif telah mengubah lanskap industri kreatif, mulai dari penulisan hingga desain grafis. Artikel ini membahas potensi dan tantangan yang dihadapi para profesional di era baru ini."
    },
    {
      id: 2,
      title: "Timnas Garuda Lolos ke Babak Final Piala Asia",
      author: "Budi Santoso",
      publisher: "Jagat News Olahraga",
      rating: 4.9,
      comments: 345,
      imageUrl: "https://asset.kompas.id/S6M6su24yO6U5D3uWDLcc9_i7qo=/1024x683/https%3A%2F%2Fasset.kgnewsroom.com%2Fphoto%2Fpre%2F2022%2F12%2F07%2F0e98f6ff-1e8d-46d3-b504-ecce96de9787_jpg.jpg",
      category: "Olahraga",
      abstract: "Sebuah kemenangan dramatis melawan tim unggulan membawa Timnas Garuda selangkah lebih dekat menuju gelar juara. Euforia melanda seluruh negeri menyambut pencapaian bersejarah ini."
    },
    {
      id: 3,
      title: "Pemerintah Luncurkan Proyek Infrastruktur Terbesar Abad Ini",
      author: "Citra Lestari",
      publisher: "Jagat News Ekonomi",
      rating: 4.7,
      comments: 210,
      imageUrl: "https://awsimages.detik.net.id/community/media/visual/2024/05/07/progres-pembangunan-seksi-satu-ruas-tol-sibanceh-1_169.jpeg?w=1200",
      category: "Ekonomi",
      abstract: "Proyek pembangunan jalan tol trans-nusantara diharapkan dapat memacu pertumbuhan ekonomi dan menghubungkan daerah-daerah terpencil, membuka peluang baru bagi masyarakat."
    },
    {
      id: 4,
      title: "KTT Global: Para Pemimpin Dunia Bahas Perubahan Iklim",
      author: "Rahmat Hidayat",
      publisher: "Jagat News Internasional",
      rating: 4.6,
      comments: 189,
      imageUrl: "https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=2070&auto=format&fit=crop",
      category: "Internasional",
      abstract: "Para pemimpin dari seluruh dunia berkumpul untuk merumuskan langkah-langkah konkret dalam mengatasi krisis iklim. Kesepakatan baru diharapkan tercapai dalam pertemuan tingkat tinggi ini."
    },
];

const categories = [
    { name: "Politik", icon: <Briefcase className="w-8 h-8" />, color: "text-red-500", hoverBg: "hover:bg-red-100", href: '/berita?kategori=politik' },
    { name: "Teknologi", icon: <Cpu className="w-8 h-8" />, color: "text-blue-500", hoverBg: "hover:bg-blue-100", href: '/berita?kategori=teknologi' },
    { name: "Olahraga", icon: <TrendingUp className="w-8 h-8" />, color: "text-green-500", hoverBg: "hover:bg-green-100", href: '/berita?kategori=olahraga' },
    { name: "Ekonomi", icon: <Scale className="w-8 h-8" />, color: "text-yellow-500", hoverBg: "hover:bg-yellow-100", href: '/berita?kategori=ekonomi' },
    { name: "Internasional", icon: <Globe className="w-8 h-8" />, color: "text-indigo-500", hoverBg: "hover:bg-indigo-100", href: '/berita?kategori=internasional' },
];


// === CHILD COMPONENTS ===

const NewsCard = ({ news, index }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:-translate-y-1 transition-all duration-300 hover:shadow-xl flex flex-col border border-gray-200/80"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-delay={index * 150}
        data-aos-once="true"
    >
        <div className="relative">
            <img className="w-full h-48 object-cover" src={news.imageUrl} alt={`Cover Berita ${news.title}`} />
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">{news.category}</div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-blue-700 mb-1">{news.publisher}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 h-14 overflow-hidden">{news.title}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{news.author}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="text-gray-800 font-bold">{news.rating}</span></div>
                <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">{news.comments}</span> komentar</div>
            </div>
        </div>
        <div className="p-3 bg-gray-50 border-t border-gray-200/80">
            <Link to={`/berita/${news.id}`} className="block w-full text-center bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">Lihat Detail</Link>
        </div>
    </div>
);


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
                <a href="/berita" className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" data-aos-once="true">
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
                Temukan berita relevan dengan lebih cepat melalui kategori yang terstruktur.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">{categories.map((c, index) => (
                 <a
                    key={c.name}
                    href={c.href}
                    className={`group text-center p-6 bg-gray-50 rounded-xl border border-transparent hover:border-blue-500 hover:shadow-lg transform hover:-translate-y-2 transition-all duration-300 cursor-pointer ${c.hoverBg}`}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
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

const FeaturedNewsSection = () => {
    return (
        <section id="featured" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12" data-aos="fade-down" data-aos-duration="800" data-aos-once="true">
                    Berita Unggulan
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{featuredNews.map((j, index) => (
                    <NewsCard key={j.id} news={j} index={index} />
                ))}</div>
                 <div className="mt-12 text-center">
                    <a href="/berita" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200"
                        data-aos="fade-up" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                        Lihat Semua Berita
                    </a>
                </div>
            </div>
        </section>
    );
};


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
      duration: 600,
      easing: 'ease-out',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });
  }, []);

  return (
    <>
      <div className="container mx-auto px-4">
        <PromoBannerSection />
      </div>
      <CategorySection />
      <FeaturedNewsSection />
    </>
  )
}