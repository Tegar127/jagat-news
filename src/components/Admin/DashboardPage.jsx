import React, { useState, useEffect } from 'react';
import StatsCard from '../../components/Admin/StatsCard';
import { Newspaper, Users, Tag, Eye } from 'lucide-react';
import { supabase } from '../../supabaseClient';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
    const [stats, setStats] = useState({
        totalBerita: 0,
        totalPengguna: 0,
        totalKategori: 0,
        totalPembaca: 0,
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Jalankan semua query secara paralel
                const [
                    beritaCount,
                    penggunaCount,
                    kategoriCount,
                    totalViews,
                    recentPosts
                ] = await Promise.all([
                    supabase.from('Post').select('*', { count: 'exact', head: true }),
                    supabase.from('User').select('*', { count: 'exact', head: true }),
                    supabase.from('Category').select('*', { count: 'exact', head: true }),
                    supabase.rpc('get_total_views'), // Panggil fungsi yang kita buat
                    supabase.from('Post').select('id, title, author:User(name), publishedAt').order('publishedAt', { ascending: false }).limit(5)
                ]);

                if (beritaCount.error) throw beritaCount.error;
                if (penggunaCount.error) throw penggunaCount.error;
                if (kategoriCount.error) throw kategoriCount.error;
                if (totalViews.error) throw totalViews.error;
                if (recentPosts.error) throw recentPosts.error;

                setStats({
                    totalBerita: beritaCount.count,
                    totalPengguna: penggunaCount.count,
                    totalKategori: kategoriCount.count,
                    totalPembaca: totalViews.data,
                });
                
                setRecentActivity(recentPosts.data);

            } catch (error) {
                console.error("Gagal mengambil data dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);
    
    // Fungsi untuk format angka besar (misal: 1200 menjadi 1.2K)
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num;
    };

    const statCards = [
        { icon: <Newspaper />, title: "Total Berita", value: stats.totalBerita },
        { icon: <Users />, title: "Total Pengguna", value: stats.totalPengguna },
        { icon: <Tag />, title: "Total Kategori", value: stats.totalKategori },
        { icon: <Eye />, title: "Total Pembaca", value: formatNumber(stats.totalPembaca) },
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold text-foreground mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    [...Array(4)].map((_, i) => <div key={i} className="bg-card h-28 rounded-xl animate-pulse"></div>)
                ) : (
                    statCards.map(stat => <StatsCard key={stat.title} {...stat} />)
                )}
            </div>

            <div className="mt-8 bg-card p-6 rounded-xl shadow-md border border-custom">
                <h2 className="text-xl font-bold text-card-foreground mb-4">Aktivitas Terkini</h2>
                {loading ? (
                    <p className="text-muted-foreground">Memuat aktivitas...</p>
                ) : (
                    <ul className="divide-y divide-custom">
                        {recentActivity.length > 0 ? (
                            recentActivity.map(post => (
                                <li key={post.id} className="py-3 flex justify-between items-center">
                                    <div>
                                        <Link to={`/berita/${post.id}`} className="font-semibold text-card-foreground hover:text-blue-500">{post.title}</Link>
                                        <p className="text-sm text-muted-foreground">
                                            oleh {post.author?.name || 'Admin'} - {new Date(post.publishedAt).toLocaleDateString('id-ID', {day: 'numeric', month: 'long'})}
                                        </p>
                                    </div>
                                    <Link to={`/admin/berita`} className="text-sm font-semibold text-blue-500 hover:underline">
                                        Kelola
                                    </Link>
                                </li>
                            ))
                        ) : (
                            <p className="text-muted-foreground">Belum ada aktivitas.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;