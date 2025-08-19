import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabaseClient';
import { Send, Headphones, X } from 'lucide-react';

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
    }, [isAuthenticated, user, isOpen]);

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
        
        setNewMessage(''); // Hapus input segera untuk UX yang lebih baik
        const { error } = await supabase.from('Messages').insert(messageData);
        if (error) {
            console.error('Error sending message:', error);
            setNewMessage(messageData.content); // Kembalikan pesan jika terjadi error
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Jendela Chat */}
            <div className={`
                w-[calc(100vw-2.5rem)] max-w-xs bg-card rounded-lg shadow-2xl flex flex-col h-[60vh]
                transition-all duration-300 ease-in-out
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}>
                <div className="bg-blue-600 text-white p-4 rounded-t-lg flex items-center justify-between">
                    <button onClick={() => setIsOpen(false)} className="hover:opacity-75"><X size={20} /></button>
                    <div className="flex items-center space-x-3">
                        <div>
                            <h2 className="text-md font-bold text-right">Chat dengan Admin</h2>
                            <p className="text-xs opacity-90 text-right">Online</p>
                        </div>
                        <div className="relative">
                            <img src="https://placehold.co/40x40/FFFFFF/3B82F6?text=A" alt="Admin" className="w-10 h-10 rounded-full" />
                            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-blue-600"></span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {!isAuthenticated ? (
                        <div className="flex flex-col items-center justify-center h-full text-center p-4">
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
            
            {/* Tombol Pengalih */}
            <button onClick={() => setIsOpen(!isOpen)} 
                className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-all duration-300 hover:scale-110 mt-4 float-right"
            >
                {isOpen ? <X size={28} /> : <Headphones size={28} />}
            </button>
        </div>
    );
};

export default ChatWidget;