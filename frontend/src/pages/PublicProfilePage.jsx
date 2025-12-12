import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const PublicProfilePage = () => {
    const { id } = useParams(); // ID dell'utente che stiamo visitando
    const { user } = useAuth(); // Noi (l'utente loggato)
    
    const [stats, setStats] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Carichiamo Statistiche e Stato Follow in parallelo (o sequenza)
        
        // 1. Carica Statistiche
        api.get(`/users/${id}/stats`)
            .then((resStats) => {
                setStats(resStats.data.stats);
                
                // 2. Controlla se lo seguiamo già
                // Nota: se visitiamo noi stessi, questa chiamata potrebbe non servire, ma la gestiamo
                if (user && user.id !== parseInt(id)) {
                    return api.get(`/follow/status/${id}`);
                } else {
                    return Promise.resolve({ data: { isFollowing: false } });
                }
            })
            .then((resFollow) => {
                setIsFollowing(resFollow.data.isFollowing);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore profilo pubblico:", err);
                setLoading(false);
            });
    }, [id, user]);

    // Gestione del click sul bottone Segui/Smetti
    const handleFollowToggle = () => {
        if (isFollowing) {
            // Smetti di seguire
            api.delete(`/follow/${id}`)
                .then(() => {
                    setIsFollowing(false);
                    alert("Non segui più questo utente.");
                })
                .catch(err => console.error(err));
        } else {
            // Inizia a seguire
            api.post(`/follow/${id}`)
                .then(() => {
                    setIsFollowing(true);
                    alert("Ora segui questo utente!");
                })
                .catch(err => console.error(err));
        }
    };

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;

    return (
        <div className="container mt-5">
            <div className="card p-5 text-center shadow-lg" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                
                {/* Avatar Generico */}
                <div className="mx-auto mb-3 rounded-circle d-flex justify-content-center align-items-center fw-bold text-white shadow" 
                     style={{ width: '120px', height: '120px', fontSize: '3rem', background: '#333' }}>
                    <i className="fas fa-user"></i>
                </div>

                <h2 className="text-white mb-4">Profilo Utente #{id}</h2>
                {/* Nota: Per mostrare il Nome Utente qui, dovremmo aggiungerlo all'API stats o passarlo via state */}

                {/* Se non siamo noi stessi, mostra il bottone */}
                {user && user.id !== parseInt(id) && (
                    <button 
                        className={`btn btn-lg mb-4 px-5 ${isFollowing ? 'btn-outline-light' : 'btn-danger'}`}
                        onClick={handleFollowToggle}
                    >
                        {isFollowing ? (
                            <span><i className="fas fa-check me-2"></i> Segui già</span>
                        ) : (
                            <span><i className="fas fa-plus me-2"></i> Segui</span>
                        )}
                    </button>
                )}

                {/* Statistiche */}
                <div className="row justify-content-center mt-4">
                    <div className="col-md-3 col-4">
                        <h3 className="fw-bold text-danger">{stats?.watched_count || 0}</h3>
                        <p className="text-white-50">Film Visti</p>
                    </div>
                    <div className="col-md-3 col-4">
                        <h3 className="fw-bold text-warning">{stats?.reviews_count || 0}</h3>
                        <p className="text-white-50">Recensioni</p>
                    </div>
                    <div className="col-md-3 col-4">
                        <h3 className="fw-bold text-info">{stats?.favorite_genre || '-'}</h3>
                        <p className="text-white-50">Genere Top</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicProfilePage;