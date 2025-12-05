import React, { useState } from 'react';
import api from '../services/api';
import ContentCard from '../components/ContentCard';

const SearchPage = () => {
    const [keyword, setKeyword] = useState("");
    const [type, setType] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    // Funzione per cercare
    const handleSearch = (e) => {
        if (e) e.preventDefault();
        // Se non c'è testo e non c'è tipo, non fare nulla o resetta
        if (!keyword && !type) return;

        setLoading(true);
        setSearched(true);

        let url = `/contents?keyword=${keyword}`;
        if (type) url += `&type=${type}`;

        api.get(url)
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

    // Funzione per cancellare tutto (la croce)
    const handleClear = () => {
        setKeyword("");
        setResults([]);
        setSearched(false);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-white mb-4">Esplora il Catalogo 🔎</h2>

            <div className="card p-4 mb-5" style={{ backgroundColor: '#1F1F1F', border: '1px solid #333' }}>
                <form onSubmit={handleSearch}>
                    <div className="row g-2 align-items-center">
                        
                        {/* Input Testo con Croce */}
                        <div className="col-md-7 position-relative">
                            <input 
                                type="text" 
                                className="form-control form-control-lg bg-dark text-white border-secondary pe-5" // pe-5 lascia spazio alla croce
                                placeholder="Titolo film o serie..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            {/* Croce "X" che appare solo se c'è testo */}
                            {keyword && (
                                <span 
                                    onClick={handleClear}
                                    style={{ 
                                        position: 'absolute', 
                                        right: '20px', 
                                        top: '50%', 
                                        transform: 'translateY(-50%)', 
                                        cursor: 'pointer',
                                        color: '#E50914',
                                        fontSize: '1.2rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ✕
                                </span>
                            )}
                        </div>

                        {/* Filtro Tipo */}
                        <div className="col-md-3">
                            <select 
                                className="form-select form-select-lg bg-dark text-white border-secondary"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <option value="">Tutto</option>
                                <option value="movie">Solo Film</option>
                                <option value="tv_series">Solo Serie TV</option>
                            </select>
                        </div>

                        {/* Bottone Cerca */}
                        <div className="col-md-2">
                            <button type="submit" className="btn btn-primary btn-lg w-100">
                                Cerca
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            {/* RISULTATI */}
            {loading && <div className="text-center py-5"><div className="spinner-border text-danger"></div></div>}

            <div className="row g-3"> {/* g-3 riduce lo spazio tra le card */}
                {!loading && results.length > 0 && results.map((item) => (
                    // QUI DEFINIAMO LA GRIGLIA: 
                    // col-6 (2 per riga su mobile)
                    // col-md-4 (3 per riga su tablet)
                    // col-lg-3 (4 per riga su desktop)
                    <div key={item.id} className="col-6 col-md-4 col-lg-3">
                        <ContentCard content={item} />
                    </div>
                ))}

                {!loading && searched && results.length === 0 && (
                    <div className="col-12 text-center text-white-50 mt-4">
                        <h4>Nessun risultato trovato.</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;