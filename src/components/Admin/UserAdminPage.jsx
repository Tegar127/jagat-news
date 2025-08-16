import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';

const initialUsers = [
    { id: 1, name: 'Admin Tegar', email: 'admin@jagat.news', role: 'Administrator' },
    { id: 2, name: 'User Budi', email: 'budi@example.com', role: 'User' },
];

const UserAdminPage = () => {
    const [users, setUsers] = useState(initialUsers);

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus pengguna ini?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Kelola Pengguna</h1>
            
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nama</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Role</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.role}</td>
                                <td className="py-3 px-4">
                                    <button onClick={() => handleDelete(user.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserAdminPage;