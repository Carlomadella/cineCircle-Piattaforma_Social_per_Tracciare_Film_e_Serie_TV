const db = require('../config/db');

// Funzione per creare un nuovo utente
const create = function(newUser, resultCallback) {
    // newUser è un oggetto con {username, email, password}
    const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    
    db.query(query, [newUser.username, newUser.email, newUser.password], function(err, res) {
        if (err) {
            console.log("Errore SQL:", err);
            // Avvisiamo il controller che c'è stato un errore
            resultCallback(err, null);
            return;
        }
        // Tutto ok! Restituiamo l'ID del nuovo utente
        console.log("Utente creato nel DB:", { id: res.insertId, ...newUser });
        resultCallback(null, { id: res.insertId, ...newUser });
    });
};

// Funzione per cercare un utente tramite Email (per il Login)
const findByEmail = function(email, resultCallback) {
    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], function(err, res) {
        if (err) {
            console.log("Errore SQL:", err);
            resultCallback(err, null);
            return;
        }

        // Se la lista dei risultati ha almeno un elemento, abbiamo trovato l'utente
        if (res.length > 0) {
            resultCallback(null, res[0]); // Restituiamo il primo (e unico) utente
            return;
        }

        // Se siamo qui, non ha trovato nessuno (nessun errore tecnico, ma utente inesistente)
        resultCallback(null, null);
    });
};

module.exports = {
    create,
    findByEmail
};