import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const API_URL = '/api';

const UserAdminPage = () => {
    const [users, setUsers] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentUser, setCurrentUser] = useState({ id: null, name: '', email: '', password: '', role: 'ADMIN' });

    const fetchUsers = async () => {
        // Logika ini akan gagal karena /api/users sudah tidak ada,
        // tetapi ini adalah kode sebelum perubahan.
        try {
            const response = await fetch(`${API_URL}/users`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Gagal mengambil data pengguna (ini diharapkan karena backend lama sudah dihapus):", error);
            // Menggunakan data dummy jika fetch gagal
            setUsers([
                {id: 1, name: 'Admin User', email: 'admin@example.com', role: 'ADMINISTRATOR'},
                {id: 2, name: 'Regular User', email: 'user@example.com', role: 'USER'},
            ]);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentUser({ ...currentUser, [name]: value });
    };

    const handleAddNew = () => {
        setCurrentUser({ id: null, name: '', email: '', password: '', role: 'ADMIN' });
        setIsFormVisible(true);
    };

    const handleEdit = (user) => {
        setCurrentUser({ ...user, password: '' }); // Kosongkan password saat edit
        setIsFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logika ini tidak akan berfungsi tanpa backend Express
        console.log("Menyimpan pengguna (tidak akan berfungsi):", currentUser);
        setIsFormVisible(false);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus pengguna ini?')) {
            // Logika ini tidak akan berfungsi tanpa backend Express
            console.log("Menghapus pengguna (tidak akan berfungsi):", id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-foreground">Kelola Pengguna</h1>
                <button onClick={handleAddNew} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                    <PlusCircle size={20} className="mr-2" />
                    Tambah Pengguna
                </button>
            </div>

            {isFormVisible && (
                <div className="bg-card p-6 rounded-xl shadow-md border border-custom mb-6">
                    <h2 className="text-xl font-bold mb-4">{currentUser.id ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input name="name" value={currentUser.name} onChange={handleInputChange} placeholder="Nama Lengkap" className="w-full p-2 border border-custom rounded bg-input mb-4" required />
                        <input name="email" value={currentUser.email} onChange={handleInputChange} placeholder="Alamat Email" type="email" className="w-full p-2 border border-custom rounded bg-input mb-4" required />
                        <input name="password" value={currentUser.password} onChange={handleInputChange} placeholder={currentUser.id ? "Kosongkan jika tidak ganti" : "Password"} type="password" className="w-full p-2 border border-custom rounded bg-input mb-4" required={!currentUser.id} />
                        <select name="role" value={currentUser.role} onChange={handleInputChange} className="w-full p-2 border border-custom rounded bg-input mb-4">
                            <option value="ADMIN">Admin</option>
                            <option value="ADMINISTRATOR">Administrator</option>
                            <option value="USER">User</option>
                        </select>
                        <div className="flex justify-end gap-4">
                           <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">Batal</button>
                           <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-card p-6 rounded-xl shadow-md border border-custom overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-background">
                        <tr>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nama</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Peran</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                        {users.map(user => (
                            <tr key={user.id} className="border-b border-custom hover:bg-gray-50 dark:hover:bg-gray-800">
                                <td className="py-3 px-4 text-foreground font-medium">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                        user.role === 'ADMINISTRATOR' ? 'bg-purple-100 text-purple-800' :
                                        user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button onClick={() => handleEdit(user)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
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