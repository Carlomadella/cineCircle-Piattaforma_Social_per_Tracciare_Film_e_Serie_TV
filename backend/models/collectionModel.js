const db = require('../config/db');

const addToCollection = function(userId, contentId, status, resultCallback) {
    // Query "UPSERT": Se esiste già aggiorna lo stato, altrimenti inserisci
    const query = `
        INSERT INTO user_contents (user_id, content_id, status) 
        VALUES (?, ?, ?) 
        ON DUPLICATE KEY UPDATE status = VALUES(status)
    `;
    
    db.query(query, [userId, contentId, status], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

const getCollection = function(userId, resultCallback) {
    // Join per prendere anche i dati del film (titolo, immagine)
    const query = `
        SELECT c.*, uc.status, uc.added_at 
        FROM user_contents uc
        JOIN contents c ON uc.content_id = c.id
        WHERE uc.user_id = ?
        ORDER BY uc.added_at DESC
    `;
    
    db.query(query, [userId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

module.exports = { addToCollection, getCollection };