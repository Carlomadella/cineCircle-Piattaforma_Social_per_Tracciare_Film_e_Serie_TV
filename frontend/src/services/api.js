import axios from 'axios';

// Definiamo l'URL del backend
// Se esiste nel file .env lo prende da lì, altrimenti usa localhost
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Creiamo la "connessione" al server
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// CONFIGURAZIONE AUTOMATICA DEL TOKEN
// Questo pezzo di codice intercetta ogni richiesta prima che parta
api.interceptors.request.use(
    function(config) {
        // 1. Cerchiamo il token nella memoria del browser
        const token = localStorage.getItem('token');

        // 2. Se il token c'è, lo incolliamo alla richiesta
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        // 3. Facciamo partire la richiesta
        return config;
    }, 
    function(error) {
        // Se c'è un errore tecnico prima di inviare, lo segnaliamo
        return Promise.reject(error); 
    }
);

export default api;