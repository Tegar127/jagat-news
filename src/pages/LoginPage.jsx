import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import portalLogo from '../assets/captcha.png'; 

// --- Shared Helper Components ---
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.802 6.58C34.566 2.734 29.636 0 24 0C10.745 0 0 10.745 0 24s10.745 24 24 24s24-10.745 24-24c0-1.631-.144-3.211-.409-4.755z"></path>
        <path fill="#FF3D00" d="M6.306 14.691c-1.219 2.355-1.921 5.019-1.921 7.809s.702 5.454 1.921 7.809L.894 35.09C.299 32.887 0 30.51 0 28s.299-4.887 .894-7.091l5.412-2.399z"></path>
        <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.438C29.211 39.426 26.714 40 24 40c-4.446 0-8.281-2.274-10.438-5.631l-5.642 5.034C10.183 44.382 16.57 48 24 48z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.438C44.636 36.218 48 31.026 48 24c0-1.631-.144-3.211-.409-4.755z"></path>
    </svg>
);

const HomeIcon = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const SideIllustration = () => (
    <div className="hidden lg:flex flex-col items-center justify-center w-1/2 bg-blue-50 p-12 text-center rounded-l-2xl">
        <div className="w-64 h-64 mb-6"><svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><path fill="#007BFF" d="M48.4,-64.3C61.8,-53.3,71.2,-37.6,76.5,-20.5C81.8,-3.4,83.1,15.1,75.9,29.9C68.7,44.7,53,55.8,37.1,64.2C21.1,72.6,4.9,78.2,-11.3,77.5C-27.5,76.8,-43.8,70,-56.3,58.8C-68.8,47.6,-77.6,32.1,-79.8,15.7C-82,-0.6,-77.6,-17.8,-68.8,-32.5C-60,-47.2,-46.8,-59.4,-32.7,-67.6C-18.6,-75.8,-3.6,-80,11.8,-76.8C27.2,-73.6,42.6,-64.3,48.4,-64.3Z" transform="translate(100 100)" /></svg></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Portal RDI</h2>
        <p className="text-gray-600">Your Gateway to Research and Development Innovation.</p>
    </div>
);

const DummyRecaptcha = ({ onVerify }) => {
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = (e) => {
        const checked = e.target.checked;
        setIsChecked(checked);
        onVerify(checked);
    };
    return (
        <div className="p-3 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-between">
            <div className="flex items-center">
                 <input id="dummy-captcha" type="checkbox" checked={isChecked} onChange={handleChange} className="h-7 w-7 text-blue-600 border-gray-300 rounded focus:ring-blue-500"/>
                <label htmlFor="dummy-captcha" className="ml-4 text-gray-800 text-sm font-medium">I'm not a robot</label>
            </div>
            <div className="text-center">
                 <img 
        src={portalLogo} 
        alt="reCAPTCHA logo"
        className="h-10 w-10" 
    />
                 <p className="text-xs text-gray-400 -mt-1">reCAPTCHA</p>
            </div>
        </div>
    );
};

// --- Form Components (Now using useNavigate hook) ---
const SignInForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [error, setError] = useState('');
    const handleLogin = (e) => { e.preventDefault(); if (!email || !password) { setError('Please enter both email and password.'); return; } if (!isCaptchaVerified) { setError('Please confirm you are not a robot.'); return; } setError(''); console.log('Login attempt with:', { email, password }); alert('Login Successful! (Dummy)'); };
    const handleGoogleLogin = () => { console.log('Attempting Google Login...'); alert('Redirecting to Google for login... (Dummy)'); };
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
                        <p className="text-gray-600">Don't have an account? <button onClick={() => navigate('/daftar')} className="font-semibold text-blue-600 hover:underline">Sign Up</button></p>
                    </div>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <HomeIcon className="w-4 h-4" />
                  
                    </button>
                </div>
                <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition duration-300 mb-6 text-gray-700 font-medium"><GoogleIcon /> Log in with Google</button>
                <div className="flex items-center my-4"><hr className="flex-grow border-t border-gray-300" /><span className="mx-4 text-gray-500 text-sm">or</span><hr className="flex-grow border-t border-gray-300" /></div>
                <form onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
                    <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label><input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
                    <div className="mb-6"><DummyRecaptcha onVerify={setIsCaptchaVerified} /></div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Log In</button>
                </form>
            </div>
        </div>
    );
};
const SignUpForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [error, setError] = useState('');
    const handleSendCode = () => { if (!email) { setError('Please enter your email to receive a code.'); return; } setError(''); setCodeSent(true); console.log(`Sending verification code to ${email}`); alert(`A verification code has been sent to ${email} (Dummy).`); };
    const handleSignUp = (e) => { e.preventDefault(); if (!email || !password || !code) { setError('Please fill in all fields.'); return; } setError(''); console.log('Signing up with:', { email, password, code }); alert('Sign Up Successful! (Dummy)'); navigate('/login'); };
    return (
        <div className="w-full lg:w-1/2 p-8 md:p-12">
            <div className="w-full max-w-md mx-auto">
                 <div className="flex justify-between items-start mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                        <p className="text-gray-600">Already have an account? <button onClick={() => navigate('/login')} className="font-semibold text-blue-600 hover:underline">Log In</button></p>
                    </div>
                    <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <HomeIcon className="w-4 h-4" />
                   
                    </button>
                </div>
                <form onSubmit={handleSignUp}>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-email">Email</label><div className="flex"><input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@domain.com" className="w-full px-4 py-3 rounded-l-lg border-t border-b border-l border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 z-10" disabled={codeSent}/><button type="button" onClick={handleSendCode} disabled={codeSent} className={`px-4 py-3 font-semibold text-sm rounded-r-lg border border-blue-600 ${codeSent ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}>{codeSent ? 'Sent' : 'Send Code'}</button></div></div>
                    {codeSent && (<div className="mb-4"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="code">Verification Code</label><input id="code" type="text" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Enter code from email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>)}
                    <div className="mb-6"><label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signup-password">Password</label><input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"/></div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign Up</button>
                </form>
                <p className="text-center text-xs text-gray-500 mt-6">By signing up, you agree to our <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.</p>
            </div>
        </div>
    );
};

// --- Page Components ---
export const LoginPage = () => {
    return (
        <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="relative w-full max-w-5xl flex flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
                <SideIllustration />
                <SignInForm />
            </div>
        </div>
    );
};

export const DaftarPage = () => {
    return (
        <div className="bg-gray-300 min-h-screen flex items-center justify-center p-4 font-sans">
            <div className="relative w-full max-w-5xl flex flex-row bg-white rounded-2xl shadow-2xl overflow-hidden">
                <SideIllustration />
                <SignUpForm />
            </div>
        </div>
    );
};

// --- Main App Component (Simplified) ---
export default function App() {
    const [page, setPage] = useState('login'); // Can be 'login' or 'register'

    // Based on the 'page' state, render either the Login or Register page.
    // The onNavigate function is passed down to allow switching between them.
    if (page === 'login') {
        return <LoginPage onNavigate={setPage} />;
    }

    if (page === 'register') {
        return <DaftarPage onNavigate={setPage} />;
    }

    // Default to LoginPage if state is somehow invalid
    return <LoginPage onNavigate={setPage} />;
}
