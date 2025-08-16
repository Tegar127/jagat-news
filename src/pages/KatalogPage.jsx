import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Rocket, Beaker, ChevronRight, Zap, User } from 'lucide-react';

export const katalogData = {
  siapHilirisasi: [
    {
      id: 1,
      title: 'Platform Edu-Tech Cerdas',
      description: 'Sebuah platform pembelajaran online berbasis AI yang mempersonalisasi kurikulum untuk setiap siswa.',
      imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Dr. Arini Dewi, M.Sc.',
        avatarUrl: 'https://i.pravatar.cc/150?u=arini'
      },
      universitas: 'Universitas Teknologi Sentosa',
      tags: ['AI', 'Pendidikan', 'SaaS', 'Web Platform'],
      detailDeskripsi: `Platform Edu-Tech Cerdas adalah solusi revolusioner dalam dunia pendidikan digital. Menggunakan algoritma Machine Learning terkini, platform ini mampu menganalisis gaya belajar, kecepatan pemahaman, dan area kelemahan setiap siswa secara individual. Hasil analisis digunakan untuk menyusun jalur pembelajaran yang adaptif, merekomendasikan materi yang relevan (video, teks, kuis interaktif), dan memberikan umpan balik secara real-time. Tujuannya adalah untuk meningkatkan efektivitas belajar, menumbuhkan minat, dan memastikan tidak ada siswa yang tertinggal. Proyek ini telah melalui serangkaian uji coba di beberapa sekolah mitra dengan hasil peningkatan nilai rata-rata siswa sebesar 25%. Kami mencari mitra industri untuk komersialisasi dan distribusi skala nasional.`
    },
    {
      id: 2,
      title: 'Sistem Manajemen Limbah Otomatis',
      description: 'Solusi IoT untuk memonitor dan mengelola pembuangan limbah di perkotaan secara efisien.',
      imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Prof. Budi Santoso, Ph.D.',
        avatarUrl: 'https://i.pravatar.cc/150?u=budi'
      },
      universitas: 'Institut Sains Terapan',
      tags: ['IoT', 'Smart City', 'Lingkungan', 'Hardware'],
      detailDeskripsi: `Sistem Manajemen Limbah Otomatis ini menggunakan jaringan sensor ultrasonik yang ditempatkan di dalam tempat sampah publik untuk memonitor tingkat keterisian secara real-time. Data dikirim ke platform pusat yang kemudian mengoptimalkan rute pengambilan sampah, mengurangi biaya operasional hingga 40% dan menekan jejak karbon. Sistem ini juga dilengkapi dasbor analitik untuk perencanaan kota jangka panjang. Telah diimplementasikan dalam skala pilot di satu kecamatan dan terbukti efektif. Kami mencari kemitraan dengan pemerintah daerah dan perusahaan pengelola limbah.`
    },
    {
      id: 3,
      title: 'Aplikasi Kesehatan Mental "Tenang"',
      description: 'Aplikasi mobile yang menyediakan meditasi terpandu dan konsultasi dengan psikolog profesional.',
      imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Rina Fauziah, S.Psi., M.Psi.',
        avatarUrl: 'https://i.pravatar.cc/150?u=rina'
      },
      universitas: 'Universitas Digital Kreatif',
      tags: ['Kesehatan', 'Mobile App', 'Telemedicine'],
      detailDeskripsi: `Aplikasi "Tenang" dirancang untuk menjadi teman digital bagi kesehatan mental pengguna. Fitur utamanya meliputi sesi meditasi terpandu yang dikategorikan berdasarkan kebutuhan (stres, kecemasan, fokus), jurnal harian dengan analisis sentimen, dan fitur booking untuk konsultasi online dengan psikolog berlisensi. Model bisnis kami adalah freemium, dengan konten dasar gratis dan fitur premium berbayar. Aplikasi ini siap diluncurkan di App Store dan Play Store, mencari pendanaan untuk pemasaran dan akuisisi pengguna.`
    },
    {
      id: 7,
      title: 'Marketplace Logistik B2B "KirimCepat"',
      description: 'Platform digital yang menghubungkan pemilik bisnis dengan penyedia jasa logistik terverifikasi.',
      imageUrl: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Dr. Hendra Wijaya, M.T.',
        avatarUrl: 'https://i.pravatar.cc/150?u=hendra'
      },
      universitas: 'Universitas Logistik Indonesia',
      tags: ['Logistik', 'B2B', 'Marketplace', 'Fintech'],
      detailDeskripsi: `KirimCepat adalah platform B2B yang mengatasi inefisiensi dalam industri logistik. UKM dan korporasi dapat memposting kebutuhan pengiriman mereka, dan platform akan mencocokkannya dengan penyedia logistik (truk, kargo, dll.) yang memiliki rute dan kapasitas yang sesuai. Fitur utamanya termasuk pelacakan real-time, penawaran harga kompetitif, dan sistem pembayaran terintegrasi yang aman. Platform ini sudah beroperasi dengan lebih dari 50 mitra logistik dan 200 UKM. Kami mencari investasi untuk ekspansi ke wilayah baru dan pengembangan fitur asuransi pengiriman.`
    },
    {
      id: 8,
      title: 'Software Agrikultur Pintar "PanenMax"',
      description: 'Perangkat lunak untuk petani modern yang memberikan rekomendasi pemupukan dan irigasi berbasis data satelit.',
      imageUrl: 'https://images.unsplash.com/photo-1492496913980-501348b61469?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Siti Rahma, S.Kom.',
        avatarUrl: 'https://i.pravatar.cc/150?u=siti'
      },
      universitas: 'Akademi Agrikultur Nusantara',
      tags: ['Agritech', 'SaaS', 'Pertanian', 'Data Science'],
      detailDeskripsi: `PanenMax adalah aplikasi berbasis web dan mobile yang mengolah data citra satelit dan cuaca untuk memberikan rekomendasi presisi kepada petani. Aplikasi ini dapat menyarankan jadwal tanam, jumlah pupuk yang optimal, dan kebutuhan irigasi, sehingga mengurangi tebakan dan meningkatkan efisiensi. Fitur unggulan adalah deteksi dini serangan hama berdasarkan perubahan warna pada citra satelit. Telah diuji coba oleh kelompok tani di Jawa Barat dengan peningkatan hasil panen rata-rata 15-20%.`
    },
    {
      id: 9,
      title: 'Platform Booking Wisata Lokal "Jelajah"',
      description: 'Aplikasi untuk menemukan dan memesan paket wisata unik yang dikelola oleh masyarakat lokal.',
      imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Dian Paramita, S.Par., M.M.',
        avatarUrl: 'https://i.pravatar.cc/150?u=dian'
      },
      universitas: 'Sekolah Tinggi Pariwisata',
      tags: ['Pariwisata', 'Mobile App', 'Ekonomi Kreatif'],
      detailDeskripsi: `Platform "Jelajah" menghubungkan wisatawan yang mencari pengalaman otentik dengan penyedia jasa wisata lokal (homestay, pemandu lokal, kursus kerajinan). Tujuannya adalah untuk memberdayakan ekonomi masyarakat desa dan mempromosikan pariwisata yang berkelanjutan. Platform ini menyediakan sistem pemesanan, pembayaran, dan ulasan yang terpercaya. Saat ini telah bekerja sama dengan 30 desa wisata di seluruh Indonesia dan siap untuk ekspansi lebih lanjut.`
    }
  ],
  tahapAkhir: [
    {
      id: 4,
      title: 'Drone Pertanian Presisi',
      description: 'Pengembangan drone untuk pemupukan dan penyemprotan pestisida yang lebih akurat dan hemat biaya.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Irfan Maulana, S.T., M.Eng.',
        avatarUrl: 'https://i.pravatar.cc/150?u=irfan'
      },
      universitas: 'Politeknik Rekayasa Industri',
      tags: ['Agritech', 'Drone', 'Hardware', 'AI'],
      detailDeskripsi: `Drone ini dilengkapi dengan sensor multispektral untuk menganalisis kesehatan tanaman dari udara. Data yang ditangkap diolah oleh AI untuk membuat peta pemupukan variabel, memastikan setiap area lahan menerima nutrisi sesuai kebutuhan. Hal ini dapat menghemat penggunaan pupuk hingga 30% dan meningkatkan hasil panen. Prototipe telah berhasil diuji di lahan seluas 10 hektar. Saat ini kami sedang dalam tahap validasi akhir dan optimasi daya tahan baterai. Mencari mitra manufaktur dan investor untuk produksi massal.`
    },
    {
      id: 10,
      title: 'Wearable Device Pemantau Kesehatan',
      description: 'Gelang pintar yang sedang dalam tahap validasi klinis untuk memantau detak jantung dan kadar oksigen.',
      imageUrl: 'https://iblu-academy.co.id/wp-content/uploads/2024/06/luke-chesser-rCOWMC8qf8A-unsplash-scaled-e1737355426466.jpg',
       peneliti: {
        nama: 'Prof. Dr. Nita Amelia, Apt.',
        avatarUrl: 'https://i.pravatar.cc/150?u=nita'
      },
      universitas: 'Universitas Medika Bangsa',
      tags: ['Medtech', 'Wearable', 'IoT', 'Kesehatan'],
      detailDeskripsi: `Perangkat wearable ini tidak hanya memantau detak jantung dan SpO2, tetapi juga dilengkapi sensor EKG (Elektrokardiogram) untuk deteksi dini aritmia. Data dapat disinkronkan secara real-time ke aplikasi mobile dan dapat dibagikan dengan dokter. Kami sedang menyelesaikan tahap validasi klinis bekerja sama dengan rumah sakit universitas untuk mendapatkan akurasi setara alat medis. Mencari mitra untuk proses sertifikasi alat kesehatan dan komersialisasi.`
    },
    {
      id: 11,
      title: 'Sistem Deteksi Kebocoran Pipa Gas',
      description: 'Pengujian sensor akustik dan AI untuk mendeteksi kebocoran pipa gas secara real-time di area industri.',
      imageUrl: 'https://www.bromindo.com/wp-content/uploads/2019/12/deteksi-kebocoran-bahan-bakar_00a.jpg',
      peneliti: {
        nama: 'Dr. Eng. Agus Riyadi',
        avatarUrl: 'https://i.pravatar.cc/150?u=agus'
      },
      universitas: 'Institut Sains & Teknologi Pertahanan',
      tags: ['Industri 4.0', 'Safety', 'Sensor', 'AI'],
      detailDeskripsi: `Sistem ini menggunakan jaringan sensor akustik yang sangat sensitif untuk "mendengarkan" anomali suara frekuensi tinggi yang dihasilkan oleh kebocoran gas pada pipa bertekanan. Algoritma AI kemudian menganalisis pola suara untuk membedakan antara kebocoran nyata dan kebisingan industri, sehingga mengurangi alarm palsu. Sistem sedang dalam pengujian lapangan di sebuah fasilitas industri dan menunjukkan hasil yang menjanjikan dalam mendeteksi kebocoran kecil sekalipun.`
    },
    {
      id: 12,
      title: 'Material Kemasan Ramah Lingkungan',
      description: 'Finalisasi formula bioplastik dari limbah singkong yang siap untuk diuji coba oleh mitra industri.',
      imageUrl: 'https://cdn.linkumkm.id/uploads/library/8/5/2/8/9/85289_840x576.jpg',
      peneliti: {
        nama: 'Dr. Lestari Handayani, M.Si.',
        avatarUrl: 'https://i.pravatar.cc/150?u=lestari'
      },
      universitas: 'Universitas Material Inovatif',
      tags: ['Material', 'Green Tech', 'Lingkungan', 'Riset'],
      detailDeskripsi: `Kami telah berhasil mengembangkan formula bioplastik dari pati limbah singkong yang memiliki kekuatan dan fleksibilitas yang sebanding dengan plastik konvensional (LDPE). Material ini dapat terurai secara alami dalam waktu 6-12 bulan. Saat ini kami sedang dalam tahap finalisasi formula untuk meningkatkan ketahanan terhadap air dan panas. Siap untuk diuji coba oleh mitra industri makanan dan minuman sebagai kemasan primer.`
    },
    {
      id: 13,
      title: 'Chatbot Pelayanan Publik Cerdas',
      description: 'Pengembangan akhir dan pengujian beta chatbot untuk membantu warga mengakses informasi dari pemerintah daerah.',
      imageUrl: 'https://www.puskomedia.id/blog/wp-content/uploads/2024/06/chatbot-cerdas-tingkatkan-pengalaman-pesan-dan-pelayanan-pelanggan-di-industri-restoran.jpg',
      peneliti: {
        nama: 'Faisal Akbar, S.Kom., M.Cs.',
        avatarUrl: 'https://i.pravatar.cc/150?u=faisal'
      },
      universitas: 'Universitas Pelita Bangsa',
      tags: ['GovTech', 'Chatbot', 'AI', 'Pelayanan Publik'],
      detailDeskripsi: `Chatbot ini dirancang untuk diintegrasikan dengan situs web pemerintah daerah atau aplikasi perpesanan seperti WhatsApp. Menggunakan teknologi NLP, chatbot dapat memahami dan menjawab pertanyaan umum warga seputar perizinan, pajak daerah, dan jadwal layanan publik. Hal ini bertujuan mengurangi antrian di kantor layanan dan memberikan informasi 24/7. Saat ini sedang dalam tahap pengujian beta tertutup dengan beberapa dinas untuk menyempurnakan basis pengetahuan.`
    },
    {
      id: 14,
      title: 'Alat Diagnostik Malaria Cepat',
      description: 'Uji coba lapangan perangkat portabel yang dapat mendeteksi malaria dari sampel darah dalam hitungan menit.',
      imageUrl: 'https://mysiloam-api.siloamhospitals.com/storage-down/file-web-cms/17173382485142336.webp',
      peneliti: {
        nama: 'Prof. Dr. dr. Sutrisno, Sp.PK.',
        avatarUrl: 'https://i.pravatar.cc/150?u=sutrisno'
      },
      universitas: 'Pusat Studi Medis Lanjutan',
      tags: ['Medtech', 'Diagnostik', 'Kesehatan', 'Hardware'],
      detailDeskripsi: `Perangkat portabel ini menggunakan metode "lab-on-a-chip" yang hanya memerlukan satu tetes darah. Sampel darah dicampur dengan reagen khusus di dalam sebuah microchip, dan hasilnya dibaca oleh sensor optik terintegrasi. Perangkat dapat mendeteksi keberadaan parasit malaria dalam waktu kurang dari 5 menit, jauh lebih cepat dari metode mikroskopis konvensional. Sedang menjalani uji coba lapangan di daerah endemis untuk memastikan akurasi dan keandalannya di kondisi nyata.`
    }
  ],
  tahapAwal: [
    {
      id: 5,
      title: 'Konsep Baterai Grafena',
      description: 'Riset fundamental untuk menciptakan baterai dengan kapasitas lebih besar dan waktu pengisian super cepat.',
      imageUrl: 'https://img.baba-blog.com/2024/02/graphene-battery-concept-framed-with-atomic-cells-hexagon-connection.jpg?x-oss-process=style%2Ffull',
      peneliti: {
        nama: 'Dr. Surya Pratama, M.Si.',
        avatarUrl: 'https://i.pravatar.cc/150?u=surya'
      },
      universitas: 'Institut Teknologi Nasional',
      tags: ['Riset', 'Material', 'Energi', 'Hardware'],
      detailDeskripsi: `Penelitian ini berfokus pada sintesis anoda berbasis grafena untuk baterai Lithium-ion. Sifat konduktivitas dan luas permukaan grafena yang superior secara teoritis dapat meningkatkan kapasitas penyimpanan energi sebesar 50% dan mengurangi waktu pengisian hingga 80% dibandingkan baterai konvensional. Saat ini, kami berada pada tahap fabrikasi skala lab dan pengujian sel baterai prototipe. Riset ini memiliki potensi besar untuk industri kendaraan listrik dan perangkat mobile. Kami terbuka untuk kolaborasi riset lanjutan dengan mitra industri.`
    },
    {
      id: 6,
      title: 'Robot Humanoid Asisten Rumah Tangga',
      description: 'Riset awal pengembangan robot cerdas yang dapat membantu pekerjaan domestik sehari-hari.',
      imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80',
      peneliti: {
        nama: 'Dr. Eng. Rahmat Hidayat',
        avatarUrl: 'https://i.pravatar.cc/150?u=rahmat'
      },
      universitas: 'Universitas Robotika Indonesia',
      tags: ['Robotika', 'AI', 'Riset', 'Hardware'],
      detailDeskripsi: `Riset ini bertujuan untuk membangun kerangka kerja perangkat lunak dan perangkat keras untuk robot humanoid yang mampu melakukan tugas-tugas dasar rumah tangga, seperti mengambil barang dan membersihkan permukaan. Fokus utama tahap awal ini adalah pada pengembangan sistem navigasi (SLAM) di dalam ruangan dan pengenalan objek menggunakan kamera 3D. Ini adalah proyek jangka panjang yang ambisius untuk masa depan otomasi domestik.`
    },
    {
      id: 15,
      title: 'AI Komposer Musik Klasik',
      description: 'Eksplorasi penggunaan Generative Adversarial Networks (GANs) untuk menciptakan komposisi musik baru.',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5A3iTqlUVjI-hbHA7w9oN5TWJT7Sh9THc_A&s',
      peneliti: {
        nama: 'Eka Kurniawan, S.Sn., M.Kom.',
        avatarUrl: 'https://i.pravatar.cc/150?u=eka'
      },
      universitas: 'Akademi Seni Digital',
      tags: ['AI', 'Kesenian', 'Musik', 'Riset'],
      detailDeskripsi: `Proyek ini menggunakan model AI generatif, khususnya Generative Adversarial Networks (GANs), yang dilatih dengan ribuan komposisi musik dari era Barok dan Klasik. Tujuannya adalah agar AI dapat 'belajar' pola, harmoni, dan struktur musik dari para maestro, lalu menghasilkan komposisi baru yang orisinal namun tetap memiliki gaya yang khas. Saat ini kami sedang melakukan riset pada arsitektur model untuk menghasilkan musik yang lebih koheren dan kompleks.`
    },
    {
      id: 16,
      title: 'Studi Material Penyerap Karbon',
      description: 'Penelitian material baru berbasis zeolit sintetis untuk menyerap CO2 langsung dari atmosfer.',
      imageUrl: 'https://statik.tempo.co/data/2025/05/19/id_1399813/1399813_720.jpg',
      peneliti: {
        nama: 'Prof. Dr. Iwan Setiawan, M.Sc.',
        avatarUrl: 'https://i.pravatar.cc/150?u=iwan'
      },
      universitas: 'Institut Teknologi Hijau',
      tags: ['Green Tech', 'Kimia', 'Lingkungan', 'Riset'],
      detailDeskripsi: `Riset ini berfokus pada modifikasi zeolit sintetis untuk meningkatkan kapasitas dan selektivitas penyerapan (adsorpsi) gas CO2 langsung dari udara (Direct Air Capture). Kami sedang mempelajari pengaruh penambahan gugus fungsi amino pada struktur zeolit. Jika berhasil, material ini dapat menjadi kunci untuk teknologi penangkapan karbon yang lebih efisien dan murah. Tahap saat ini adalah sintesis material dan karakterisasi menggunakan analisis XRD dan FTIR.`
    },
    {
      id: 17,
      title: 'Jaringan Komunikasi Kuantum',
      description: 'Riset teoritis mengenai protokol dan keamanan untuk membangun jaringan komunikasi berbasis kuantum.',
      imageUrl: 'https://i.cdn.newsbytesapp.com/ind/images/l1820230329122959.png',
      peneliti: {
        nama: 'Dr. Fis. Yudi Hermanto',
        avatarUrl: 'https://i.pravatar.cc/150?u=yudi'
      },
      universitas: 'Universitas Komputasi Kuantum',
      tags: ['Fisika Kuantum', 'Keamanan Siber', 'Riset Teoritis'],
      detailDeskripsi: `Ini adalah penelitian teoritis yang mendalami protokol Quantum Key Distribution (QKD) untuk menciptakan jaringan komunikasi yang secara fundamental tidak dapat diretas. Kami sedang menganalisis dan memodelkan berbagai skema QKD, seperti BB84 dan E91, untuk dinilai ketahanannya terhadap potensi serangan. Tujuan riset ini adalah untuk membangun fondasi teoritis yang kuat sebelum melangkah ke pengembangan perangkat keras eksperimental di masa depan.`
    },
    {
      id: 18,
      title: 'Konsep Pencetakan Organ 3D',
      description: 'Pengembangan awal bio-ink dan teknik pencetakan 3D untuk potensi fabrikasi jaringan organ sederhana.',
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/Soft_Total_Artificial_Heart.jpg',
      peneliti: {
        nama: 'Dr. Citra Lestari, M.Biomed.',
        avatarUrl: 'https://i.pravatar.cc/150?u=citra'
      },
      universitas: 'Institut Kedokteran Regeneratif',
      tags: ['Biotech', 'Riset', 'Kesehatan', '3D Printing'],
      detailDeskripsi: `Proyek ini mengeksplorasi pengembangan hydrogel (bio-ink) yang kompatibel dengan sel hidup manusia (stem cell) untuk digunakan dalam bioprinter 3D. Tujuan jangka panjangnya adalah mencetak jaringan fungsional seperti kulit atau tulang rawan untuk keperluan transplantasi. Tahap awal ini berfokus pada optimalisasi formula bio-ink agar dapat mempertahankan viabilitas sel selama dan setelah proses pencetakan. Ini adalah riset dasar yang fundamental untuk masa depan kedokteran regeneratif. Mencari dana hibah penelitian dan kolaborator dari bidang kedokteran.`
    }
  ]
};


// Detail kategori
export const categoryDetails = {
  siapHilirisasi: {
    title: 'Siap Hilirisasi',
    icon: <Sparkles className="w-5 h-5" />,
    description: "Inovasi matang yang telah teruji dan siap diluncurkan ke pasar.",
    badgeColor: "bg-green-100 text-green-800",
  },
  tahapAkhir: {
    title: 'Tahap Akhir Pengembangan',
    icon: <Rocket className="w-5 h-5" />,
    description: "Proyek dalam tahap finalisasi, pengujian skala luas, dan validasi akhir.",
    badgeColor: "bg-indigo-100 text-indigo-800",
  },
  tahapAwal: {
    title: 'Tahap Awal Pengembangan',
    icon: <Beaker className="w-5 h-5" />,
    description: "Ide dan riset inovatif yang menjadi fondasi untuk masa depan.",
    badgeColor: "bg-amber-100 text-amber-800",
  }
};


const ProjectCard = ({ item, badgeColor, categoryTitle }) => {
    const penelitiId = item.peneliti.nama.toLowerCase().replace(/\s+/g, '-');
    return (
        <div className="bg-white rounded-2xl overflow-hidden group transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-indigo-500 flex flex-col">
            <div className="overflow-hidden">
                <img
                    className="w-full h-52 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    src={item.imageUrl}
                    alt={item.title}
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <div className="flex-grow">
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${badgeColor}`}>
                        {categoryTitle}
                    </span>
                    <h3 className="text-xl font-bold text-zinc-800 mb-2">{item.title}</h3>
                    <p className="text-zinc-600 text-sm leading-relaxed mb-4">{item.description}</p>
                </div>
                <div className="mt-auto pt-4 border-t border-zinc-100">
                    <div className="flex items-center text-sm text-zinc-600 mb-4">
                        <img src={item.peneliti.avatarUrl} alt={item.peneliti.nama} className="w-8 h-8 rounded-full mr-3 border-2 border-white shadow" />
                        <Link to={`/peneliti/${penelitiId}`} className="font-medium hover:text-indigo-600 transition-colors">
                            {item.peneliti.nama}
                        </Link>
                    </div>
                    <Link
                        to={`/proyek/${item.id}`}
                        className="inline-flex items-center font-bold text-indigo-600 group-hover:text-indigo-500 transition-colors duration-300">
                        Lihat Detail Proyek
                        <ChevronRight className="ml-1.5 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// Komponen Utama Halaman
export default function KatalogPage() {
    const [activeCategory, setActiveCategory] = useState('siapHilirisasi');

    const activeItems = katalogData[activeCategory];
    const activeDetails = categoryDetails[activeCategory];

    return (
        <div className="bg-zinc-50 font-sans">
            {/* Hero Section */}
            <div className="text-center pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-b from-white to-zinc-50 border-b border-zinc-200">
                <div className="container mx-auto px-6">
                    <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 font-semibold px-4 py-2 rounded-full text-sm mb-6">
                        <Zap className="w-5 h-5" />
                        Pusat Inovasi Digital
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-zinc-900 tracking-tight">
                        Katalog Inovasi & Proyek
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-xl text-zinc-600 leading-9">
                        Jelajahi proyek-proyek potensial kami. Temukan peluang investasi dan kolaborasi berikutnya untuk mendorong kemajuan teknologi.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <main className="container mx-auto px-6 py-16 md:py-20">

                {/* === BAGIAN YANG DIPERBARUI === */}
                <div className="mb-12 flex justify-center">

                    <div className="w-full max-w-2xl p-2 rounded-xl bg-zinc-200/70">
                        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
                            {Object.keys(categoryDetails).map((key) => {
                                const details = categoryDetails[key];
                                const isActive = activeCategory === key;
                                return (
                                    <button
                                        key={key}
                                        onClick={() => setActiveCategory(key)}
                                        className={`w-full flex items-center justify-center font-semibold px-4 md:px-6 py-3 rounded-lg transition-all duration-300 ease-in-out text-sm md:text-base ${isActive
                                            ? 'bg-white text-indigo-600 shadow'
                                            : 'text-zinc-600 hover:bg-white/60'
                                            }`}
                                    >
                                        {details.icon}
                                        <span className="ml-2">{details.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                {/* === AKHIR BAGIAN YANG DIPERBARUI === */}


                {/* Grid Proyek yang Difilter */}
                <section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-zinc-800">{activeDetails.title}</h2>
                        <p className="text-zinc-600 mt-2 text-lg max-w-2xl mx-auto">{activeDetails.description}</p>
                    </div>

                    {activeItems && activeItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                            {activeItems.map(item => (
                                <ProjectCard key={item.id} item={item} badgeColor={activeDetails.badgeColor} categoryTitle={activeDetails.title} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 px-6 bg-white rounded-2xl border-2 border-dashed border-zinc-200">
                            <p className="text-2xl font-bold text-zinc-700 mb-2">Segera Hadir</p>
                            <p className="text-zinc-500 text-lg">Belum ada proyek yang tersedia dalam kategori ini.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}