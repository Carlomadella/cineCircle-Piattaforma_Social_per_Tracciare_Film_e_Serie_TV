// backend/controllers/reviewController.js
const Review = require('../models/reviewModel');
const Activity = require('../models/activityModel');

const getContentReviews = function(req, res) {
    const contentId = req.params.contentId;
    Review.getByContent(contentId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore caricamento recensioni" });
        res.json(data);
    });
};

const createReview = function(req, res) {
    const userId = req.user.id;
    const { content_id, rating, text } = req.body;

    const newReview = { user_id: userId, content_id, rating, text };

    Review.create(newReview, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore salvataggio" });
        
        // Log Attività
        Activity.logActivity(userId, content_id, 'review', () => {});
        
        res.status(201).json({ message: "Recensione pubblicata!" });
    });
};

// Funzioni reali (anche se semplici) per evitare crash
const updateReview = function(req, res) {
    res.json({ message: "Modifica recensione non ancora implementata" });
};

const deleteReview = function(req, res) {
    // Qui andrebbe la logica di cancellazione dal DB
    res.json({ message: "Recensione eliminata (simulato)" });
};

module.exports = { 
    getContentReviews, 
    createReview, 
    updateReview, 
    deleteReview 
};