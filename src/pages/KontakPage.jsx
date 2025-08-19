import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { Send } from 'lucide-react';

const KontakPage = () => {
    const { user, isAuthenticated, openModal } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isAuthenticated) {
            // Ambil pesan awal
            const fetchMessages = async () => {
                const { data, error } = await supabase
                    .from('Messages')
                    .select('*')
                    .eq('sender_id', user.id)
                    .order('created_at', { ascending: true });

                if (error) console.error('Error fetching messages:', error);
                else setMessages(data);
            };
            fetchMessages();

            // Dengarkan pesan baru secara real-time
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

        const { error } = await supabase.from('Messages').insert(messageData);
        if (error) console.error('Error sending message:', error);
        else setNewMessage('');
    };

    if (!isAuthenticated) {
        return (
            <div className="container mx-auto p-8 text-center bg-card border border-custom rounded-lg my-10">
                <h1 className="text-3xl font-bold text-card-foreground">Hubungi Admin</h1>
                <p className="mt-4 text-muted-foreground">
                    <button onClick={() => openModal('login')} className="font-bold text-blue-500 hover:underline">Masuk</button> untuk memulai percakapan dengan tim kami.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4 md:p-8">
            <div className="max-w-3xl mx-auto bg-card border border-custom rounded-lg shadow-lg flex flex-col h-[70vh]">
                <div className="p-4 border-b border-custom">
                    <h1 className="text-xl font-bold text-card-foreground">Hubungi Dukungan Admin</h1>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.is_admin_response ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.is_admin_response ? 'bg-gray-200 dark:bg-gray-700 text-card-foreground' : 'bg-blue-600 text-white'}`}>
                                <p>{msg.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
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
            </div>
        </div>
    );
};

export default KontakPage;