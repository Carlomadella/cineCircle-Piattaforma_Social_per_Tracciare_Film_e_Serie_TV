import React from 'react';
import { Link } from 'react-router-dom';

const UserListModal = ({ title, users, onClose }) => {
    return (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content text-white" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                    <div className="modal-header border-secondary">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {users.length === 0 ? (
                            <p className="text-muted text-center">Nessun utente trovato.</p>
                        ) : (
                            <ul className="list-group list-group-flush">
                                {users.map(u => (
                                    <li key={u.id} className="list-group-item bg-transparent border-secondary d-flex align-items-center">
                                        <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3"
                                             style={{ width: '40px', height: '40px' }}>
                                            {u.username.charAt(0).toUpperCase()}
                                        </div>
                                        <Link 
                                            to={`/user/${u.id}`} 
                                            className="text-white text-decoration-none fw-bold flex-grow-1"
                                            onClick={onClose} // Chiude il modale se clicchi
                                        >
                                            {u.username}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserListModal;