// File: src/components/FeaturedThreadsSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import ThreadCard from './ThreadCard';

// Mock data for featured threads, kept separate for the homepage
const featuredThreads = [
    {
        id: 4,
        title: "Tips & Trik Konsultasi Metodologi Penelitian yang Efektif",
        author: "Prof. Rina Puspita",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704b",
        category: "Konsultasi",
        replies: 21,
        views: 450,
        lastReply: { author: "Dr. Amanda L.", time: "3 hari lalu" },
        tags: ["metodologi", "konsultasi", "tips"]
    },
    {
        id: 1,
        title: "Rekomendasi Jasa Proofreading untuk Jurnal Internasional Q1?",
        author: "Dr. Anisa Wulandari",
        authorAvatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        category: "Publikasi",
        replies: 12,
        views: 145,
        lastReply: { author: "Prof. Rahmat H.", time: "2 jam lalu" },
        tags: ["proofreading", "editing", "q1-journal"]
    },
];

/**
 * A section to display featured discussion threads on the homepage.
 */
const FeaturedThreadsSection = () => {
    return (
        <section id="featured-threads" className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800 inline-flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-blue-500"/>
                        Diskusi Populer
                    </h2>
                    <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
                        Lihat apa yang sedang dibicarakan oleh para peneliti di komunitas RDI.
                    </p>
                </div>
                <div className="max-w-4xl mx-auto space-y-4">
                    {featuredThreads.map(thread => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))}
                </div>
                <div className="mt-12 text-center">
                    <Link to="/thread" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-md border border-gray-300 hover:bg-gray-100 hover:border-gray-400 transition-all duration-200">
                        Lihat Semua Diskusi
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedThreadsSection;
