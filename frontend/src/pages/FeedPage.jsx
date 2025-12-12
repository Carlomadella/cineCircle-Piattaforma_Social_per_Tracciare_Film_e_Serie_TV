import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import useDebounce from '../hooks/useDebounce'; // Usiamo l'hook che avevamo creato per la navbar

const FeedPage = () => {
    // Stati Feed
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Stati Ricerca Utenti
    const [userSearch, setUserSearch] = useState("");
    const [userResults, setUserResults] = useState([]);
    const debouncedUserSearch = useDebounce(userSearch, 500); // Ritarda la chiamata

    // 1. Caricamento Feed Iniziale
    useEffect(() => {
        loadFeed();
    }, []);

    const loadFeed = () => {
        setLoading(true);
        api.get('/feed')
            .then((res) => {
                setActivities(res.data.feed);
                setLoading(false);
            })
            .catch((err) => { 
                console.error(err); 
                setLoading(false); 
            });
    };

    // 2. Gestione Ricerca Utenti (scatta quando finisci di scrivere)
    useEffect(() => {
        if (debouncedUserSearch) {
            api.get(`/users/search?q=${debouncedUserSearch}`)
                .then(res => setUserResults(res.data))
                .catch(err => console.error(err));
        } else {
            setUserResults([]); // Se cancelli, pulisci i risultati
        }
    }, [debouncedUserSearch]);

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    
                    {/* Header e Barra Ricerca */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-white border-start border-4 border-danger ps-3 m-0">
                            Feed Social 🌍
                        </h2>
                    </div>

                    {/* Input Ricerca Utente */}
                    <div className="mb-4">
                        <input 
                            type="text" 
                            className="form-control bg-dark text-white border-secondary"
                            placeholder="Cerca un utente da seguire..."
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                        />
                    </div>

                    {/* RISULTATI RICERCA UTENTI (Appaiono se scrivi qualcosa) */}
                    {userSearch && (
                        <div className="mb-5">
                            <h5 className="text-white-50 mb-3">Risultati utenti per "{userSearch}"</h5>
                            {userResults.length > 0 ? (
                                <div className="list-group">
                                    {userResults.map(u => (
                                        <Link key={u.id} to={`/user/${u.id}`} className="list-group-item list-group-item-action bg-dark text-white border-secondary d-flex align-items-center">
                                            <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white fw-bold me-3" 
                                                 style={{ width: '40px', height: '40px' }}>
                                                {u.username.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="fw-bold">{u.username}</span>
                                            <span className="ms-auto text-muted small">Vedi Profilo <i className="fas fa-chevron-right ms-1"></i></span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted">Nessun utente trovato.</p>
                            )}
                            <hr className="border-secondary my-4" />
                        </div>
                    )}

                    {/* FEED ATTIVITÀ (Visibile solo se non stai cercando, oppure sotto) */}
                    {!userSearch && (
                        <>
                            {loading && <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>}

                            {!loading && activities.length === 0 ? (
                                <div className="text-center py-5 text-white-50">
                                    <h4>Tutto tace... 🦗</h4>
                                    <p>Il feed è vuoto. Usa la barra sopra per cercare amici!</p>
                                </div>
                            ) : (
                                activities.map((act) => (
                                    <div key={act.id} className="card mb-3 shadow-sm border-0" style={{ backgroundColor: '#1F1F1F' }}>
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-2">
                                                <Link to={`/user/${act.user_id}`} className="text-decoration-none">
                                                    <div className="rounded-circle d-flex justify-content-center align-items-center text-white fw-bold me-3 shadow-sm" 
                                                         style={{ width: '45px', height: '45px', background: 'linear-gradient(45deg, #E50914, #ff6b6b)' }}>
                                                        {act.username.charAt(0).toUpperCase()}
                                                    </div>
                                                </Link>
                                                <div>
                                                    <Link to={`/user/${act.user_id}`} className="fw-bold text-white text-decoration-none hover-underline">
                                                        {act.username}
                                                    </Link>
                                                    <span className="text-white-50 mx-2">•</span>
                                                    <small className="text-muted">{new Date(act.created_at).toLocaleDateString()}</small>
                                                </div>
                                            </div>
                                            
                                            <div className="ps-5 ms-2">
                                                <p className="text-white-50 mb-1">
                                                    {act.activity_type === 'review' && 'Ha scritto una recensione per'}
                                                    {act.activity_type === 'watched' && 'Ha guardato'}
                                                    {act.activity_type === 'want_to_watch' && 'Vuole vedere'}
                                                    {' '}
                                                    <Link to={`/content/${act.content_id}`} className="fw-bold text-danger text-decoration-none">
                                                        {act.title}
                                                    </Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FeedPage;