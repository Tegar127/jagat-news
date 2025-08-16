import React, { useEffect } from 'react';
import { Lightbulb, Users, Handshake, ShieldCheck, TrendingUp, Sparkles, Target, Eye, Gem, Award, Puzzle, Briefcase, Smile, ChevronRight } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Data Mock untuk bagian About Us (Diperkaya)
const aboutContent = {
    hero: {
        tagline: "Meningkatkan Inovasi Riset di Indonesia",
        title: "Platform Terdepan untuk Kolaborasi dan Publikasi Ilmiah.",
        description: "Kami hadir untuk mendefinisikan ulang cara penelitian dilakukan di Indonesia, dengan menghubungkan pikiran-pikiran cerdas dan memfasilitasi penemuan-penemuan transformatif.",
        buttonText: "Mulai Jelajahi",
        buttonLink: "/login"
    },
    ourStory: {
        heading: "Siapa Kami",
        title: "Kisah di Balik Portal RDI: Membangun Jembatan Pengetahuan.",
        paragraphs: [
            "Portal Riset dan Pengembangan Inovasi (RDI) lahir dari visi untuk mengatasi fragmentasi informasi dan sumber daya di ekosistem riset Indonesia. Kami memahami tantangan yang dihadapi peneliti dalam menemukan data, kolaborator, dan pendanaan yang relevan.",
            "Dengan memanfaatkan teknologi terkini, kami menciptakan platform terintegrasi yang tidak hanya mempermudah akses ke jurnal-jurnal terkemuka dan data penelitian, tetapi juga mendorong interaksi aktif antar para ahli. Kami percaya bahwa kolaborasi adalah kunci untuk mempercepat kemajuan ilmiah dan inovasi yang berdampak positif bagi masyarakat.",
            "Sejak didirikan, kami terus berinovasi untuk menjadi katalis utama dalam transformasi lanskap riset nasional. Kami berdedikasi untuk mendukung setiap langkah perjalanan riset Anda, dari ide awal hingga publikasi dan implementasi."
        ],
        imageUrl: "https://placehold.co/800x500/60A5FA/FFFFFF?text=Our+Story+Image", // Ganti dengan gambar ilustrasi relevan
    },
    keyFigures: [ // Opsional: Contoh data angka kunci
        { value: "5.000+", label: "Jurnal Terindeks" },
        { value: "1.200+", label: "Peneliti Terdaftar" },
        { value: "250+", label: "Kolaborasi Aktif" },
        { value: "100%", label: "Dukungan Penuh" },
    ],
    values: [
        { icon: <Target className="w-8 h-8 text-blue-600" />, title: "Fokus pada Dampak", description: "Setiap inisiatif kami bertujuan untuk menciptakan dampak nyata bagi kemajuan riset dan masyarakat." },
        { icon: <Eye className="w-8 h-8 text-teal-600" />, title: "Transparansi & Aksesibilitas", description: "Kami menjamin kemudahan akses informasi dan proses yang terbuka bagi semua pengguna." },
        { icon: <Gem className="w-8 h-8 text-yellow-600" />, title: "Integritas Ilmiah", description: "Menjunjung tinggi standar etika dan kualitas tertinggi dalam setiap data dan publikasi." },
        { icon: <Award className="w-8 h-8 text-green-600" />, title: "Keunggulan Berkelanjutan", description: "Terus berinovasi dan meningkatkan layanan untuk menjadi yang terdepan." },
        { icon: <Puzzle className="w-8 h-8 text-indigo-600" />, title: "Sinergi Kolaboratif", description: "Mendorong kerja sama lintas disiplin untuk penemuan yang lebih besar." },
        { icon: <Briefcase className="w-8 h-8 text-red-600" />, title: "Profesionalisme", description: "Menyediakan layanan dengan standar profesionalisme dan dedikasi tinggi." },
    ],
    team: [
        { id: 1, name: "Dr. Citra Lestari", title: "Chief Executive Officer", imageUrl: "https://placehold.co/300x300/6366F1/FFFFFF?text=Citra" },
        { id: 2, name: "Prof. Ananta Wijaya", title: "Chief Technology Officer", imageUrl: "https://placehold.co/300x300/10B981/FFFFFF?text=Ananta" },
        { id: 3, name: "Dr. Bayu Prakoso", title: "Head of Research & Development", imageUrl: "https://placehold.co/300x300/F59E0B/FFFFFF?text=Bayu" },
        { id: 4, name: "Ms. Dina Rahmawati", title: "Community & Partnership Lead", imageUrl: "https://placehold.co/300x300/3B82F6/FFFFFF?text=Dina" },
    ],
    cta: {
        title: "Siap Berkontribusi pada Masa Depan Riset?",
        subtitle: "Bergabunglah dengan komunitas kami dan jadilah bagian dari perubahan besar dalam ekosistem riset Indonesia.",
        buttonText: "Daftar Sekarang",
        buttonLink: "/login"
    }
};

// Komponen Reusable untuk Judul Section (optional, for consistency)
const SectionHeader = ({ subTitle, title, aosDelay = 0 }) => (
    <div className="text-center mb-12">
        {subTitle && (
            <p
                className="text-blue-600 text-sm font-semibold uppercase mb-2"
                data-aos="fade-down"
                data-aos-duration="700"
                data-aos-delay={aosDelay}
                data-aos-once="true"
            >
                {subTitle}
            </p>
        )}
        <h2
            className="text-3xl md:text-4xl font-bold text-gray-800"
            data-aos="fade-down"
            data-aos-duration="700"
            data-aos-delay={aosDelay + 100}
            data-aos-once="true"
        >
            {title}
        </h2>
    </div>
);

