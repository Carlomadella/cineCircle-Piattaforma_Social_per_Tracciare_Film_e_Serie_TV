import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Pulisce il token
        navigate('/login'); // Porta al login
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top" 
             style={{ backgroundColor: '#1F1F1F', borderBottom: '1px solid #333' }}>
            <div className="container">
                {/* LOGO */}
                <Link className="navbar-brand fw-bold d-flex align-items-center" to="/" style={{ color: '#E50914', fontSize: '1.5rem' }}>
                    <i className="fas fa-film me-2"></i> CineCircle
                </Link>
                
                {/* HAMBURGER MENU (Per mobile) */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        
                        {/* LINK COMUNI */}
                        <Link className="nav-link text-white mx-2" to="/search">
                            <i className="fas fa-search me-1"></i> Cerca
                        </Link>

                        {/* LOGICA UTENTE LOGGATO / OSPITE */}
                        {user ? (
                            <>
                                <Link className="nav-link text-white mx-2" to="/profile">
                                    <i className="fas fa-user-circle me-1"></i> {user.username}
                                </Link>
                                <button 
                                    onClick={handleLogout} 
                                    className="btn btn-outline-danger btn-sm ms-3"
                                >
                                    Esci
                                </button>
                            </>
                        ) : (
                            <>
                                <Link className="nav-link text-white mx-2" to="/login">Accedi</Link>
                                <Link className="btn btn-primary ms-2 btn-sm px-3" to="/register">Registrati</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;