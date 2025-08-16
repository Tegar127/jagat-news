// File: src/pages/EventPage.jsx
import React from 'react';
import EventCard from './EventCard'; // Assumes EventCard is in src/components

// A more comprehensive list of events for the dedicated events page.
const allEvents = [
    { id: 1, title: "Konferensi Internasional AI & Human-Centered Design", date: "25-27 JUL 2025", location: "Bali Nusa Dua Convention Center", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb_Nbp63pi86L-IsNlqhvo4z0oND8D0P6oeQ&s" },
    { id: 2, title: "Webinar: Teknik Penulisan Proposal Hibah Riset", date: "15 AUG 2025", location: "Online (Zoom)", imageUrl: "https://ubharajaya.ac.id/wp-content/uploads/2024/04/Ilustrasi-Penulisan-Jurnal-Pixabay.jpg" },
    { id: 3, title: "Workshop Analisis Data Kuantitatif dengan R", date: "05 SEP 2025", location: "Universitas Gadjah Mada, Yogyakarta", imageUrl: "https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/GX1S6WQETYfXDNTaipg2" },
    { id: 4, title: "Pameran Inovasi & Teknologi Kesehatan 2025", date: "12-14 OKT 2025", location: "Jakarta Convention Center", imageUrl: "https://image.popmama.com/content-images/post/20241229/wearable%20tech-QRvcsjJYvEn4XV83q1LbLtFMe3mul2fV.jpg" },
    { id: 5, title: "Simposium Nasional Kimia Material", date: "18 NOV 2025", location: "Institut Teknologi Bandung", imageUrl: "https://www.pinhome.id/blog/wp-content/uploads/2019/11/pengertian-bahan-kimia.jpg?w=256&fm=avif" },
    { id: 6, title: "Seminar Daring: Masa Depan Energi Terbarukan", date: "22 NOV 2025", location: "Online (Google Meet)", imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFml5mM0IJvuMuP30WmLPo7mVd1pejWI65Q&s" },
    { id: 7, title: "Call for Papers: Jurnal Studi Ekonomi Kerakyatan", date: "Batas Akhir: 30 NOV 2025", location: "Submission Online", imageUrl: "https://ekonomi.uma.ac.id/wp-content/uploads/2023/06/Pertumbuhan-Ekonomi-Indonesia-1.jpg" },
    { id: 8, title: "Pelatihan Penulisan Artikel Ilmiah Populer", date: "02 DES 2025", location: "Online (Zoom)", imageUrl: "https://unair.ac.id/wp-content/uploads/2021/09/21.-Penulisan-Artikel-Ilmiah-Populer-Mudah-dan-Menyenangkan-1024x576.jpeg" },
];

/**
 * A dedicated page to display a list of all scientific events with filter controls.
 */
const EventPage = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-800 mb-4">Event</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Tetap terupdate dengan berbagai konferensi, seminar, workshop, dan acara ilmiah lainnya dari seluruh Indonesia.
                    </p>
                </div>

                {/* Filter and Search Section */}
                <div className="mb-12 p-6 bg-white rounded-xl shadow-md border border-gray-200/80">
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-end">
                         <div className="col-span-1 md:col-span-3 lg:col-span-2">
                             <label htmlFor="search-event" className="block text-sm font-medium text-gray-700 mb-1">Cari Acara</label>
                            <input type="text" id="search-event" placeholder="Ketik nama acara atau topik..." className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
                        </div>
                        <div>
                            <label htmlFor="event-type" className="block text-sm font-medium text-gray-700 mb-1">Tipe Acara</label>
                            <select id="event-type" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                                <option>Semua</option>
                                <option>Konferensi</option>
                                <option>Webinar</option>
                                <option>Workshop</option>
                                <option>Pameran</option>
                            </select>
                        </div>
                        <button className="bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors w-full">
                            Cari
                        </button>
                    </div>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {allEvents.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventPage;
