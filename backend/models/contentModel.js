// backend/models/contentModel.js
const db = require('../config/db');

// Funzione avanzata per cercare contenuti con filtri combinati
const search = function(filters, resultCallback) {
    
    // 1. LA BASE DELLA QUERY
    // Iniziamo con "SELECT c.*". La 'c' è un alias per la tabella 'contents'.
    // Usiamo "WHERE 1=1". È un trucco da programmatori: 1 è sempre uguale a 1.
    // Serve perché così possiamo aggiungere tutti i filtri successivi iniziando con "AND ...".
    // Se non mettessimo "1=1", il primo filtro dovrebbe iniziare con "WHERE" e gli altri con "AND", complicando il codice.
    let query = "SELECT DISTINCT c.* FROM contents c";
    
    // 2. GESTIONE GENERI (JOIN)
    // Se l'utente filtra per genere, dobbiamo unire la tabella dei contenuti con quella dei generi.
    if (filters.genre) {
        query += " JOIN content_genres cg ON c.id = cg.content_id";
    }

    query += " WHERE 1=1";
    
    // 3. ARRAY DEI PARAMETRI
    // Qui accumuliamo i valori reali (es. 'Horror', '2020') per sostituirli ai punti interrogativi (?)
    // Questo previene la SQL Injection (sicurezza).
    let params = [];

    // --- FILTRO: PAROLA CHIAVE ---
    if (filters.keyword) {
        query += " AND (c.title LIKE ? OR c.description LIKE ?)";
        params.push(`%${filters.keyword}%`, `%${filters.keyword}%`);
    }

    // --- FILTRO: TIPO (Film o Serie) ---
    if (filters.type) {
        query += " AND c.type = ?";
        params.push(filters.type);
    }

    // --- FILTRO: GENERE ---
    if (filters.genre) {
        // Se c'è un genere, filtriamo sulla tabella 'cg' (content_genres) che abbiamo unito sopra
        query += " AND cg.genre_id = ?";
        params.push(filters.genre);
    }

    // --- FILTRO: ANNO (Range) ---
    // min_year: "Dal 2000 in poi"
    if (filters.min_year) {
        query += " AND c.year >= ?";
        params.push(filters.min_year);
    }
    // max_year: "Fino al 2010"
    if (filters.max_year) {
        query += " AND c.year <= ?";
        params.push(filters.max_year);
    }

    // --- FILTRO: VOTO MINIMO ---
    if (filters.min_rating) {
        query += " AND c.average_rating >= ?";
        params.push(filters.min_rating);
    }

    // --- ORDINAMENTO ---
    if (filters.sort === 'newest') {
        query += " ORDER BY c.year DESC";
    } else if (filters.sort === 'rating') {
        query += " ORDER BY c.average_rating DESC";
    } else if (filters.sort === 'oldest') {
        query += " ORDER BY c.year ASC";
    } else {
        // Default: i più popolari
        query += " ORDER BY c.popularity_count DESC";
    }

    // Limite risultati
    query += " LIMIT 50";

    // Debug: Stampiamo la query nel terminale per vedere cosa sta costruendo
    // console.log("Query generata:", query);
    // console.log("Parametri:", params);

    // Eseguiamo la query finale
    db.query(query, params, function(err, res) {
        if (err) {
            console.log("Errore Query Search:", err);
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// Funzione per prendere un singolo contenuto (Dettaglio)
const getById = function(id, resultCallback) {
    const query = "SELECT * FROM contents WHERE id = ?";
    db.query(query, [id], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        if (res.length > 0) {
            resultCallback(null, res[0]);
        } else {
            resultCallback(null, null);
        }
    });
};

module.exports = {
    search,
    getById
};