const getMyCollection = function(req, res) {
    // In futuro useremo req.user.id per sapere chi è loggato
    const statusFilter = req.query.status;

    res.json({
        message: "La tua collezione",
        filter_used: statusFilter,
        collection: []
    });
};

const addToCollection = function(req, res) {
    const contentId = req.body.content_id;
    const status = req.body.status;

    res.status(201).json({
        message: "Aggiunto alla collezione",
        data: { contentId: contentId, status: status }
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