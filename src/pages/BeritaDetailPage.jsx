import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { User, Calendar, ArrowLeft, ChevronLeft, ChevronRight, MessageSquare, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

const InfoTag = ({ icon, text }) => (
    <div className="flex items-center text-sm text-muted-foreground">
        {icon}
        <span className="ml-2">{text}</span>
    </div>
);

const ImageGallery = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    if (!images || images.length === 0) {
        return <img src="https://placehold.co/800x450" alt="Placeholder" className="w-full h-auto md:h-[450px] object-cover" />;
    }
    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    return (
        <div className="relative w-full h-auto md:h-[450px] overflow-hidden bg-gray-200">
            <img src={images[currentIndex].url} alt={`Gambar berita ${currentIndex + 1}`} className="w-full h-full object-cover transition-transform duration-500" />
            {images.length > 1 && (
                <>
                    <button onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none"><ChevronLeft size={24} /></button>
                    <button onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/75 transition-colors focus:outline-none"><ChevronRight size={24} /></button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {images.map((_, index) => (
                            <div key={index} className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const CommentForm = ({ postId, onCommentPosted }) => {
    const { user } = useAuth();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (content.trim() === '') return;
        setLoading(true);
        try {
            const { error } = await supabase.from('Comment').insert({ content: content, postId: postId, userId: user.id });
            if (error) throw error;
            setContent('');
            onCommentPosted();
        } catch (error) {
            console.error("Gagal mengirim komentar:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mt-6">
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tulis komentar Anda..."
                className="w-full p-3 border border-custom rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
            />
            <button type="submit" disabled={loading} className="mt-2 bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300">
                {loading ? 'Mengirim...' : 'Kirim Komentar'}
            </button>
        </form>
    );
};

const CommentList = ({ comments, fetchComments }) => {
    const { user } = useAuth();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    const handleUpdate = async (commentId) => {
        if (editedContent.trim() === '') return;
        try {
            const { error } = await supabase
                .from('Comment')
                .update({ content: editedContent })
                .eq('id', commentId);
            if (error) throw error;
            setEditingCommentId(null);
            fetchComments();
        } catch (error) {
            console.error("Gagal memperbarui komentar:", error);
        }
    };
    
    const handleDelete = async (commentId) => {
        if(window.confirm('Anda yakin ingin menghapus komentar ini?')) {
            try {
                const { error } = await supabase
                    .from('Comment')
                    .delete()
                    .eq('id', commentId);
                if (error) throw error;
                fetchComments();
            } catch (error) {
                console.error("Gagal menghapus komentar:", error);
            }
        }
    };

    return (
        <div className="space-y-6">
            {comments.map(comment => (
                <div key={comment.id} className="flex items-start space-x-4">
                    <img src={comment.User?.avatar || 'https://placehold.co/40x40'} alt={comment.User?.name} className="w-10 h-10 rounded-full object-cover" />
                    <div className="flex-1">
                        <div className="bg-background p-4 rounded-lg border border-custom">
                            <div className="flex justify-between items-center">
                                <p className="font-bold text-card-foreground">{comment.User?.name || 'Pengguna'}</p>
                                {user?.id === comment.userId && editingCommentId !== comment.id && (
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => handleEditClick(comment)} className="text-muted-foreground hover:text-foreground"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(comment.id)} className="text-muted-foreground hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                )}
                            </div>
                            {editingCommentId === comment.id ? (
                                <div className="mt-2">
                                    <textarea
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
                                        className="w-full p-2 border border-custom rounded-lg bg-input text-foreground"
                                        rows="3"
                                    />
                                    <div className="flex justify-end space-x-2 mt-2">
                                        <button onClick={() => setEditingCommentId(null)} className="text-sm px-3 py-1 rounded bg-gray-200 text-gray-800 hover:bg-gray-300">Batal</button>
                                        <button onClick={() => handleUpdate(comment.id)} className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Simpan</button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-muted-foreground mt-1">{comment.content}</p>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {new Date(comment.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function BeritaDetailPage() {
    const { id } = useParams();
    const { isAuthenticated, openModal } = useAuth();
    const [news, setNews] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = useCallback(async () => {
        try {
            const { data, error } = await supabase
                .from('Comment')
                .select('*, User(name, avatar)')
                .eq('postId', id)
                .order('created_at', { ascending: false });
            if (error) throw error;
            setComments(data);
        } catch (error) {
            console.error("Gagal mengambil komentar:", error);
        }
    }, [id]);
    
    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const { data, error } = await supabase
                    .from('Post')
                    .select(`*, author:User(name), category:Category(name), images:Image(id, url)`)
                    .eq('id', id)
                    .single();
                if (error) throw error;
                setNews(data);
                supabase.functions.invoke('increment-view-count', { body: { postId: id } });
            } catch (error) {
                console.error("Gagal mengambil detail berita:", error);
                setNews(null);
            }
        };

        const fetchAllData = async () => {
            setLoading(true);
            await Promise.all([fetchNewsDetail(), fetchComments()]);
            setLoading(false);
        };
        
        fetchAllData();
    }, [id, fetchComments]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-foreground">Memuat Berita...</div>;
    }

    if (!news) {
        return <Navigate to="/404" replace />;
    }

    const canCopyClass = news.canBeCopied ? '' : 'select-none';

    return (
        <div className={`bg-background font-sans min-h-screen ${canCopyClass}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-6">
                    <Link to="/berita" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold text-sm">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Kembali ke Daftar Berita
                    </Link>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-custom">
                       <ImageGallery images={news.images} />
                       <div className="p-8">
                            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-indigo-100 text-indigo-800">
                                {news.category?.name || 'Tanpa Kategori'}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-card-foreground tracking-tight">{news.title}</h1>
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-6 border-y border-custom py-4">
                               <InfoTag icon={<User className="w-4 h-4 text-muted-foreground" />} text={news.author?.name || 'Admin'} />
                               <InfoTag icon={<Calendar className="w-4 h-4 text-muted-foreground" />} text={new Date(news.publishedAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })} />
                            </div>
                            <div className="mt-6 prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: news.content?.replace(/\n/g, '<br />') || 'Konten tidak tersedia.' }}>
                            </div>
                       </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto mt-8">
                    <div className="bg-card rounded-2xl shadow-lg border border-custom p-8">
                        <h2 className="text-2xl font-bold text-card-foreground flex items-center gap-2">
                            <MessageSquare />
                            Komentar ({comments.length})
                        </h2>

                        {isAuthenticated ? (
                            <CommentForm postId={id} onCommentPosted={fetchComments} />
                        ) : (
                            <div className="mt-6 text-center bg-background p-6 rounded-lg border border-custom">
                                <p className="text-muted-foreground">
                                    <button onClick={() => openModal('login')} className="font-bold text-blue-500 hover:underline">Masuk</button> atau <button onClick={() => openModal('register')} className="font-bold text-blue-500 hover:underline">Daftar</button> untuk meninggalkan komentar.
                                </p>
                            </div>
                        )}

                        <hr className="my-8 border-custom" />

                        <CommentList comments={comments} fetchComments={fetchComments} />
                    </div>
                </div>
            </div>
        </div>
    );
}