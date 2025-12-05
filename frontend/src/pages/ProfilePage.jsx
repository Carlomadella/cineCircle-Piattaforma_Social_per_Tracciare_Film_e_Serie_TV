import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ContentCard from '../components/ContentCard';

const ProfilePage = () => {
    const { user } = useAuth();
    const [collection, setCollection] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);

    useEffect(() => {
        api.get('/my-collection')
            .then((res) => {
                setCollection(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore profilo:", err);
                setLoading(false);
            });
    }, []);

    // Filtriamo la collezione in base allo stato
    const watched = collection.filter(item => item.status === 'watched');
    const wantToWatch = collection.filter(item => item.status === 'want_to_watch');
    const watching = collection.filter(item => item.status === 'watching');
    const dropped = collection.filter(item => item.status === 'dropped');

    if (!user) return <div className="text-white p-5">Devi fare login.</div>;

    return (
        <div className="container mt-5">
            {/* HEADER PROFILO */}
            <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle d-flex justify-content-center align-items-center fw-bold text-white shadow" 
                     style={{ width: '100px', height: '100px', fontSize: '3rem', background: 'linear-gradient(45deg, #E50914, #ff6b6b)' }}>
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <div className="ms-4">
                    <h1 className="mb-1 text-white fw-bold">{user.username}</h1>
                    <button className="btn btn-sm btn-outline-secondary mt-2" onClick={() => setShowInfo(!showInfo)}>
                        {showInfo ? "Nascondi Dettagli 🔼" : "Mostra Dettagli Personali 🔽"}
                    </button>
                </div>
            </div>

            {/* INFO NASCOSTE */}
            {showInfo && (
                <div className="card mb-5 p-3 text-white" style={{ backgroundColor: '#2a2a2a', border: '1px solid #444' }}>
                    <div className="row">
                        <div className="col-md-12">
                            <p className="fs-5 mb-0"><span className="text-white-50 me-2">Email:</span> {user.email}</p>
                        </div>
                    </div>
                </div>
            )}

            <h2 className="text-white mb-4 border-bottom border-secondary pb-3">La mia Collezione</h2>

            {loading && <div className="spinner-border text-danger"></div>}

            {/* SEZIONI DIVISE */}
            {!loading && (
                <>
                    <CategorySection title="✅ Visti" items={watched} color="success" />
                    <CategorySection title="📅 Da Vedere" items={wantToWatch} color="warning" />
                    <CategorySection title="👀 In Corso" items={watching} color="info" />
                    {dropped.length > 0 && <CategorySection title="❌ Abbandonati" items={dropped} color="danger" />}
                    
                    {collection.length === 0 && (
                        <p className="text-white-50 text-center py-5">Nessun film nella collezione.</p>
                    )}
                </>
            )}
        </div>
    );
};

// Sotto-componente per gestire ogni sezione
const CategorySection = ({ title, items, color }) => {
    const [expanded, setExpanded] = useState(false);
    
    // Se non ci sono item in questa categoria, non mostrare nulla
    if (items.length === 0) return null;

    // Se espanso mostra tutti, altrimenti solo i primi 4
    const itemsToShow = expanded ? items : items.slice(0, 4);

    return (
        <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className={`text-${color} mb-0`}>{title} <span className="text-white-50 fs-6">({items.length})</span></h4>
                {items.length > 4 && (
                    <button onClick={() => setExpanded(!expanded)} className="btn btn-sm btn-outline-light">
                        {expanded ? "Mostra Meno" : "Vedi Tutti"}
                    </button>
                )}
            </div>
            
            <div className="row g-3">
                {itemsToShow.map((item) => (
                    <div key={item.id} className="col-6 col-md-3">
                        <ContentCard content={item} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;