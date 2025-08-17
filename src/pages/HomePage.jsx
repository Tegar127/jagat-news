import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Star, Briefcase, Cpu, Scale, TrendingUp, Globe, Calendar } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SidebarNews from '../components/SidebarNews';

const API_URL = 'http://localhost:5000/api';

// Data statis hanya untuk kategori karena tidak dikelola di admin
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
            <img className="w-full h-48 object-cover" src={news.imageUrl || 'https://placehold.co/400x200?text=Jagat+News'} alt={`Cover Berita ${news.title}`} />
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">{news.category?.name || 'Berita'}</div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-blue-700 mb-1">{news.author?.name || 'Jagat News'}</p>
            <h3 className="text-lg font-bold text-gray-900 mb-2 h-14 overflow-hidden">{news.title}</h3>
            <p className="text-sm text-gray-600 mb-4 flex-grow">{news.author?.name || 'Tanpa Penulis'}</p>
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1"><Star className="w-5 h-5 text-yellow-400 fill-current" /><span className="text-gray-800 font-bold">4.8</span></div>
                <div className="text-sm text-gray-500"><span className="font-medium text-gray-700">128</span> komentar</div>
            </div>
        </div>
        <div className="p-3 bg-gray-50 border-t border-gray-200/80">
            <Link to={`/berita/${news.id}`} className="block w-full text-center bg-blue-100 text-blue-700 font-semibold py-2 rounded-lg hover:bg-blue-200 transition-colors duration-200">Lihat Detail</Link>
        </div>
    </div>
);


// === SECTIONS ===
const PromoBannerSection = () => {
    const [promoSlides, setPromoSlides] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchPromos = async () => {
            try {
                const response = await fetch(`${API_URL}/promo`);
                const data = await response.json();
                setPromoSlides(data);
            } catch (error) {
                console.error("Gagal mengambil data promo:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPromos();
    }, []);

    const nextSlide = useCallback(() => {
        if (promoSlides.length > 0) {
            setCurrentIndex(prev => (prev === promoSlides.length - 1 ? 0 : prev + 1));
        }
    }, [promoSlides.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    if (loading) {
        return <div className="h-[400px] flex justify-center items-center">Memuat promo...</div>;
    }
    
    if (promoSlides.length === 0) {
        return null; // Jangan render apapun jika tidak ada promo aktif
    }

    const currentSlide = promoSlides[currentIndex];

    return (
        <section className="relative w-full h-[400px] md:h-[350px] lg:h-[400px] rounded-2xl overflow-hidden my-8 shadow-2xl shadow-blue-500/20"
            data-aos="fade-zoom-in"
            data-aos-duration="1000"
            data-aos-once="true"
        >
            {promoSlides.map((slide, index) => (
                 <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
                    <img src={slide.imageUrl || 'https://placehold.co/800x400/3B82F6/FFFFFF?text=Jagat+News'} alt={slide.title} className="w-full h-full object-cover"/>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
                </div>
             ))}
            <div className="relative z-10 h-full flex flex-col justify-center items-start text-white p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 max-w-lg" data-aos="fade-right" data-aos-duration="800" data-aos-once="true">
                    {currentSlide.title}
                </h2>
                <p className="text-lg md:text-xl mb-6 max-w-md opacity-90" data-aos="fade-right" data-aos-duration="800" data-aos-delay="200" data-aos-once="true">
                    {currentSlide.subtitle}
                </p>
                <Link to={currentSlide.buttonLink || '#'} className="bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105" data-aos="fade-up" data-aos-duration="800" data-aos-delay="400" data-aos-once="true">
                    {currentSlide.buttonText || 'Baca Selengkapnya'}
                </Link>
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

const MainContentSection = () => {
    const [featuredNews, setFeaturedNews] = useState([]);
    const [latestNews, setLatestNews] = useState([]);
    const [popularNews, setPopularNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllNews = async () => {
            try {
                const [featuredRes, latestRes, popularRes] = await Promise.all([
                    fetch(`${API_URL}/berita`),
                    fetch(`${API_URL}/berita/latest`),
                    fetch(`${API_URL}/berita/popular`),
                ]);
                const featuredData = await featuredRes.json();
                const latestData = await latestRes.json();
                const popularData = await popularRes.json();

                setFeaturedNews(featuredData.slice(0, 6)); // Ambil 6 berita unggulan
                setLatestNews(latestData);
                setPopularNews(popularData);

            } catch (error) {
                console.error("Gagal mengambil data berita:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllNews();
    }, []);

    return (
        <section id="content" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Kolom Berita Unggulan */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">Berita Unggulan</h2>
                         {loading ? (
                            <p>Memuat berita unggulan...</p>
                        ) : featuredNews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {featuredNews.map((news, index) => (
                                    <NewsCard key={news.id} news={news} index={index} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">Belum ada berita unggulan.</p>
                        )}
                    </div>
                    
                    {/* Sidebar */}
                    <aside className="space-y-8">
                        <SidebarNews title="Berita Terbaru" news={latestNews} loading={loading} />
                        <SidebarNews title="Berita Terpopuler" news={popularNews} loading={loading} showRanking={true} />
                    </aside>
                </div>
            </div>
        </section>
    );
};


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
      <MainContentSection />
    </>
  )
}