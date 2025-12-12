const Follow = require('../models/followModel');
const Activity = require('../models/activityModel'); // Importiamo il modello 
const User = require('../models/userModel'); 

// --- GESTIONE FOLLOW (Già presente) ---
const followUser = function(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    if (followerId == followingId) return res.status(400).json({ message: "Non puoi seguire te stesso!" });

    Follow.follow(followerId, followingId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore o lo segui già" });
        res.json({ message: "Ora segui questo utente! ✨" });
    });
};

const unfollowUser = function(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    Follow.unfollow(followerId, followingId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore database" });
        res.json({ message: "Non segui più questo utente." });
    });
};

const checkFollowStatus = function(req, res) {
    const followerId = req.user.id;
    const followingId = req.params.userId;

    Follow.isFollowing(followerId, followingId, function(err, isFollowing) {
        if (err) return res.status(500).json({ message: "Errore" });
        res.json({ isFollowing: isFollowing });
    });
};

// --- GESTIONE ATTIVITÀ (Profilo) ---
const getMyActivity = function(req, res) {
    const userId = req.user.id;
    Activity.getUserActivity(userId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore caricamento attività" });
        res.json(data);
    });
};

// --- NUOVO: FEED DEGLI AMICI (Social) ---
const getActivityFeed = function(req, res) {
    const userId = req.user.id; // Chi sta guardando il feed

    // Chiediamo al modello le attività delle persone seguite da userId
    Activity.getFriendsFeed(userId, function(err, data) {
        if (err) {
            console.error("Errore feed:", err);
            return res.status(500).json({ message: "Impossibile caricare il feed" });
        }
        
        res.json({
            message: "Feed caricato",
            count: data.length,
            feed: data // Array di attività (Marco ha visto Matrix, ecc.)
        });
    });
};

// --- NUOVO: STATISTICHE UTENTE ---
const getUserStats = function(req, res) {
    const userId = req.params.userId; // ID dell'utente di cui vogliamo le stats

    // Chiediamo al modello di calcolare i numeri
    Activity.getStats(userId, function(err, stats) {
        if (err) {
            console.error("Errore stats:", err);
            return res.status(500).json({ message: "Errore calcolo statistiche" });
        }

        res.json({
            user_id: userId,
            stats: stats // { watched_count: 10, favorite_genre: 'Horror', ... }
        });
    });
};

// Ottiene lista utenti (esclusi me stesso)
const getAllUsers = function(req, res) {
    const myId = req.user.id;
    const query = "SELECT id, username, profile_image FROM users WHERE id != ? LIMIT 20";
    
    const db = require('../config/db'); // Assicurati di importare db se non c'è
    db.query(query, [myId], function(err, results) {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json(results);
    });
};

const getUserFollowers = function(req, res) {
    Follow.getFollowers(req.params.userId, (err, data) => {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json(data);
    });
};

const getUserFollowing = function(req, res) {
    Follow.getFollowing(req.params.userId, (err, data) => {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json(data);
    });
};

// Funzione per vedere le attività di UN utente specifico (non il mio, ma di un altro)
const getUserPublicActivity = function(req, res) {
    const targetUserId = req.params.userId;
    Activity.getUserActivity(targetUserId, (err, data) => {
        if (err) return res.status(500).json({ error: "Errore DB" });
        res.json(data);
    });
};
// Funzione per cercare l'username di un utente nel feed
const searchUsers = function(req, res) {
    const keyword = req.query.q; // Leggiamo ?q=Mario
    if (!keyword) return res.json([]);

    User.searchByUsername(keyword, function(err, data) {
        if (err) return res.status(500).json({ error: "Errore ricerca utenti" });
        res.json(data);
    });
};

module.exports = { 
    followUser, 
    unfollowUser, 
    checkFollowStatus, 
    getMyActivity, 
    getActivityFeed, 
    getUserStats,
    getAllUsers,
    getUserFollowers,
    getUserFollowing,
    getUserPublicActivity,
    searchUsers
};