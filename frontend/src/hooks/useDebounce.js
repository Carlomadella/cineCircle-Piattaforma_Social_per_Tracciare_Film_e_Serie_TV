import { useState, useEffect } from 'react';

// Questo Hook serve a ritardare l'aggiornamento di una variabile
// È utile per non fare una chiamata API per ogni singola lettera digitata
const useDebounce = (value, delay) => {
    // Stato interno per tenere il valore "ritardato"
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        // Impostiamo un timer: tra 'delay' millisecondi, aggiorna il valore
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Funzione di pulizia: se l'utente scrive ancora prima che il tempo sia scaduto,
        // cancelliamo il timer vecchio e ne facciamo partire uno nuovo.
        // Questo è il trucco che ferma le chiamate multiple!
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]); // Si riattiva ogni volta che il valore o il ritardo cambiano

    // Restituiamo il valore che si aggiorna solo dopo la pausa
    return debouncedValue;
};

export default useDebounce;