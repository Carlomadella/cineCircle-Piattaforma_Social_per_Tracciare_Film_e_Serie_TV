import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import Componenti
import Navbar from './components/Navbar';

// Import Pagine
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ContentDetailPage from './pages/ContentDetailPage';
import SearchPage from './pages/SearchPage'; 
import FeedPage from './pages/FeedPage'; 
import PublicProfilePage from './pages/PublicProfilePage';
import NotFoundPage from './pages/NotFoundPage'; 

function App() {
    return (
        <AuthProvider>
            <Router>
                {/* La Navbar è fuori dalle Routes così si vede sempre */}
                <Navbar />
                
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/feed" element={<FeedPage />} />
                    <Route path="/user/:id" element={<PublicProfilePage />} />
                    
                    {/* Rotta di Ricerca */}
                    <Route path="/search" element={<SearchPage />} />
                    
                    <Route path="/content/:id" element={<ContentDetailPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;