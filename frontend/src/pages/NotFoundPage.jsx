import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center text-white" 
             style={{ backgroundColor: '#141414' }}>
            <h1 className="display-1 fw-bold text-danger">404</h1>
            <h2 className="mb-4">Oops! Ci siamo persi nel set.</h2>
            <p className="text-white-50 mb-5">La pagina che cerchi è stata tagliata nel montaggio finale.</p>
            <Link to="/" className="btn btn-primary btn-lg">
                <i className="fas fa-home me-2"></i> Torna alla Home
            </Link>
        </div>
    );
};

export default NotFoundPage;