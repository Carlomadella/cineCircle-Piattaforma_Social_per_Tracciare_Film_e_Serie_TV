const getContentReviews = function(req, res) {
    const contentId = req.params.contentId;

    res.json({
        content_id: contentId,
        reviews: [
            { user: "Mario", rating: 5, text: "Bel film!" },
            { user: "Luigi", rating: 3, text: "Non male." }
        ]
    });
};

const createReview = function(req, res) {
    const contentId = req.body.content_id;
    const rating = req.body.rating;
    const text = req.body.text;

    res.status(201).json({
        message: "Recensione creata",
        review: { contentId: contentId, rating: rating, text: text }
    });
};

const updateReview = function(req, res) {
    const reviewId = req.params.reviewId;
    
    res.json({ message: "Recensione " + reviewId + " aggiornata" });
};

const deleteReview = function(req, res) {
    const reviewId = req.params.reviewId;

    res.json({ message: "Recensione " + reviewId + " eliminata" });
};

module.exports = {
    getContentReviews,
    createReview,
    updateReview,
    deleteReview
};