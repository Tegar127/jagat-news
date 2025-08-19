import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { useAuth } from '../../context/AuthContext';
import { Send } from 'lucide-react';

const ChatAdminPage = () => {
    const { user: adminUser } = useAuth();
    const [conversations, setConversations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [reply, setReply] = useState('');

    useEffect(() => {
        // Ambil daftar percakapan unik
        const fetchConversations = async () => {
            const { data, error } = await supabase
                .rpc('get_conversations'); // Kita akan buat fungsi RPC ini

            if (error) console.error('Error fetching conversations:', error);
            else setConversations(data);
        };
        fetchConversations();
    }, []);

    useEffect(() => {
        if (!selectedUser) return;

        // Ambil pesan untuk user yang dipilih
        const fetchMessages = async () => {
            const { data, error } = await supabase
                .from('Messages')
                .select('*')
                .eq('sender_id', selectedUser.sender_id)
                .order('created_at', { ascending: true });
            if (error) console.error('Error fetching messages:', error);
            else setMessages(data);
        };
        fetchMessages();
        
        // Dengarkan pesan baru dari user yang dipilih
        const channel = supabase.channel(`admin-chat:${selectedUser.sender_id}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'Messages', filter: `sender_id=eq.${selectedUser.sender_id}` },
                (payload) => {
                    setMessages(currentMessages => [...currentMessages, payload.new]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [selectedUser]);

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (reply.trim() === '') return;

        const messageData = {
            content: reply,
            sender_id: selectedUser.sender_id, // Kirim ke user
            is_admin_response: true
        };

        const { error } = await supabase.from('Messages').insert(messageData);
        if (error) console.error('Error sending reply:', error);
        else setReply('');
    };

    return (
        <div className="flex h-[calc(100vh-80px)]">
            {/* Daftar Percakapan */}
            <div className="w-1/3 border-r border-custom overflow-y-auto">
                <div className="p-4 border-b border-custom">
                    <h2 className="text-lg font-bold">Percakapan</h2>
                </div>
                {conversations.map(conv => (
                    <div key={conv.sender_id} onClick={() => setSelectedUser(conv)} className={`p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${selectedUser?.sender_id === conv.sender_id ? 'bg-blue-100 dark:bg-blue-900' : ''}`}>
                        <p className="font-semibold">{conv.name || 'User'}</p>
                        <p className="text-sm text-muted-foreground truncate">{conv.last_message}</p>
                    </div>
                ))}
            </div>

            {/* Jendela Chat */}
            <div className="w-2/3 flex flex-col">
                {selectedUser ? (
                    <>
                        <div className="p-4 border-b border-custom">
                            <h2 className="font-bold">{selectedUser.name || 'User'}</h2>
                        </div>
                        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                            {messages.map(msg => (
                                <div key={msg.id} className={`flex ${!msg.is_admin_response ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${!msg.is_admin_response ? 'bg-gray-200 dark:bg-gray-700' : 'bg-green-600 text-white'}`}>
                                        <p>{msg.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-custom">
                            <form onSubmit={handleSendReply} className="flex items-center space-x-2">
                                <input type="text" value={reply} onChange={e => setReply(e.target.value)} placeholder="Ketik balasan..." className="w-full p-3 bg-input border border-custom rounded-full" />
                                <button type="submit" className="bg-blue-600 text-white p-3 rounded-full"><Send size={20} /></button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Pilih percakapan untuk memulai</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatAdminPage;