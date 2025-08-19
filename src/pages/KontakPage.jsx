import React, {useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { Send, MessageSquareText } from 'lucide-react';

const KontakPage = () => {
    const { user, isAuthenticated, openModal } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isAuthenticated) {
            const fetchMessages = async () => {
                setLoading(true);
                const { data, error } = await supabase
                    .from('Messages')
                    .select('*, sender:User(name, avatar)')
                    .eq('sender_id', user.id)
                    .order('created_at', { ascending: true });

                if (error) {
                    console.error('Error fetching messages:', error);
                } else {
                    setMessages(data);
                }
                setLoading(false);
            };
            fetchMessages();

            const channel = supabase.channel(`chat:${user.id}`)
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Messages', filter: `sender_id=eq.${user.id}` },
                    (payload) => {
                        setMessages(currentMessages => [...currentMessages, payload.new]);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        } else {
            setLoading(false);
        }
    }, [isAuthenticated, user]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        const messageData = {
            content: newMessage,
            sender_id: user.id,
            is_admin_response: false
        };

        setNewMessage('');
        const { error } = await supabase.from('Messages').insert(messageData);
        if (error) {
            console.error('Error sending message:', error);
            // Revert UI change if error
            setNewMessage(messageData.content);
        }
    };
    
    if (loading) {
        return <div className="flex justify-center items-center h-screen">Memuat...</div>;
    }

    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-200px)] bg-background p-4">
            <div className="w-full max-w-lg bg-card rounded-2xl shadow-2xl flex flex-col h-[75vh]">
                <div className="bg-blue-600 text-white p-6 rounded-t-2xl flex items-center space-x-4">
                    <div className="relative">
                        <img src="https://placehold.co/50x50/FFFFFF/3B82F6?text=A" alt="Admin" className="w-12 h-12 rounded-full border-2 border-white" />
                        <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-blue-600"></span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold">Dukungan Jagat News</h2>
                        <p className="text-sm opacity-90">Biasanya membalas dalam beberapa jam</p>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                    {!isAuthenticated ? (
                         <div className="flex flex-col items-center justify-center h-full text-center">
                             <MessageSquareText size={48} className="text-muted-foreground mb-4" />
                             <h3 className="text-lg font-semibold text-card-foreground">Masuk untuk memulai percakapan</h3>
                             <p className="text-muted-foreground mt-2">
                                 <button onClick={() => openModal('login')} className="font-bold text-blue-500 hover:underline">Masuk</button> atau <button onClick={() => openModal('register')} className="font-bold text-blue-500 hover:underline">Daftar</button>
                             </p>
                         </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className={`flex items-end gap-2.5 ${msg.is_admin_response ? 'justify-start' : 'justify-end'}`}>
                                <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 rounded-xl ${msg.is_admin_response ? 'rounded-es-none bg-gray-100 dark:bg-gray-700' : 'rounded-ee-none bg-blue-600 text-white'}`}>
                                    <p className="text-sm font-normal">{msg.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {isAuthenticated && (
                    <div className="p-4 border-t border-custom">
                        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Ketik pesan Anda..."
                                className="w-full p-3 bg-input border border-custom rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition">
                                <Send size={20} />
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default KontakPage;