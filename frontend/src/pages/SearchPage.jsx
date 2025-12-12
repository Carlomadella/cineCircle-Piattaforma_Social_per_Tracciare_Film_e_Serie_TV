import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ContentCard from '../components/ContentCard';
import { Link } from 'react-router-dom';

const SearchPage = () => {
    // Stati per i filtri
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [genre, setGenre] = useState("");     // <--- NUOVO
    const [year, setYear] = useState("");       // <--- NUOVO
    const [sort, setSort] = useState("popularity"); // <--- NUOVO
    
    // Dati
    const [results, setResults] = useState([]);
    const [genresList, setGenresList] = useState([]); // Per il menu a tendina
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Al caricamento, prendiamo la lista dei generi dal DB
    useEffect(() => {
        api.get('/genres')
            .then(res => setGenresList(res.data.genres))
            .catch(err => console.error("Errore generi:", err));
        
        // Opzionale: Carica subito dei risultati (es. i popolari) appena apri la pagina
        handleSearch(); 
    }, []);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setSearched(true);

        // Costruiamo l'URL con TUTTI i parametri
        // Esempio: /contents?keyword=Matrix&type=movie&genre=5&min_year=2000&sort=rating
        const params = new URLSearchParams();
        if (keyword) params.append('keyword', keyword);
        if (type) params.append('type', type);
        if (genre) params.append('genre', genre);
        if (sort) params.append('sort', sort);
        
        // Gestione anno: se l'utente sceglie "2020+", impostiamo min_year
        if (year) params.append('min_year', year);

        api.get(`/contents?${params.toString()}`)
            .then((res) => {
                const data = res.data.results || res.data;
                setResults(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Errore ricerca:", err);
                setLoading(false);
            });
    };

    const handleClear = () => {
        setKeyword("");
        setType("");
        setGenre("");
        setYear("");
        setSort("popularity");
        handleSearch(); // Ricarica pulito
    };

    return (
        <div className="container mt-5">
            <div className="mb-4">
                <Link to="/" className="text-white-50 text-decoration-none hover-underline">
                    <i className="fas fa-arrow-left me-2"></i> Home
                </Link>
            </div>

            <h2 className="text-white mb-4">Catalogo Completo 🔎</h2>

            <div className="card p-4 mb-5" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                <form onSubmit={handleSearch}>
                    {/* RIGA 1: Ricerca Testuale e Tipo */}
                    <div className="row g-3 mb-3">
                        <div className="col-md-9 position-relative">
                            <input 
                                type="text" 
                                className="form-control bg-dark text-white border-secondary"
                                placeholder="Cerca titolo..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {keyword && (
                                <span onClick={() => setKeyword("")} 
                                      style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', color: '#E50914' }}>
                                    ✕
                                </span>
                            )}
                        </div>
                        <div className="col-md-3">
                            <select className="form-select bg-dark text-white border-secondary" value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="">Tutti i Tipi</option>
                                <option value="movie">Solo Film</option>
                                <option value="tv_series">Solo Serie TV</option>
                            </select>
                        </div>
                    </div>

                    {/* RIGA 2: Filtri Avanzati */}
                    <div className="row g-3">
                        {/* Genere */}
                        <div className="col-md-4">
                            <select className="form-select bg-dark text-white border-secondary" value={genre} onChange={(e) => setGenre(e.target.value)}>
                                <option value="">Tutti i Generi</option>
                                {genresList.map(g => (
                                    <option key={g.id} value={g.id}>{g.genre_name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Anno (Range semplificati) */}
                        <div className="col-md-3">
                            <select className="form-select bg-dark text-white border-secondary" value={year} onChange={(e) => setYear(e.target.value)}>
                                <option value="">Qualsiasi Anno</option>
                                <option value="2024">2024+</option>
                                <option value="2020">Dal 2020 in poi</option>
                                <option value="2010">Dal 2010 in poi</option>
                                <option value="2000">Dal 2000 in poi</option>
                                <option value="1990">Anni 90 e oltre</option>
                            </select>
                        </div>

                        {/* Ordinamento */}
                        <div className="col-md-3">
                            <select className="form-select bg-dark text-white border-secondary" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="popularity">Più Popolari</option>
                                <option value="rating">Voto Migliore</option>
                                <option value="newest">Più Recenti</option>
                                <option value="oldest">Più Vecchi</option>
                            </select>
                        </div>

                        {/* Bottoni */}
                        <div className="col-md-2 d-flex gap-2">
                            <button type="submit" className="btn btn-primary w-100">Filtra</button>
                            <button type="button" onClick={handleClear} className="btn btn-outline-secondary"><i className="fas fa-undo"></i></button>
                        </div>
                    </div>
                </form>
            </div>

            {/* RISULTATI */}
            {loading && <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>}

            <div className="row g-3">
                {!loading && results.length > 0 ? (
                    results.map((item) => (
                        <div key={item.id} className="col-6 col-md-4 col-lg-3">
                            <ContentCard content={item} />
                        </div>
                    ))
                ) : (
                    !loading && searched && (
                        <div className="col-12 text-center text-white-50 mt-5">
                            <h4>Nessun risultato trovato 🕸️</h4>
                            <p>Prova a cambiare i filtri.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchPage;