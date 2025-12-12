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
                {/* LOGO IMMAGINE */}
<Link className="navbar-brand d-flex align-items-center py-0" to="/">
    <img 
        src="/logo_CineCircle.png" 
        alt="CineCircle" 
        // Aumentiamo l'altezza e aggiungiamo un filtro per renderlo nitido
        style={{ height: '65px', objectFit: 'contain' }} 
        className="me-2"
    />
</Link>
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="navbar-nav ms-auto align-items-center">
                        
                        {showSearch && <LiveSearchBar />}

                        {user ? (
                            <>
                                <Link className="nav-link text-white mx-2" to="/feed">
                                    <i className="fas fa-stream me-1"></i> Feed
                                </Link>
                                <button onClick={handleLogout} className="btn btn-outline-danger btn-sm ms-3">Esci</button>
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