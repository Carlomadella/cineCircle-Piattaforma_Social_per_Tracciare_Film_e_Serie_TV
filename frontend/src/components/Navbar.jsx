import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LiveSearchBar from './LiveSearchBar';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const hideSearchOn = ['/login', '/register'];
    const showSearch = !hideSearchOn.includes(location.pathname);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" 
             style={{ backgroundColor: '#1F1F1F', borderBottom: '1px solid #333' }}>
            <div className="container">
                {/* LOGO */}
                <Link className="navbar-brand d-flex align-items-center me-4" to="/">
                    <img 
                        src="/logo_cinecircle.png" 
                        alt="CineCircle" 
                        style={{ height: '40px', objectFit: 'contain' }} 
                    />
                </Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* PARTE CENTRALE: BARRA DI RICERCA */}
                    <div className="mx-auto">
                        {showSearch && <LiveSearchBar />}
                    </div>

                    {/* PARTE DESTRA: MENU UTENTE */}
                    <div className="navbar-nav ms-auto align-items-center d-flex gap-3">
                        
                        {user ? (
                            <>
                                {/* 1. LINK FEED */}
                                <Link className="nav-link text-white d-flex align-items-center" to="/feed">
                                    <i className="fas fa-stream me-2"></i> Feed
                                </Link>

                                {/* 2. LINK PROFILO (Quello che mancava) */}
                                <Link className="nav-link text-white d-flex align-items-center fw-bold px-3 py-1 rounded hover-bg-light" 
                                      to="/profile"
                                      style={{ border: '1px solid rgba(255,255,255,0.2)' }}>
                                    <i className="fas fa-user-circle me-2"></i> 
                                    {user.username}
                                </Link>

                                {/* 3. LOGOUT */}
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-outline-danger btn-sm"
                                >
                                    Esci
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link text-white" to="/login">Accedi</Link>
                                <Link className="btn btn-primary btn-sm px-3" to="/register">Registrati</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;