// Komponen Card untuk Nilai
const ValueCard = ({ value, index }) => (
    <div
        className="bg-white rounded-xl p-6 text-center flex flex-col items-center border border-gray-200/80 transform hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-md"
        data-aos="fade-up"
        data-aos-delay={index * 120} // Staggered animation
        data-aos-duration="800"
        data-aos-once="true"
    >
        <div className="p-4 bg-blue-50 rounded-full mb-4 shadow-sm">
            {value.icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
        <p className="text-gray-600 text-center text-sm">{value.description}</p>
    </div>
);

// Komponen Card untuk Anggota Tim
const TeamMemberCard = ({ member, index }) => (
    <div
        className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-200/80 transform hover:scale-105 transition-all duration-300 flex flex-col items-center"
        data-aos="fade-up"
        data-aos-delay={index * 150} // Staggered animation
        data-aos-duration="800"
        data-aos-once="true"
    >
        <img
            src={member.imageUrl}
            alt={member.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-200 shadow-lg"
        />
        <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
        <p className="text-blue-600 text-md font-medium">{member.title}</p>
    </div>
);

export default function AboutPage() {
    useEffect(() => {
        if (!AOS.instance) {
             AOS.init({
                duration: 800,
                easing: 'ease-out',
                once: true,
                offset: 120,
            });
        }
        AOS.refresh();
    }, []);

    return (
        <div className="bg-gray-50 text-gray-800">
            {/* Hero Section - Minimalist & Impactful */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden">
                <div className="absolute inset-0 pattern-dots-md gray-800 opacity-20"></div> {/* Dot pattern similar to Inpart.io */}
                <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
                    <p
                        className="text-blue-200 text-lg md:text-xl font-semibold mb-3"
                        data-aos="fade-up" data-aos-duration="700" data-aos-delay="100"
                    >
                        {aboutContent.hero.tagline}
                    </p>
                    <h1
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
                        data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"
                    >
                        {aboutContent.hero.title}
                    </h1>
                    <p
                        className="text-lg opacity-90 max-w-2xl mx-auto mb-10"
                        data-aos="fade-up" data-aos-duration="900" data-aos-delay="300"
                    >
                        {aboutContent.hero.description}
                    </p>
                    <a
                        href={aboutContent.hero.buttonLink}
                        className="inline-flex items-center bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        data-aos="zoom-in" data-aos-duration="800" data-aos-delay="400"
                    >
                        {aboutContent.hero.buttonText}
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>

            {/* Our Story Section - Two Columns (Text + Image) */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <p
                                className="text-blue-600 text-sm font-semibold uppercase mb-2"
                                data-aos="fade-right" data-aos-duration="700" data-aos-once="true"
                            >
                                {aboutContent.ourStory.heading}
                            </p>
                            <h2
                                className="text-3xl md:text-4xl font-bold text-gray-800 mb-6"
                                data-aos="fade-right" data-aos-duration="800" data-aos-delay="100" data-aos-once="true"
                            >
                                {aboutContent.ourStory.title}
                            </h2>
                            {aboutContent.ourStory.paragraphs.map((paragraph, index) => (
                                <p
                                    key={index}
                                    className="text-lg text-gray-600 leading-relaxed mb-4"
                                    data-aos="fade-up" data-aos-duration="800" data-aos-delay={200 + index * 100} data-aos-once="true"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                        <div className="order-1 lg:order-2">
                            <img
                                src={aboutContent.ourStory.imageUrl}
                                alt="Our Story"
                                className="w-full h-auto rounded-xl shadow-xl border border-gray-200"
                                data-aos="fade-left" data-aos-duration="900" data-aos-delay="200" data-aos-once="true"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Figures Section (Optional - if you have stats) */}
            {aboutContent.keyFigures && aboutContent.keyFigures.length > 0 && (
                <section className="py-16 bg-blue-100/30">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2
                            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
                            data-aos="fade-down" data-aos-duration="800" data-aos-once="true"
                        >
                            Pencapaian Kami
                        </h2>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {aboutContent.keyFigures.map((figure, index) => (
                                <div
                                    key={index}
                                    className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-200/80"
                                    data-aos="zoom-in" data-aos-duration="700" data-aos-delay={index * 100} data-aos-once="true"
                                >
                                    <p className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-2">{figure.value}</p>
                                    <p className="text-lg text-gray-600">{figure.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Values Section - Grid of Cards */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4 max-w-6xl">
                    <SectionHeader subTitle="Pilar Utama" title="Nilai-Nilai Inti Kami" aosDelay={0} />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {aboutContent.values.map((value, index) => (
                            <ValueCard key={value.title} value={value} index={index} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section - Grid of Circular Images */}
            {aboutContent.team && aboutContent.team.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <SectionHeader subTitle="Orang-Orang di Balik Layar" title="Temui Tim Kami" aosDelay={0} />
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {aboutContent.team.map((member, index) => (
                                <TeamMemberCard key={member.id} member={member} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action Section - Solid Background */}
            <section className="py-20 bg-blue-700 text-white text-center">
                <div className="container mx-auto px-4 max-w-3xl">
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-4"
                        data-aos="fade-up" data-aos-duration="800" data-aos-delay="100"
                    >
                        {aboutContent.cta.title}
                    </h2>
                    <p
                        className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8"
                        data-aos="fade-up" data-aos-duration="800" data-aos-delay="200"
                    >
                        {aboutContent.cta.subtitle}
                    </p>
                    <a
                        href={aboutContent.cta.buttonLink}
                        className="inline-flex items-center bg-white text-blue-700 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                        data-aos="zoom-in" data-aos-duration="800" data-aos-delay="300"
                    >
                        {aboutContent.cta.buttonText}
                        <ChevronRight className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </section>
        </div>
    );
}