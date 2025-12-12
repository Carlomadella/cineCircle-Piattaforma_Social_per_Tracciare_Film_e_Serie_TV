import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ContentCard from '../components/ContentCard';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
    const { user } = useAuth();
    const [collection, setCollection] = useState([]);
    const [activities, setActivities] = useState([]); // <--- NUOVO STATO
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        // Facciamo due chiamate parallele: Collezione e Attività
        // Usiamo il metodo .then annidato come richiesto (senza Promise.all)
        api.get('/my-collection')
            .then((resColl) => {
                setCollection(resColl.data);
                
                // Ora chiamiamo le attività
                return api.get('/my-activity');
            })
            .then((resAct) => {
                setActivities(resAct.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore profilo:", err);
                setLoading(false);
            });
    }, []);

    // Filtri per la collezione...
    const watched = collection.filter(item => item.status === 'watched');
    const wantToWatch = collection.filter(item => item.status === 'want_to_watch');
    const watching = collection.filter(item => item.status === 'watching');
    const dropped = collection.filter(item => item.status === 'dropped');

    if (!user) return <div className="text-white p-5">Devi fare login.</div>;

    return (
        <div className="container mt-5">
            {/* NUOVO: Tasto Indietro */}
            <div className="mb-4">
                <Link to="/" className="text-white-50 text-decoration-none hover-underline">
                    <i className="fas fa-arrow-left me-2"></i> Torna alla Home
                </Link>
            </div>
            <div className="row">
                {/* COLONNA SINISTRA: Info Utente e Attività */}
                <div className="col-md-4 mb-5">
                    
                    {/* CARD PROFILO */}
                    <div className="text-center p-4 rounded mb-4" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                        <div className="rounded-circle d-inline-flex justify-content-center align-items-center fw-bold text-white shadow mb-3" 
                             style={{ width: '100px', height: '100px', fontSize: '3rem', background: 'linear-gradient(45deg, #E50914, #ff6b6b)' }}>
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-white fw-bold">{user.username}</h2>
                        <p className="text-white-50 small mb-3">{user.email}</p>
                        
                        <div className="d-flex justify-content-around text-center mt-4">
                            <div>
                                <h5 className="mb-0 fw-bold text-white">{collection.length}</h5>
                                <small className="text-muted">Titoli</small>
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold text-white">{watched.length}</h5>
                                <small className="text-muted">Visti</small>
                            </div>
                            <div>
                                <h5 className="mb-0 fw-bold text-white">{activities.length}</h5>
                                <small className="text-muted">Attività</small>
                            </div>
                        </div>
                    </div>

                    {/* FEED ATTIVITÀ (Timeline) */}
                    <h4 className="text-white mb-3 ps-2 border-start border-4 border-primary">
                        Ultime Attività
                    </h4>
                    <div className="list-group">
                        {activities.length > 0 ? (
                            activities.map((act) => (
                                <div key={act.id} className="list-group-item bg-dark border-secondary text-white p-3 mb-2 rounded">
                                    <div className="d-flex align-items-center">
                                        <img src={act.poster_url} alt="poster" className="rounded me-3" style={{width: '40px', height: '60px', objectFit: 'cover'}} />
                                        <div>
                                            <p className="mb-1 small">
                                                {/* Testo dinamico in base all'azione */}
                                                {act.activity_type === 'review' && <span className="text-warning">Ha recensito</span>}
                                                {act.activity_type === 'watched' && <span className="text-success">Ha visto</span>}
                                                {act.activity_type === 'want_to_watch' && <span className="text-info">Vuole vedere</span>}
                                                {' '}
                                                <Link to={`/content/${act.content_id}`} className="fw-bold text-white text-decoration-none">
                                                    {act.title}
                                                </Link>
                                            </p>
                                            <small className="text-muted" style={{fontSize: '0.75rem'}}>
                                                {new Date(act.created_at).toLocaleDateString()}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-white-50 small">Nessuna attività recente.</p>
                        )}
                    </div>

                </div>

                {/* COLONNA DESTRA: Collezione */}
                <div className="col-md-8">
                    <h2 className="text-white mb-4 border-bottom border-secondary pb-3">La mia Collezione</h2>
                    
                    {loading && <div className="spinner-border text-danger"></div>}

                    {!loading && (
                        <>
                            <CategorySection title="✅ Visti" items={watched} color="success" />
                            <CategorySection title="📅 Da Vedere" items={wantToWatch} color="warning" />
                            <CategorySection title="👀 In Corso" items={watching} color="info" />
                            {dropped.length > 0 && <CategorySection title="❌ Abbandonati" items={dropped} color="danger" />}
                            
                            {collection.length === 0 && (
                                <div className="text-center py-5 border border-secondary border-dashed rounded text-white-50">
                                    <h4>La tua collezione è vuota 🕸️</h4>
                                    <p>Cerca dei film e aggiungili per vederli qui!</p>
                                    <Link to="/search" className="btn btn-outline-light">Vai al Catalogo</Link>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// Sotto-componente per le categorie (rimasto uguale)
const CategorySection = ({ title, items, color }) => {
    const [expanded, setExpanded] = useState(false);
    if (items.length === 0) return null;
    const itemsToShow = expanded ? items : items.slice(0, 4);

    return (
        <>
            {/* NUOVO: Link per tornare indietro */}
            <div className="mb-4">
                <Link to="/" className="text-white-50 text-decoration-none hover-white">
                    <i className="fas fa-arrow-left me-2"></i> Torna alla Home
                </Link>
            </div>
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className={`text-${color} mb-0 fs-5`}>{title} <span className="text-muted ms-2 fs-6">{items.length}</span></h4>
                    {items.length > 4 && (
                        <button onClick={() => setExpanded(!expanded)} className="btn btn-sm btn-link text-white-50 text-decoration-none">
                            {expanded ? "Mostra Meno" : "Vedi Tutti"}
                        </button>
                    )}
                </div>
                <div className="row g-2">
                    {itemsToShow.map((item) => (
                        <div key={item.id} className="col-4 col-md-3">
                            <ContentCard content={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProfilePage;