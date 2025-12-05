// backend/models/contentModel.js
const db = require('../config/db');

// Funzione per cercare contenuti (usata per la Home e per la Ricerca)
const search = function(filters, resultCallback) {
    let query = "SELECT * FROM contents WHERE 1=1";
    let params = [];

    // Filtro per Tipo (movie o tv_series)
    if (filters.type) {
        query += " AND type = ?";
        params.push(filters.type);
    }

    if (filters.keyword) {
        query += " AND (title LIKE ? OR description LIKE ?)";
        params.push(`%${filters.keyword}%`, `%${filters.keyword}%`);
    }

    // Ordinamento
    if (filters.sort === 'newest') {
        query += " ORDER BY year DESC";
    } else if (filters.sort === 'rating') {
        query += " ORDER BY average_rating DESC";
    } else {
        query += " ORDER BY popularity_count DESC";
    }

    query += " LIMIT 50";

    db.query(query, params, function(err, res) {
        if (err) {
            console.log("Errore Query:", err);
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