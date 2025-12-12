import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const PublicProfilePage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    
    // Stati Dati
    const [stats, setStats] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);
    const [profileUser, setProfileUser] = useState(null); // Per avere il nome utente nell'header (opzionale se non lo passa l'API stats)
    
    // Stati Tab
    const [activeTab, setActiveTab] = useState('activity'); // 'activity', 'followers', 'following'
    const [tabData, setTabData] = useState([]); // I dati da mostrare nel tab corrente
    const [loadingTab, setLoadingTab] = useState(false);

    // Caricamento Iniziale (Stats e Follow Status)
    useEffect(() => {
        // Carichiamo info base
        api.get(`/users/${id}/stats`).then(res => setStats(res.data.stats));
        
        // Check Follow
        if (user && user.id !== parseInt(id)) {
            api.get(`/follow/status/${id}`)
               .then(res => setIsFollowing(res.data.isFollowing))
               .catch(err => console.error(err));
        }
        
        // Carichiamo il tab di default (Activity)
        loadTabContent('activity');

    }, [id, user]);

    // Funzione per caricare i dati in base al tab cliccato
    const loadTabContent = (tabName) => {
        setActiveTab(tabName);
        setLoadingTab(true);
        
        let endpoint = '';
        if (tabName === 'activity') endpoint = `/users/${id}/activity`;
        if (tabName === 'followers') endpoint = `/users/${id}/followers`;
        if (tabName === 'following') endpoint = `/users/${id}/following`;

        api.get(endpoint)
            .then(res => {
                setTabData(res.data);
                setLoadingTab(false);
            })
            .catch(err => {
                console.error(err);
                setLoadingTab(false);
            });
    };

    // Fix Logica Bottone Segui
    const handleFollowToggle = () => {
        // Se sto seguendo, faccio DELETE, altrimenti POST
        const request = isFollowing ? api.delete(`/follow/${id}`) : api.post(`/follow/${id}`);

        request.then(() => {
            // Invertiamo lo stato manualmente subito dopo il successo
            setIsFollowing(!isFollowing);
            // Opzionale: ricaricare i followers se siamo in quel tab
            if (activeTab === 'followers') loadTabContent('followers');
        })
        .catch(err => console.error("Errore follow:", err));
    };

    return (
        <div className="container mt-5">
            {/* HEADER PROFILO */}
            <div className="card p-5 text-center shadow-lg border-0 mb-4" style={{ backgroundColor: '#1F1F1F' }}>
                <div className="mx-auto mb-3 rounded-circle d-flex justify-content-center align-items-center fw-bold text-white shadow" 
                     style={{ width: '100px', height: '100px', fontSize: '3rem', background: '#333' }}>
                    <i className="fas fa-user"></i>
                </div>
                
                <h2 className="text-white">Profilo #{id}</h2>

                {/* BOTTONE SEGUI */}
                {user && user.id !== parseInt(id) && (
                    <div className="mt-3">
                        <button 
                            className={`btn px-4 ${isFollowing ? 'btn-outline-light' : 'btn-danger'}`}
                            onClick={handleFollowToggle}
                        >
                            {isFollowing ? (
                                <span><i className="fas fa-check me-2"></i> Segui già</span>
                            ) : (
                                <span><i className="fas fa-plus me-2"></i> Segui</span>
                            )}
                        </button>
                    </div>
                )}

                {/* STATISTICHE (Solo visualizzazione) */}
                <div className="row justify-content-center mt-4 text-white-50">
                    <div className="col-auto mx-3">
                        <strong className="d-block text-white fs-4">{stats?.watched_count || 0}</strong> Film Visti
                    </div>
                    <div className="col-auto mx-3">
                        <strong className="d-block text-white fs-4">{stats?.reviews_count || 0}</strong> Recensioni
                    </div>
                </div>
            </div>

            {/* NAVIGAZIONE TABS */}
            <ul className="nav nav-tabs border-secondary mb-4">
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'activity' ? 'active bg-danger text-white border-danger' : 'text-white-50 bg-transparent border-transparent'}`}
                        onClick={() => loadTabContent('activity')}
                    >
                        Attività
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'followers' ? 'active bg-danger text-white border-danger' : 'text-white-50 bg-transparent border-transparent'}`}
                        onClick={() => loadTabContent('followers')}
                    >
                        Followers
                    </button>
                </li>
                <li className="nav-item">
                    <button 
                        className={`nav-link ${activeTab === 'following' ? 'active bg-danger text-white border-danger' : 'text-white-50 bg-transparent border-transparent'}`}
                        onClick={() => loadTabContent('following')}
                    >
                        Seguiti
                    </button>
                </li>
            </ul>

            {/* CONTENUTO TAB */}
            <div className="tab-content min-vh-50">
                {loadingTab && <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>}

                {!loadingTab && (
                    <>
                        {/* CASO 1: ATTIVITÀ */}
                        {activeTab === 'activity' && (
                            <div className="list-group">
                                {tabData.length > 0 ? tabData.map(act => (
                                    <div key={act.id} className="list-group-item bg-dark border-secondary text-white p-3 mb-2 rounded d-flex align-items-center">
                                        <img src={act.poster_url} className="rounded me-3" style={{width: '40px', height: '60px', objectFit: 'cover'}} />
                                        <div>
                                            <span className="text-white-50 small">
                                                {act.activity_type === 'review' && 'Ha recensito'}
                                                {act.activity_type === 'watched' && 'Ha visto'}
                                                {act.activity_type === 'want_to_watch' && 'Vuole vedere'}
                                            </span>
                                            <Link to={`/content/${act.content_id}`} className="d-block text-danger fw-bold text-decoration-none">
                                                {act.title}
                                            </Link>
                                        </div>
                                    </div>
                                )) : <p className="text-white-50">Nessuna attività.</p>}
                            </div>
                        )}

                        {/* CASO 2 & 3: LISTA UTENTI (Followers / Following) */}
                        {(activeTab === 'followers' || activeTab === 'following') && (
                            <div className="row g-3">
                                {tabData.length > 0 ? tabData.map(u => (
                                    <div key={u.id} className="col-md-4">
                                        <div className="card bg-dark border-secondary p-3 d-flex flex-row align-items-center">
                                            <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-white me-3" 
                                                 style={{ width: '50px', height: '50px' }}>
                                                {u.username.charAt(0).toUpperCase()}
                                            </div>
                                            <Link to={`/user/${u.id}`} className="text-white fw-bold text-decoration-none stretched-link">
                                                {u.username}
                                            </Link>
                                        </div>
                                    </div>
                                )) : <p className="text-white-50">Nessun utente trovato.</p>}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PublicProfilePage;