import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import CollectionControl from '../components/CollectionControl';
import ReviewsSection from '../components/ReviewsSection';

const ContentDetailPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/contents/' + id)
            .then((response) => {
                setContent(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Errore dettaglio:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center mt-5"><div className="spinner-border text-danger"></div></div>;
    if (!content) return <div className="container mt-5 text-center text-white"><h2>Contenuto non trovato</h2></div>;

    const imageUrl = content.poster_url || "https://via.placeholder.com/400x600";

    return (
        <div className="container mt-5 mb-5 text-white">
            <div className="row">
                
                {/* COLONNA SINISTRA: Locandina */}
                <div className="col-md-4 mb-4">
                    <img 
                        src={imageUrl} 
                        alt={content.title} 
                        className="img-fluid rounded shadow-lg w-100"
                        style={{ border: '1px solid #333' }}
                    />
                </div>

                {/* COLONNA DESTRA: Info */}
                <div className="col-md-8">
                    <h1 className="fw-bold display-4 mb-2 text-danger">{content.title}</h1>
                    
                    {/* Meta Data riga */}
                    <div className="d-flex align-items-center mb-4 text-white-50 fs-5">
                        <span className="me-3">{content.year}</span>
                        <span className="me-3">•</span>
                        <span className="me-3">{content.type === 'movie' ? `${content.duration} min` : `${content.duration} Stagioni`}</span>
                        <span className="me-3">•</span>
                        <span className="text-warning">★ {content.average_rating || 0}</span>
                    </div>

                    {/* Sinossi (Spostata in alto) */}
                    <div className="mb-4">
                        <h4 className="text-white mb-2">Trama del film</h4>
                        <p className="lead fs-6" style={{ lineHeight: '1.8', color: '#e0e0e0' }}>
                            {content.description}
                        </p>
                    </div>

                    {/* Box Collezione */}
                    <div className="mb-4 p-3 rounded bg-dark border border-secondary">
                        <h6 className="text-white-50 mb-2">La tua lista</h6>
                        <CollectionControl contentId={content.id} />
                    </div>

                    {/* Box Dettagli Tecnici (Per riempire lo spazio) */}
                    <div className="card p-3" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                        <div className="row g-3">
                            <div className="col-md-6 border-end border-secondary">
                                <h6 className="text-danger">Regia / Creatore</h6>
                                <p className="fs-5 mb-0">{content.director}</p>
                            </div>
                            <div className="col-md-6">
                                <h6 className="text-danger">Cast Principale</h6>
                                <p className="fs-5 mb-0">{content.cast}</p>
                            </div>
                            {/* Aggiungiamo una riga extra per riempire */}
                            <div className="col-12 border-top border-secondary pt-3 mt-2">
                                <h6 className="text-danger">Genere</h6>
                                {/* Se avessimo i generi dal DB li metteremmo qui, per ora mettiamo placeholder dinamico basato sul tipo */}
                                <span className="badge bg-secondary me-1">{content.type === 'movie' ? 'Film' : 'Serie TV'}</span>
                                <span className="badge bg-secondary">Drammatico</span> {/* Placeholder */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* SEZIONE RECENSIONI */}
            <div className="mt-5 pt-4 border-top border-secondary">
                <ReviewsSection contentId={content.id} />
            </div>
        </div>
    );
};

export default ContentDetailPage;