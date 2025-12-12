// backend/models/activityModel.js
const db = require('../config/db');

// Funzione per REGISTRARE un'azione (Già presente, la lasciamo)
const logActivity = function(userId, contentId, type, resultCallback) {
    const query = "INSERT INTO activity_feed (user_id, content_id, activity_type) VALUES (?, ?, ?)";
    db.query(query, [userId, contentId, type], function(err, res) {
        if (err) {
            console.error("Errore log attività:", err); 
            if(resultCallback) resultCallback(err, null);
            return;
        }
        if(resultCallback) resultCallback(null, res);
    });
};

// Funzione per LEGGERE le attività di un utente specifico (per il Profilo)
const getUserActivity = function(userId, resultCallback) {
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

// --- NUOVA FUNZIONE: Feed degli Amici (Home Social) ---
const getFriendsFeed = function(currentUserId, resultCallback) {
    // Questa query è complessa:
    // 1. Prende le attività (a)
    // 2. Unisce con utenti (u) per sapere CHI ha fatto l'azione
    // 3. Unisce con contenuti (c) per sapere SU COSA
    // 4. FILTRA: Prendi solo se l'autore dell'attività è nella lista di chi seguo (subquery IN)
    const query = `
        SELECT a.*, u.username, u.profile_image, c.title, c.poster_url 
        FROM activity_feed a
        JOIN users u ON a.user_id = u.id
        JOIN contents c ON a.content_id = c.id
        WHERE a.user_id IN (SELECT following_id FROM follows WHERE follower_id = ?)
        ORDER BY a.created_at DESC
        LIMIT 20
    `;

    db.query(query, [currentUserId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// --- NUOVA FUNZIONE: Statistiche Utente ---
const getStats = function(userId, resultCallback) {
    // Qui facciamo più query in parallelo "artigianale"
    
    // Query 1: Conta i film visti
    const q1 = "SELECT COUNT(*) as count FROM user_contents WHERE user_id = ? AND status = 'watched'";
    // Query 2: Conta le recensioni
    const q2 = "SELECT COUNT(*) as count FROM reviews WHERE user_id = ?";
    // Query 3: Trova il genere preferito (più frequente)
    const q3 = `
        SELECT g.genre_name, COUNT(*) as frequency 
        FROM user_contents uc
        JOIN content_genres cg ON uc.content_id = cg.content_id
        JOIN genres g ON cg.genre_id = g.id
        WHERE uc.user_id = ?
        GROUP BY g.id
        ORDER BY frequency DESC
        LIMIT 1
    `;

    // Eseguiamo a catena (Callback Hell controllato per semplicità)
    db.query(q1, [userId], (err1, res1) => {
        if (err1) return resultCallback(err1, null);
        
        db.query(q2, [userId], (err2, res2) => {
            if (err2) return resultCallback(err2, null);

            db.query(q3, [userId], (err3, res3) => {
                if (err3) return resultCallback(err3, null);

                // Assembliamo il pacchetto finale
                const stats = {
                    watched_count: res1[0].count,
                    reviews_count: res2[0].count,
                    favorite_genre: res3.length > 0 ? res3[0].genre_name : "N/A"
                };
                
                resultCallback(null, stats);
            });
        });
    });
};

module.exports = { logActivity, getUserActivity, getFriendsFeed, getStats };