import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ToastNotification from './ToastNotification';

const CollectionControl = ({ contentId }) => {
    const { user } = useAuth();
    const [status, setStatus] = useState(""); // Stato iniziale vuoto
    const [loading, setLoading] = useState(false);
    const [toastMessage, setToastMessage] = useState(null);

    // --- NUOVO: AL CARICAMENTO, CONTROLLIAMO SE IL FILM È GIÀ IN LISTA ---
    useEffect(() => {
        if (user && contentId) {
            // Chiamata alla nuova rotta che abbiamo appena creato
            api.get(`/my-collection/check/${contentId}`)
                .then((res) => {
                    // Se il server risponde con uno stato (es. 'watched'), lo impostiamo
                    if (res.data.status) {
                        setStatus(res.data.status);
                    }
                })
                .catch((err) => console.error("Errore controllo stato:", err));
        }
    }, [contentId, user]); // Si riattiva se cambia il film o l'utente

    if (!user) {
        return <p className="small text-white-50"><a href="/login" className="text-danger">Accedi</a> per aggiungere.</p>;
    }

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus); // Aggiorniamo subito visivamente
        setLoading(true);

        api.post('/my-collection', {
            content_id: contentId,
            status: newStatus
        })
        .then((res) => {
            setLoading(false);
            setToastMessage("Collezione aggiornata!");
        })
        .catch((err) => {
            console.error(err);
            setLoading(false);
            setToastMessage("Errore salvataggio.");
        });
    };

    return (
        <div className="d-flex align-items-center position-relative">
            {toastMessage && (
                <ToastNotification 
                    message={toastMessage} 
                    onClose={() => setToastMessage(null)} 
                />
            )}

            <div className="w-100">
                {/* Etichetta visiva dello stato corrente (Opzionale, per chiarezza) */}
                {status && (
                    <small className="d-block text-success mb-1">
                        <i className="fas fa-check me-1"></i> 
                        Attualmente: {
                            status === 'watched' ? 'Visto' : 
                            status === 'want_to_watch' ? 'Da Vedere' : 
                            status === 'watching' ? 'In Corso' : 'Abbandonato'
                        }
                    </small>
                )}

                <select 
                    className="form-select bg-dark text-white border-secondary" 
                    style={{ maxWidth: '250px' }}
                    value={status} // Qui leghiamo il valore allo stato
                    onChange={handleStatusChange}
                    disabled={loading}
                >
                    <option value="" disabled>Aggiungi alla lista...</option>
                    <option value="want_to_watch">📅 Voglio vederlo</option>
                    <option value="watching">👀 Sto guardando</option>
                    <option value="watched">✅ Visto</option>
                    <option value="dropped">❌ Abbandonato</option>
                </select>
            </div>
            
            {loading && <div className="spinner-border spinner-border-sm text-warning ms-2"></div>}
        </div>
    );
};

export default CollectionControl;