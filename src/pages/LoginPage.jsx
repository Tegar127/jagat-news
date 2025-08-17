// src/pages/LoginPage.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google'; // <-- Impor Tombol Google
import portalLogo from '../assets/captcha.png'; 

const API_URL = 'http://localhost:5000/api';

// ... (Komponen GoogleIcon, HomeIcon, SideIllustration, DummyRecaptcha tetap sama) ...
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 6.58C34.566 2.734 29.636 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.631-.144-3.211-.409-4.755z"></path>
        <path fill="#FF3D00" d="M6.306 14.691c-1.219 2.355-1.921 5.019-1.921 7.809s.702 5.454 1.921 7.809L.894 35.09C.299 32.887 0 30.51 0 28s.299-4.887 .894-7.091l5.412-2.399z"></path>
        <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.438C29.211 39.426 26.714 40 24 40c-4.446 0-8.281-2.274-10.438-5.631l-5.642 5.034C10.183 44.382 16.57 48 24 48z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.438C44.636 36.218 48 31.026 48 24c0-1.631-.144-3.211-.409-4.755z"></path>
    </svg>
);
const HomeIcon = ({ className }) => ( <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline> </svg> );
const SideIllustration = () => ( <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-blue-50 p-12 text-center rounded-l-2xl"> <div className="w-64 h-64 mb-6"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#007BFF" d="M48.4,-64.3C61.8,-53.3,71.2,-37.6,76.5,-20.5C81.8,-3.4,83.1,15.1,75.9,29.9C68.7,44.7,53,55.8,37.1,64.2C21.1,72.6,4.9,78.2,-11.3,77.5C-27.5,76.8,-43.8,70,-56.3,58.8C-68.8,47.6,-77.6,32.1,-79.8,15.7C-82,-0.6,-77.6,-17.8,-68.8,-32.5C-60,-47.2,-46.8,-59.4,-32.7,-67.6C-18.6,-75.8,-3.6,-80,11.8,-76.8C27.2,-73.6,42.6,-64.3,48.4,-64.3Z" transform="translate(100 100)" /></svg></div> <h2 className="text-2xl font-bold text-gray-800 mb-2">Jagat News</h2> <p className="text-gray-600">Portal Berita Terkini dan Terpercaya.</p> </div> );

const SignInForm = () => {
    const navigate = useNavigate();
    const { login, loginWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Selamat Datang!</h1>
                        <p className="text-gray-600">Belum punya akun? <button onClick={() => navigate('/daftar')} className="font-semibold text-blue-600 hover:underline">Daftar</button></p>
                    </div>
                    <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100"><HomeIcon className="w-5 h-5 text-gray-500" /></button>
                </div>
                
                <div className="flex justify-center mb-6">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            loginWithGoogle(credentialResponse.credential).catch(err => setError(err.message));
                        }}
                        onError={() => setError('Login Google gagal.')}
                    />
                </div>

                <div className="flex items-center my-4"><hr className="flex-grow"/><span className="mx-4 text-gray-500 text-sm">atau</span><hr className="flex-grow"/></div>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-lg">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@contoh.com" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300">
                        {loading ? 'Memproses...' : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const SignUpForm = () => {
    const navigate = useNavigate();
    const { loginWithGoogle } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error);
            alert('Registrasi berhasil! Silakan login.');
            navigate('/login');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Buat Akun Baru</h1>
                        <p className="text-gray-600">Sudah punya akun? <button onClick={() => navigate('/login')} className="font-semibold text-blue-600 hover:underline">Masuk</button></p>
                    </div>
                    <button onClick={() => navigate('/')} className="p-2 rounded-lg hover:bg-gray-100"><HomeIcon className="w-5 h-5 text-gray-500" /></button>
                </div>

                <div className="flex justify-center mb-6">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            loginWithGoogle(credentialResponse.credential).catch(err => setError(err.message));
                        }}
                        onError={() => setError('Daftar dengan Google gagal.')}
                    />
                </div>

                <div className="flex items-center my-4"><hr className="flex-grow"/><span className="mx-4 text-gray-500 text-sm">atau</span><hr className="flex-grow"/></div>
                
                <form onSubmit={handleSignUp}>
                    {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-lg">{error}</p>}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nama Lengkap</label>
                        <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">Email</label>
                        <input id="signup-email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">Password</label>
                        <input id="signup-password" name="password" type="password" value={formData.password} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
                    </div>
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-300">
                        {loading ? 'Memproses...' : 'Daftar'}
                    </button>
                </form>
            </div>
        </div>
    );
};


export const LoginPage = () => ( <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans"> <div className="relative w-full max-w-5xl flex flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"> <SideIllustration /> <SignInForm /> </div> </div> );
export const DaftarPage = () => ( <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4 font-sans"> <div className="relative w-full max-w-5xl flex flex-row bg-white rounded-2xl shadow-2xl overflow-hidden"> <SideIllustration /> <SignUpForm /> </div> </div> );