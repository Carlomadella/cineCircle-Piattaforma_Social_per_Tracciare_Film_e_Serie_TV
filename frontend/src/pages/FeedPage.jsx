import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const FeedPage = () => {
    // Stato per memorizzare le attività scaricate dal server
    const [activities, setActivities] = useState([]);
    // Stato di caricamento
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Chiamiamo l'endpoint che abbiamo appena testato
        api.get('/feed')
            .then((res) => {
                console.log("Feed ricevuto:", res.data);
                setActivities(res.data.feed);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore caricamento feed:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-white mb-4 border-start border-4 border-danger ps-3">
                Feed Social 🌍
            </h2>

            {/* Spinner mentre carica */}
            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-danger"></div>
                </div>
            )}

            {/* Se non ci sono attività e ha finito di caricare */}
            {!loading && activities.length === 0 && (
                <div className="text-center py-5 text-white-50">
                    <h4>Il tuo feed è silenzioso... 🦗</h4>
                    <p>Inizia a seguire altri utenti per vedere cosa guardano!</p>
                    <Link to="/search" className="btn btn-outline-light mt-3">Trova film</Link>
                </div>
            )}

            {/* Lista delle attività */}
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {activities.map((act) => (
                        <div key={act.id} className="card mb-3 shadow-sm" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                            <div className="card-body d-flex align-items-center">
                                
                                {/* Avatar Utente (Cliccabile -> Profilo Pubblico) */}
                                <Link to={`/user/${act.user_id}`}>
                                    <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow" 
                                         style={{ width: '50px', height: '50px', background: 'linear-gradient(45deg, #E50914, #ff6b6b)' }}>
                                        {/* Prendiamo la prima lettera dello username */}
                                        {act.username.charAt(0).toUpperCase()}
                                    </div>
                                </Link>

                                <div className="flex-grow-1">
                                    <p className="mb-1 text-white">
                                        {/* Nome Utente */}
                                        <Link to={`/user/${act.user_id}`} className="fw-bold text-white text-decoration-none hover-underline">
                                            {act.username}
                                        </Link>
                                        
                                        {/* Tipo di azione */}
                                        <span className="mx-1 text-white-50">
                                            {act.activity_type === 'review' && 'ha recensito'}
                                            {act.activity_type === 'watched' && 'ha visto'}
                                            {act.activity_type === 'want_to_watch' && 'vuole vedere'}
                                        </span>

                                        {/* Titolo Film */}
                                        <Link to={`/content/${act.content_id}`} className="fw-bold text-danger text-decoration-none">
                                            {act.title}
                                        </Link>
                                    </p>
                                    
                                    {/* Data relativa o formattata */}
                                    <small className="text-muted">
                                        {new Date(act.created_at).toLocaleDateString()} alle {new Date(act.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </small>
                                </div>

                                {/* Piccola locandina a destra */}
                                <Link to={`/content/${act.content_id}`}>
                                    <img 
                                        src={act.poster_url} 
                                        alt="poster" 
                                        className="rounded"
                                        style={{ width: '45px', height: '65px', objectFit: 'cover' }}
                                    />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;