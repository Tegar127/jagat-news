// src/main.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';

// Ganti dengan Client ID Anda dari Google Cloud Console
const GOOGLE_CLIENT_ID = "420625961315-0rcj3l5cp2044hthbuasa2h51sjsqibp.apps.googleusercontent.com";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
);