import React, { useState, useEffect } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../supabaseClient'; // 1. Impor klien Supabase

const KategoriAdminPage = () => {
    const [categories, setCategories] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: '' });

    // 2. READ: Fungsi untuk mengambil semua data kategori dari Supabase
    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('Category') // Nama tabel di database Supabase Anda
                .select('*')
                .order('name', { ascending: true }); // Urutkan berdasarkan nama

            if (error) throw error;
            setCategories(data);
        } catch (error) {
            console.error('Gagal mengambil data kategori:', error);
            alert(`Error: ${error.message}`);
        }
    };

    // Panggil fetchCategories saat komponen pertama kali dimuat
    useEffect(() => {
        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        setCurrentCategory({ ...currentCategory, name: e.target.value });
    };

    const handleAddNew = () => {
        setCurrentCategory({ id: null, name: '' });
        setIsFormVisible(true);
    };

    const handleEdit = (category) => {
        setCurrentCategory(category);
        setIsFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus kategori ini? Ini tidak dapat diurungkan.')) {
            try {
                // 4. DELETE: Hapus kategori dari Supabase berdasarkan ID
                const { error } = await supabase
                    .from('Category')
                    .delete()
                    .eq('id', id);

                if (error) throw error;
                fetchCategories(); // Muat ulang daftar kategori setelah berhasil
            } catch (error) {
                console.error('Gagal menghapus kategori:', error);
                alert(`Error: ${error.message}`);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let error;
            // 3. CREATE / UPDATE
            if (currentCategory.id) {
                // UPDATE: Perbarui kategori yang sudah ada
                ({ error } = await supabase
                    .from('Category')
                    .update({ name: currentCategory.name })
                    .eq('id', currentCategory.id));
            } else {
                // CREATE: Buat kategori baru
                ({ error } = await supabase
                    .from('Category')
                    .insert({ name: currentCategory.name }));
            }

            if (error) throw error;

            fetchCategories(); // Muat ulang daftar kategori
            setIsFormVisible(false); // Sembunyikan form
        } catch (error) {
            console.error('Gagal menyimpan kategori:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Kategori</h1>
                <button onClick={handleAddNew} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                    <PlusCircle size={20} className="mr-2" />
                    Tambah Kategori
                </button>
            </div>

            {isFormVisible && (
                 <div className="bg-white p-6 rounded-xl shadow-md border mb-6">
                    <h2 className="text-xl font-bold mb-4">{currentCategory.id ? 'Edit Kategori' : 'Tambah Kategori'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nama Kategori"
                            value={currentCategory.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded mb-4"
                            required
                        />
                        <div className="flex justify-end gap-4">
                           <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg">Batal</button>
                           <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white p-6 rounded-xl shadow-md border">
                <table className="min-w-full">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Nama Kategori</th>
                            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(cat => (
                            <tr key={cat.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{cat.name}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button onClick={() => handleEdit(cat)} className="text-blue-600 hover:text-blue-800"><Edit size={18}/></button>
                                    <button onClick={() => handleDelete(cat.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default KategoriAdminPage;