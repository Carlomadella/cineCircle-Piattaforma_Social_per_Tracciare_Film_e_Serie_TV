const Review = require('../models/reviewModel');

// GET /api/reviews/:contentId
const getContentReviews = function(req, res) {
    const contentId = req.params.contentId;

    Review.getByContent(contentId, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore nel caricamento recensioni" });
        }
        res.json(data);
    });
};

// POST /api/reviews
const createReview = function(req, res) {
    const userId = req.user.id; // Dal Token
    const { content_id, rating, text } = req.body;

    // Validazione minima
    if (!rating || !text) {
        return res.status(400).json({ message: "Voto e testo sono obbligatori." });
    }

    const newReview = {
        user_id: userId,
        content_id: content_id,
        rating: rating,
        text: text
    };

    Review.create(newReview, function(err, result) {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Errore salvataggio recensione." });
        }
        res.status(201).json({ message: "Recensione pubblicata!" });
    });
};

// ... lascia update/delete vuoti o placeholder per ora ...
const updateReview = (req, res) => res.json({msg: "Todo"});
const deleteReview = (req, res) => res.json({msg: "Todo"});

module.exports = { getContentReviews, createReview, updateReview, deleteReview };