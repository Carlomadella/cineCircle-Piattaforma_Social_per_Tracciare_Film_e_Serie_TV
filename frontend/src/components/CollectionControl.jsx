import React, { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CollectionControl = ({ contentId }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState(""); // Stato vuoto all'inizio
    const [loading, setLoading] = useState(false);

    // Se l'utente non è loggato, mostriamo un avviso
    if (!user) {
        return (
            <p className="small text-white-50">
                <a href="/login" className="text-danger">Accedi</a> per aggiungere questo titolo alla tua lista.
            </p>
        );
    }

    // Funzione chiamata quando l'utente cambia il menu a tendina
    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        console.log("Invio aggiornamento collezione:", newStatus);

        // Chiamata API: POST /my-collection
        api.post('/my-collection', {
            content_id: contentId,
            status: newStatus
        })
        .then((res) => {
            console.log("Salvato:", res.data);
            setLoading(false);
            alert("Collezione aggiornata!");
        })
        .catch((err) => {
            console.error("Errore salvataggio:", err);
            setLoading(false);
            alert("Errore! Forse è già nella lista?");
        });
    };

    return (
        <div className="d-flex align-items-center">
            <select 
                className="form-select bg-dark text-white border-secondary" 
                style={{ maxWidth: '250px' }}
                value={status}
                onChange={handleStatusChange}
                disabled={loading}
            >
                <option value="" disabled>Seleziona uno stato...</option>
                <option value="want_to_watch">📅 Voglio vederlo</option>
                <option value="watching">👀 Sto guardando</option>
                <option value="watched">✅ Visto</option>
                <option value="dropped">❌ Abbandonato</option>
            </select>
            
            {loading && <span className="ms-3 text-warning">Salvataggio...</span>}
        </div>
    );
};

export default CollectionControl;