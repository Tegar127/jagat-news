import React, { useState } from 'react';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

const initialCategories = [
    { id: 1, name: 'Teknologi' },
    { id: 2, name: 'Olahraga' },
    { id: 3, name: 'Ekonomi' },
];

const KategoriAdminPage = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentCategory, setCurrentCategory] = useState({ id: null, name: '' });

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

    const handleDelete = (id) => {
        if (window.confirm('Yakin ingin menghapus kategori ini?')) {
            setCategories(categories.filter(cat => cat.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentCategory.id) {
            setCategories(categories.map(cat => (cat.id === currentCategory.id ? currentCategory : cat)));
        } else {
            setCategories([...categories, { ...currentCategory, id: Date.now() }]);
        }
        setIsFormVisible(false);
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