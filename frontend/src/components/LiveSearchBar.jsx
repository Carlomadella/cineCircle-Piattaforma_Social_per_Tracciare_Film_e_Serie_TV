import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import useDebounce from '../hooks/useDebounce';

const LiveSearchBar = () => {
    // Stato per quello che l'utente scrive
    const [searchTerm, setSearchTerm] = useState("");
    // Stato per i risultati che arrivano dal server
    const [results, setResults] = useState([]);
    // Stato per mostrare o nascondere il menu a tendina
    const [showResults, setShowResults] = useState(false);
    
    // Usiamo il nostro hook: aggiorna 'debouncedSearch' solo dopo 500ms che l'utente ha smesso di scrivere
    const debouncedSearch = useDebounce(searchTerm, 500);
    
    // Serve per navigare quando premi Invio
    const navigate = useNavigate();
    
    // Serve per capire se clicchiamo fuori dal menu per chiuderlo (opzionale, per ora semplice)
    const wrapperRef = useRef(null);

    // Questo effetto parte ogni volta che cambia il termine "ritardato"
    useEffect(() => {
        // Se la barra è vuota, puliamo i risultati e non facciamo chiamate
        if (!debouncedSearch) {
            setResults([]);
            return;
        }

        console.log("Eseguo ricerca live per:", debouncedSearch);

        // Chiamata al backend
        api.get(`/contents?keyword=${debouncedSearch}`)
            .then((res) => {
                // Prendiamo i risultati (supportiamo sia formato array diretto che oggetto {results: []})
                const data = res.data.results || res.data;
                // Prendiamo solo i primi 5 per non intasare il menu
                setResults(data.slice(0, 5));
                setShowResults(true); // Mostriamo il menu
            })
            .catch((err) => {
                console.error("Errore live search:", err);
                setResults([]);
            });

    }, [debouncedSearch]); // Dipendenza: si attiva quando cambia debouncedSearch

    // Gestione del tasto Invio
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Evita il refresh del form
            setShowResults(false); // Chiudi il menu
            navigate(`/search?keyword=${searchTerm}`); // Vai alla pagina di ricerca completa
        }
    };

    // Pulizia quando clicchi un risultato
    const handleLinkClick = () => {
        setSearchTerm(""); // Pulisci la barra
        setShowResults(false); // Chiudi il menu
    };

    return (
        <div className="position-relative me-3" ref={wrapperRef} style={{ width: '250px' }}>
            {/* Input di ricerca */}
            <div className="input-group">
                <span className="input-group-text bg-dark border-secondary text-white-50">
                    <i className="fas fa-search"></i>
                </span>
                <input
                    type="text"
                    className="form-control bg-dark text-white border-secondary"
                    placeholder="Cerca film..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        // Se cancella tutto, nascondi subito
                        if (e.target.value === "") setShowResults(false);
                    }}
                    onKeyDown={handleKeyDown}
                    // Quando clicchi dentro, se c'è testo e risultati, riapri il menu
                    onFocus={() => { if (results.length > 0 && searchTerm) setShowResults(true); }}
                    // Ritardiamo il blur per permettere il click sui link
                    onBlur={() => setTimeout(() => setShowResults(false), 200)}
                />
            </div>

            {/* Menu a tendina dei risultati (Dropdown) */}
            {showResults && results.length > 0 && (
                <div className="position-absolute w-100 mt-1 shadow rounded search-dropdown">
                    <ul className="list-group list-group-flush">
                        {results.map((item) => (
                            <li key={item.id} className="list-group-item bg-dark border-secondary p-0">
                                <Link 
                                    to={`/content/${item.id}`} 
                                    className="d-flex align-items-center text-decoration-none text-white p-2 hover-bg-light"
                                    onClick={handleLinkClick} // Usa onMouseDown se onBlur dà problemi, ma proviamo onClick
                                >
                                    {/* Piccola locandina */}
                                    <img 
                                        src={item.poster_url || "https://via.placeholder.com/50"} 
                                        alt={item.title}
                                        style={{ width: '40px', height: '60px', objectFit: 'cover', borderRadius: '4px' }}
                                        className="me-3"
                                    />
                                    {/* Info Testuali */}
                                    <div className="text-truncate">
                                        <div className="fw-bold text-truncate">{item.title}</div>
                                        {/* MODIFICA QUI: Usiamo colori più chiari per il contrasto su sfondo scuro */}
                                        <small className="text-white-50">
                                            {item.year} • <span className="text-info">{item.type === 'movie' ? 'Film' : 'Serie'}</span>
                                        </small>
                                    </div>
                                </Link>
                            </li>
                        ))}
                        {/* Link per vedere tutti i risultati */}
                        <li className="list-group-item bg-dark border-secondary text-center p-2">
                            <Link 
                                to={`/search?keyword=${searchTerm}`}
                                className="small text-primary text-decoration-none"
                                onMouseDown={(e) => e.preventDefault()} // Previene il blur
                                onClick={handleLinkClick}
                            >
                                Vedi tutti i risultati
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LiveSearchBar;