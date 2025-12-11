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
    const [watchingList, setWatchingList] = useState([]); // <--- NUOVO: Lista "Sto guardando"
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Inizio caricamento Home...");

        // Usiamo la catena di .then() per caricare tutto in sequenza
        
        // 1. Carica FILM
        api.get('/contents?type=movie')
            .then(function(resMovies) {
                setMovies(resMovies.data.results);
                // 2. Carica SERIE
                return api.get('/contents?type=tv_series');
            })
            .then(function(resSeries) {
                setSeries(resSeries.data.results);
                
                // 3. SE L'UTENTE È LOGGATO, carica la sua collezione
                if (user) {
                    return api.get('/my-collection');
                } else {
                    // Se non è loggato, ritorna una promessa vuota per non rompere la catena
                    return Promise.resolve({ data: [] });
                }
            })
            .then(function(resCollection) {
                // 4. Filtriamo solo quelli "In corso" (watching)
                const collection = resCollection.data;
                const inCorso = collection.filter(item => item.status === 'watching');
                setWatchingList(inCorso);
                
                setLoading(false);
            })
            .catch(function(err) {
                console.error("Errore dati home:", err);
                setLoading(false);
            });

    }, [user]); // Si riaggiorna se l'utente fa login/logout

    return (
        <div className="container-fluid px-0">
            
            {/* HERO SECTION (Rimasta uguale) */}
            <div className="position-relative text-center p-5 mb-4" 
                 style={{ 
                     backgroundColor: '#141414',
                     backgroundImage: 'linear-gradient(to bottom, rgba(229, 9, 20, 0.4), #141414)',
                     borderBottom: '1px solid #333',
                     color: 'white'
                 }}>
                <div className="col-lg-6 col-md-8 mx-auto py-5">
                    <h1 className="display-4 fw-bold">Benvenuto su CineCircle 🍿</h1>
                    {user ? (
                        <p className="lead mb-4">Ciao <strong>{user.username}</strong>, ecco il tuo cinema personale.</p>
                    ) : (
                        <p className="lead mb-4">Il tuo diario cinematografico digitale.</p>
                    )}
                    <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                        <Link to="/search" className="btn btn-primary btn-lg px-4 gap-3">Esplora Catalogo</Link>
                    </div>
                </div>
            </div>

            {/* CONTENUTO PRINCIPALE */}
            <div className="container pb-5">
                
                {loading && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-danger" role="status"></div>
                    </div>
                )}

                {/* 1. SEZIONE "CONTINUA A GUARDARE" (Nuova) */}
                {!loading && user && watchingList.length > 0 && (
                    <div className="mb-5">
                        {/* Usiamo il carosello standard ma con titolo personalizzato */}
                        <ContentCarousel 
                            title="👀 Continua a guardare" 
                            contents={watchingList} 
                        />
                    </div>
                )}

                {/* 2. Sezione Film */}
                {!loading && movies.length > 0 && (
                    <ContentCarousel title="🎬 Film Popolari" contents={movies} />
                )}

                {/* 3. Sezione Serie TV */}
                {!loading && series.length > 0 && (
                    <ContentCarousel title="📺 Serie TV del momento" contents={series} />
                )}
            </div>
        </div>
    );
};

export default HomePage;