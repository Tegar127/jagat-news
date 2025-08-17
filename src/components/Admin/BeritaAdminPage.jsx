import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { createEditor, Editor, Transforms, Text, Element as SlateElement } from 'slate';
import { Slate, Editable, withReact, useSlate } from 'slate-react';
import { withHistory } from 'slate-history';
import {
    PlusCircle, Search, Edit, Trash2, Upload, XCircle,
    Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify
} from 'lucide-react';

const API_URL = 'http://localhost:5000/api';

const initialValue = [
    {
        type: 'paragraph',
        align: 'left',
        children: [{ text: '' }],
    },
];

// === HELPER FUNCTIONS ===

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const { selection } = editor;
    if (!selection) return false;
    const [match] = Editor.nodes(editor, {
        at: Editor.unhangRange(editor, selection),
        match: n => !Editor.isEditor(n) && SlateElement.isElement(n) && n.align === format,
    });
    return !!match;
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    Transforms.setNodes(editor, {
        align: isActive ? undefined : format,
    });
};

// === CUSTOM RENDERERS ===

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) children = <strong>{children}</strong>;
    if (leaf.italic) children = <em>{children}</em>;
    if (leaf.underline) children = <u>{children}</u>;
    return <span {...attributes}>{children}</span>;
};

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align };
    switch (element.type) {
        case 'paragraph':
            return <p style={style} {...attributes}>{children}</p>;
        default:
            return <div style={style} {...attributes}>{children}</div>;
    }
};

// === TOOLBAR COMPONENT ===

const Toolbar = () => {
    const editor = useSlate();
    return (
        <div className="flex flex-wrap gap-2 p-2 border-b mb-2">
            {/* Mark Buttons */}
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'bold'); }} className={`p-2 rounded ${isMarkActive(editor, 'bold') ? 'bg-gray-200' : 'bg-white'}`}><Bold size={16} /></button>
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'italic'); }} className={`p-2 rounded ${isMarkActive(editor, 'italic') ? 'bg-gray-200' : 'bg-white'}`}><Italic size={16} /></button>
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleMark(editor, 'underline'); }} className={`p-2 rounded ${isMarkActive(editor, 'underline') ? 'bg-gray-200' : 'bg-white'}`}><Underline size={16} /></button>
            
            <div className="border-l mx-2"></div>

            {/* Block Buttons */}
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleBlock(editor, 'left'); }} className={`p-2 rounded ${isBlockActive(editor, 'left') ? 'bg-gray-200' : 'bg-white'}`}><AlignLeft size={16} /></button>
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleBlock(editor, 'center'); }} className={`p-2 rounded ${isBlockActive(editor, 'center') ? 'bg-gray-200' : 'bg-white'}`}><AlignCenter size={16} /></button>
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleBlock(editor, 'right'); }} className={`p-2 rounded ${isBlockActive(editor, 'right') ? 'bg-gray-200' : 'bg-white'}`}><AlignRight size={16} /></button>
            <button type="button" onMouseDown={e => { e.preventDefault(); toggleBlock(editor, 'justify'); }} className={`p-2 rounded ${isBlockActive(editor, 'justify') ? 'bg-gray-200' : 'bg-white'}`}><AlignJustify size={16} /></button>
        </div>
    );
};


