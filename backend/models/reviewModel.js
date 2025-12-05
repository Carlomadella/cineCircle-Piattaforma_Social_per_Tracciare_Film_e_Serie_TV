const db = require('../config/db');

// Aggiunge una recensione
const create = function(reviewData, resultCallback) {
    // reviewData contiene: user_id, content_id, rating, text
    const query = `
        INSERT INTO reviews (user_id, content_id, rating, text)
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE rating = VALUES(rating), text = VALUES(text), updated_at = CURRENT_TIMESTAMP
    `;
    
    db.query(query, [reviewData.user_id, reviewData.content_id, reviewData.rating, reviewData.text], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// Legge le recensioni di un film
const getByContent = function(contentId, resultCallback) {
    // Join con la tabella Users per avere il nome di chi scrive
    const query = `
        SELECT r.*, u.username, u.profile_image 
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.content_id = ?
        ORDER BY r.created_at DESC
    `;

    db.query(query, [contentId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

module.exports = { create, getByContent };