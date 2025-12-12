const Activity = require('../models/activityModel');
// Importiamo il modello appena creato
const Follow = require('../models/followModel');

// Prende le attività dell'utente loggato (per il profilo)
const getMyActivity = function(req, res) {
    const userId = req.user.id; // Dal token

    Activity.getUserActivity(userId, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore caricamento attività" });
        }
        res.json(data);
    });
};

// Inizia a seguire
const followUser = function(req, res) {
    // L'ID di chi clicca lo prendiamo dal token (grazie al middleware)
    const followerId = req.user.id;
    // L'ID di chi viene seguito lo prendiamo dall'URL (es. /follow/5)
    const followingId = req.params.userId;

    // Impediamo di seguire se stessi (sarebbe un bug buffo)
    if (followerId == followingId) {
        return res.status(400).json({ message: "Non puoi seguire te stesso!" });
    }

    // Chiamiamo il modello
    Follow.follow(followerId, followingId, function(err, data) {
        if (err) {
            // Se l'errore è 'ER_DUP_ENTRY' significa che lo segui già
            return res.status(500).json({ message: "Errore o lo segui già" });
        }
        res.json({ message: "Ora segui questo utente! ✨" });
    });
};

// Smetti di seguire
const unfollowUser = function(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    Follow.unfollow(followerId, followingId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore database" });
        res.json({ message: "Non segui più questo utente." });
    });
};

// Controlla stato follow (da chiamare quando carichi il profilo di un altro)
const checkFollowStatus = function(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    Follow.isFollowing(followerId, followingId, function(err, isFollowing) {
        if (err) return res.status(500).json({ message: "Errore" });
        // Restituiamo true o false
        res.json({ isFollowing: isFollowing });
    });
};

const getActivityFeed = function(req, res) {
    res.json({
        message: "Feed attività",
        feed: []
    });
};

const getUserStats = function(req, res) {
    const userId = req.params.userId;

    res.json({
        user_id: userId,
        movies_watched: 120,
        favorite_genre: "Sci-Fi"
    });
};

module.exports = {
    followUser,
    unfollowUser,
    getActivityFeed,
    getUserStats,
    getMyActivity,
    checkFollowStatus
};