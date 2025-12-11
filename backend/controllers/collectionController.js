// backend/controllers/collectionController.js
const Collection = require('../models/collectionModel');
const Activity = require('../models/activityModel');

// Aggiunge un contenuto (con log attività)
const addToCollection = function(req, res) {
    const userId = req.user.id;
    const { content_id, status } = req.body;

    // Salviamo nel DB
    Collection.addToCollection(userId, content_id, status, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore Database" });

        // Se lo stato è rilevante, lo scriviamo nel feed attività
        if (['watched', 'want_to_watch', 'watching'].includes(status)) {
            Activity.logActivity(userId, content_id, status, () => {});
        }

        res.json({ message: "Collezione aggiornata!" });
    });
};

// Ottiene la lista completa dell'utente
const getMyCollection = function(req, res) {
    const userId = req.user.id;
    Collection.getCollection(userId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore Database" });
        res.json(data);
    });
};

// Controlla lo stato di un singolo film (per il bottone nella pagina dettaglio)
const getItemStatus = function(req, res) {
    const userId = req.user.id;
    const contentId = req.params.contentId;
    
    // Usiamo il db direttamente per una query veloce di check
    const db = require('../config/db');
    const query = "SELECT status FROM user_contents WHERE user_id = ? AND content_id = ?";

    db.query(query, [userId, contentId], function(err, result) {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json({ status: result.length > 0 ? result[0].status : null });
    });
};

// --- FUNZIONI MANCANTI CHE CAUSAVANO L'ERRORE ---

// Modifica lo stato (PUT)
const updateCollectionStatus = function(req, res) {
    // Riutilizziamo la logica di aggiunta perché fa "UPSERT" (aggiorna se esiste)
    addToCollection(req, res);
};

// Rimuove un contenuto (DELETE)
const removeFromCollection = function(req, res) {
    const userId = req.user.id;
    const contentId = req.params.contentId;

    const db = require('../config/db');
    const query = "DELETE FROM user_contents WHERE user_id = ? AND content_id = ?";

    db.query(query, [userId, contentId], function(err, result) {
        if (err) return res.status(500).json({ message: "Errore eliminazione" });
        res.json({ message: "Rimosso dalla collezione" });
    });
};

// Esportiamo TUTTO
module.exports = { 
    addToCollection, 
    getMyCollection, 
    getItemStatus, 
    updateCollectionStatus, // <--- Era questo che mancava e faceva crashare la PUT!
    removeFromCollection    // <--- Era questo che mancava e faceva crashare la DELETE!
};