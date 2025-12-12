// backend/models/followModel.js

// Importiamo la connessione al database
const db = require('../config/db');

// Funzione per iniziare a seguire qualcuno
const follow = function(followerId, followingId, resultCallback) {
    // Query SQL per inserire la relazione
    const query = "INSERT INTO follows (follower_id, following_id) VALUES (?, ?)";
    
    // Eseguiamo la query passando chi segue e chi viene seguito
    db.query(query, [followerId, followingId], function(err, res) {
        // Se c'è un errore (es. lo segui già), passiamo l'errore alla callback
        if (err) {
            resultCallback(err, null);
            return;
        }
        // Se tutto va bene, restituiamo il risultato dell'inserimento
        resultCallback(null, res);
    });
};

// Funzione per smettere di seguire qualcuno
const unfollow = function(followerId, followingId, resultCallback) {
    // Query SQL per cancellare la riga della relazione
    const query = "DELETE FROM follows WHERE follower_id = ? AND following_id = ?";
    
    // Eseguiamo la cancellazione
    db.query(query, [followerId, followingId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        // Restituiamo il successo
        resultCallback(null, res);
    });
};

// Funzione fondamentale: Controlla se il follow esiste già
// Serve al frontend per decidere se mostrare il tasto "Segui" o "Smetti di seguire"
const isFollowing = function(followerId, followingId, resultCallback) {
    // Contiamo quante righe esistono con questa coppia di ID
    const query = "SELECT COUNT(*) AS count FROM follows WHERE follower_id = ? AND following_id = ?";
    
    db.query(query, [followerId, followingId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        // Se il conteggio è maggiore di 0, allora il follow esiste
        const following = res[0].count > 0;
        resultCallback(null, following);
    });
};

// Esportiamo le funzioni per usarle nel controller
module.exports = { follow, unfollow, isFollowing };