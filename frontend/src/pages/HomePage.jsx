import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ContentCarousel from '../components/ContentCarousel';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const { user } = useAuth();
    
    // Stati per i dati
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Inizio caricamento Home...");

        // 1. Prima chiamiamo i FILM
        api.get('/contents?type=movie')
            .then(function(resMovies) {
                console.log("Film caricati:", resMovies.data.results.length);
                setMovies(resMovies.data.results);

                // 2. Una volta finiti i film, chiamiamo le SERIE
                return api.get('/contents?type=tv_series');
            })
            .then(function(resSeries) {
                console.log("Serie caricate:", resSeries.data.results.length);
                setSeries(resSeries.data.results);
                
                // 3. Tutto finito, spegniamo il caricamento
                setLoading(false);
            })
            .catch(function(err) {
                console.error("Errore caricamento dati:", err);
                setLoading(false);
            });

    }, []);

    return (
        <div className="container-fluid px-0">
            
            {/* HERO SECTION CORRETTA */}
            {/* Usiamo un div relativo per contenere sfondo e testo */}
            <div className="position-relative text-center p-5 mb-4" 
                 style={{ 
                     backgroundColor: '#141414',
                     backgroundImage: 'linear-gradient(to bottom, rgba(229, 9, 20, 0.4), #141414)',
                     borderBottom: '1px solid #333',
                     color: 'white'
                 }}>
                
                <div className="col-lg-6 col-md-8 mx-auto py-5">
                    <h1 className="display-4 fw-bold">Bentornato su CineCircle 🍿</h1>
                    
                    {user ? (
                        <p className="lead mb-4">
                            Ciao <strong>{user.username}</strong>, ecco cosa c'è di nuovo per te oggi.
                        </p>
                    ) : (
                        <p className="lead mb-4">
                            Il tuo diario cinematografico digitale. Tieni traccia di film e serie TV.
                        </p>
                    )}

                    {/* Bottoni Azione */}
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/search" className="btn btn-primary btn-lg px-4 gap-3">
                            Esplora Catalogo
                        </Link>
                        {!user && (
                            <Link to="/register" className="btn btn-outline-light btn-lg px-4">
                                Registrati Gratis
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* CONTENUTO PRINCIPALE */}
            <div className="container pb-5">
                
                {/* Spinner di Caricamento */}
                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" role="status" style={{ width: '3rem', height: '3rem' }}>
                            <span className="visually-hidden">Caricamento...</span>
                        </div>
                    </div>
                )}

                {/* Sezione Film */}
                {!loading && movies.length > 0 && (
                    <ContentCarousel 
                        title="Film Popolari" 
                        contents={movies} 
                    />
                )}

                {/* Sezione Serie TV */}
                {!loading && series.length > 0 && (
                    <ContentCarousel 
                        title="Serie TV del momento" 
                        contents={series} 
                    />
                )}
                
                {/* Messaggio se vuoto */}
                {!loading && movies.length === 0 && series.length === 0 && (
                    <div className="text-center py-5 text-muted">
                        <h3>Nessun contenuto trovato nel database.</h3>
                        <p>Assicurati di aver popolato la tabella 'contents' nel backend.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;