// Main Component
const BeritaAdminPage = () => {
    const [newsData, setNewsData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [currentNews, setCurrentNews] = useState({
        id: null,
        title: '',
        category: '',
        status: 'DRAFT',
        content: '',
        canBeCopied: true,
        images: []
    });
    const [imageFiles, setImageFiles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const editor = useMemo(() => withHistory(withReact(createEditor())), []);
    const [editorValue, setEditorValue] = useState(initialValue);

    const renderLeaf = useCallback(props => <Leaf {...props} />, []);
    const renderElement = useCallback(props => <Element {...props} />, []);
    
    // Function to deserialize HTML to Slate nodes
    const deserialize = (htmlString) => {
        if (!htmlString) return initialValue;
        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
        if (!doc.body.hasChildNodes()) return initialValue;

        const parseNode = (el) => {
            if (el.nodeType === 3) return { text: el.textContent };
            if (el.nodeType !== 1) return null;

            const children = Array.from(el.childNodes).map(parseNode).filter(Boolean);
            if (children.length === 0) children.push({ text: '' }); // Ensure element has children

            let node = {};
            if (el.nodeName === 'STRONG') node.bold = true;
            if (el.nodeName === 'EM') node.italic = true;
            if (el.nodeName === 'U') node.underline = true;
            
            // This is a simplified version, it merges text with marks
            if (Object.keys(node).length > 0) {
                 return children.map(child => ({ ...child, ...node }));
            }
            
            switch (el.nodeName) {
                case 'BODY': return children;
                case 'P': return { type: 'paragraph', align: el.style.textAlign || 'left', children };
                default: return { type: 'paragraph', align: 'left', children };
            }
        };

        const result = parseNode(doc.body);
        return Array.isArray(result) && result.length > 0 ? result : initialValue;
    };
    
    // Function to serialize Slate nodes to HTML
    const serialize = nodes => {
        return nodes.map(n => {
            if (Text.isText(n)) {
                let string = n.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                if (n.bold) string = `<strong>${string}</strong>`;
                if (n.italic) string = `<em>${string}</em>`;
                if (n.underline) string = `<u>${string}</u>`;
                return string;
            }
            const children = n.children.map(c => serialize([c])).join('');
            switch (n.type) {
                case 'paragraph':
                    return `<p style="text-align: ${n.align || 'left'};">${children}</p>`;
                default:
                    return children;
            }
        }).join('\n');
    }

    const fetchNews = async () => {
        try {
            const response = await fetch(`${API_URL}/berita`);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setNewsData(data.map(news => ({
                ...news,
                author: news.author ? news.author.name : 'N/A',
                category: news.category ? news.category.name : 'N/A',
            })));
        } catch (error) { console.error("Gagal mengambil data berita:", error); }
    };

    useEffect(() => { fetchNews(); }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentNews({ ...currentNews, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFileChange = (e) => {
        setImageFiles(prevFiles => [...prevFiles, ...Array.from(e.target.files)]);
    };

    const handleRemoveNewImage = (index) => {
        setImageFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    };

    const handleRemoveExistingImage = (imageId) => {
        if (window.confirm('Yakin ingin menghapus gambar ini?')) {
            setCurrentNews(prev => ({ ...prev, images: prev.images.filter(img => img.id !== imageId) }));
        }
    };

    const handleAddNew = () => {
        setCurrentNews({ id: null, title: '', category: '', status: 'DRAFT', content: '', canBeCopied: true, images: [] });
        setEditorValue(initialValue);
        setImageFiles([]);
        setIsFormVisible(true);
    };

    const handleEdit = (news) => {
        setCurrentNews(news);
        setEditorValue(deserialize(news.content || ''));
        setImageFiles([]);
        setIsFormVisible(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = serialize(editorValue);
        const formData = new FormData();
        formData.append('title', currentNews.title);
        formData.append('category', currentNews.category);
        formData.append('status', currentNews.status);
        formData.append('content', content);
        formData.append('canBeCopied', String(currentNews.canBeCopied));
        if (imageFiles.length > 0) imageFiles.forEach(file => formData.append('imageFiles', file));
        if (!currentNews.id && imageFiles.length === 0) return alert("Unggah setidaknya satu gambar.");

        const method = currentNews.id ? 'PUT' : 'POST';
        const url = currentNews.id ? `${API_URL}/berita/${currentNews.id}` : `${API_URL}/berita`;

        try {
            const response = await fetch(url, { method, body: formData });
            if (!response.ok) throw new Error((await response.json()).error || 'Gagal menyimpan berita');
            await fetchNews();
            setIsFormVisible(false);
        } catch (error) { alert('Terjadi kesalahan: ' + error.message); }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Yakin ingin menghapus berita ini?')) {
            await fetch(`${API_URL}/berita/${id}`, { method: 'DELETE' });
            fetchNews();
        }
    };

    const filteredNews = newsData.filter(news => news.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Kelola Berita</h1>
                <button onClick={handleAddNew} className="flex items-center bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">
                    <PlusCircle size={20} className="mr-2" /> Tambah Berita
                </button>
            </div>

            {isFormVisible && (
                <div className="bg-white p-6 rounded-xl shadow-md border mb-6">
                    <h2 className="text-xl font-bold mb-4">{currentNews.id ? 'Edit Berita' : 'Tambah Berita Baru'}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Judul</label>
                            <input type="text" name="title" value={currentNews.title} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Kategori</label>
                            <input type="text" name="category" value={currentNews.category} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg" required />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Isi Berita</label>
                            <Slate editor={editor} initialValue={editorValue} onChange={setEditorValue}>
                                <div className="border rounded-lg">
                                    <Toolbar />
                                    <Editable
                                        className="min-h-[150px] focus:outline-none p-4"
                                        placeholder="Tulis isi berita di sini..."
                                        renderElement={renderElement}
                                        renderLeaf={renderLeaf}
                                    />
                                </div>
                            </Slate>
                        </div>
                        {/* Image Upload Section */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Gambar</label>
                            {currentNews.id && currentNews.images && currentNews.images.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                                    {currentNews.images.map((image) => (
                                        <div key={image.id} className="relative">
                                            <img src={image.url} alt="Gambar berita" className="w-full h-24 object-cover rounded-lg" />
                                            <button type="button" onClick={() => handleRemoveExistingImage(image.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><XCircle size={20} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {imageFiles.length > 0 && (
                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 mb-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-24 object-cover rounded-lg" />
                                            <button type="button" onClick={() => handleRemoveNewImage(index)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><XCircle size={20} /></button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                                            <span>Pilih file (bisa lebih dari satu)</span>
                                            <input id="file-upload" name="imageFiles" type="file" className="sr-only" onChange={handleFileChange} accept="image/*" multiple />
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF (MAX. 10MB)</p>
                                </div>
                            </div>
                        </div>
                        {/* Status and other options */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Status</label>
                            <select name="status" value={currentNews.status} onChange={handleInputChange} className="w-full px-3 py-2 border rounded-lg">
                                <option value="PUBLISHED">Published</option>
                                <option value="DRAFT">Draft</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="flex items-center">
                                <input type="checkbox" name="canBeCopied" checked={currentNews.canBeCopied} onChange={handleInputChange} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                                <span className="ml-2 text-gray-700">Izinkan teks berita disalin</span>
                            </label>
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsFormVisible(false)} className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-300">Batal</button>
                            <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700">Simpan</button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table of News */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200/80">
                <div className="mb-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input type="text" placeholder="Cari berita..." onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Judul</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Kategori</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Penulis</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Status</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm text-gray-600">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {filteredNews.map(news => (
                                <tr key={news.id} className="border-b border-gray-200 hover:bg-gray-50">
                                    <td className="py-3 px-4 font-medium">{news.title}</td>
                                    <td className="py-3 px-4">{news.category}</td>
                                    <td className="py-3 px-4">{news.author}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${news.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{news.status}</span>
                                    </td>
                                    <td className="py-3 px-4 flex gap-2">
                                        <button onClick={() => handleEdit(news)} className="text-blue-600 hover:text-blue-800"><Edit size={18} /></button>
                                        <button onClick={() => handleDelete(news.id)} className="text-red-600 hover:text-red-800"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default BeritaAdminPage;