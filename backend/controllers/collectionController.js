const Collection = require('../models/collectionModel');

const addToCollection = function(req, res) {
    const userId = req.user.id; // Preso dal Token (authMiddleware)
    const { content_id, status } = req.body;

    console.log(`Utente ${userId} aggiunge film ${content_id} come ${status}`);

    Collection.addToCollection(userId, content_id, status, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Errore Database" });
        }
        res.json({ message: "Collezione aggiornata!" });
    });
};

const getMyCollection = function(req, res) {
    const userId = req.user.id;

    Collection.getCollection(userId, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore Database" });
        }
        res.json(data);
    });
};

const updateCollectionStatus = function(req, res) {
    const contentId = req.params.contentId;
    const newStatus = req.body.status;

    res.json({
        message: "Stato aggiornato",
        contentId: contentId,
        newStatus: newStatus
    });
};

const removeFromCollection = function(req, res) {
    const contentId = req.params.contentId;

    res.json({
        message: "Elemento rimosso dalla collezione",
        contentId: contentId
    });
};

module.exports = {
    getMyCollection,
    addToCollection,
    updateCollectionStatus,
    removeFromCollection
};