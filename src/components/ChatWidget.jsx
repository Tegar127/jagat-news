import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { Send, MessageSquareText, Headphones, X } from 'lucide-react';

const ChatWidget = () => {
    const { user, isAuthenticated, openModal } = useAuth();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isAuthenticated && isOpen) {
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
    }, [isAuthenticated, user, isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;
        const messageData = { content: newMessage, sender_id: user.id, is_admin_response: false };
        setNewMessage('');
        const { error } = await supabase.from('Messages').insert(messageData);
        if (error) setNewMessage(messageData.content);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Jendela Chat */}
            {isOpen && (
                <div className="w-[calc(100vw-3rem)] max-w-sm bg-card rounded-2xl shadow-2xl flex flex-col h-[60vh] mb-4">
                    <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img src="https://placehold.co/40x40/FFFFFF/3B82F6?text=A" alt="Admin" className="w-10 h-10 rounded-full" />
                            <div>
                                <h2 className="text-lg font-bold">Dukungan Jagat News</h2>
                                <p className="text-xs opacity-90">Online</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                    </div>

                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {!isAuthenticated ? (
                            <div className="flex flex-col items-center justify-center h-full text-center">
                                <MessageSquareText size={40} className="text-muted-foreground mb-3" />
                                <h3 className="text-md font-semibold text-card-foreground">Masuk untuk memulai percakapan</h3>
                                <button onClick={() => openModal('login')} className="mt-2 text-sm font-bold text-blue-500 hover:underline">Klik di sini untuk Masuk</button>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div key={msg.id} className={`flex items-end gap-2.5 ${msg.is_admin_response ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`flex flex-col w-full max-w-xs leading-1.5 p-3 rounded-xl ${msg.is_admin_response ? 'rounded-es-none bg-gray-100 dark:bg-gray-700' : 'rounded-ee-none bg-blue-600 text-white'}`}>
                                        <p className="text-sm font-normal">{msg.content}</p>
                                    </div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {isAuthenticated && (
                        <div className="p-3 border-t border-custom">
                            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                                <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Ketik pesan..." className="w-full p-2 bg-input border border-custom rounded-full focus:outline-none" />
                                <button type="submit" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"><Send size={18} /></button>
                            </form>
                        </div>
                    )}
                </div>
            )}
            
            {/* Tombol Ikon */}
            <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-transform hover:scale-110">
                {isOpen ? <X size={32} /> : <Headphones size={32} />}
            </button>
        </div>
    );
};

export default ChatWidget;