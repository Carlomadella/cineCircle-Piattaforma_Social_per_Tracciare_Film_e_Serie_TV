// backend/models/activityModel.js
const db = require('../config/db');

// Funzione per REGISTRARE un'azione
const logActivity = function(userId, contentId, type, resultCallback) {
    // type può essere: 'review', 'watched', 'want_to_watch'
    const query = "INSERT INTO activity_feed (user_id, content_id, activity_type) VALUES (?, ?, ?)";
    
    db.query(query, [userId, contentId, type], function(err, res) {
        if (err) {
            // Se fallisce il log dell'attività, non fa niente (non blocchiamo l'app per questo)
            console.error("Errore log attività:", err); 
            // Chiamiamo la callback comunque per non bloccare il flusso
            if(resultCallback) resultCallback(err, null);
            return;
        }
        if(resultCallback) resultCallback(null, res);
    });
};

// Funzione per LEGGERE le attività di un utente
const getUserActivity = function(userId, resultCallback) {
    // Facciamo una JOIN per avere il titolo del film e la locandina
    const query = `
        SELECT a.*, c.title, c.poster_url, c.type 
        FROM activity_feed a
        JOIN contents c ON a.content_id = c.id
        WHERE a.user_id = ?
        ORDER BY a.created_at DESC
        LIMIT 10
    `;

    db.query(query, [userId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

module.exports = { logActivity, getUserActivity };