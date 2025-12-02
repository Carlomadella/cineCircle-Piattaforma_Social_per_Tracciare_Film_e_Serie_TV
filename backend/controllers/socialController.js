const followUser = function(req, res) {
    const userIdToFollow = req.params.userId;

    res.status(201).json({
        message: "Hai iniziato a seguire l'utente " + userIdToFollow
    });
};

const unfollowUser = function(req, res) {
    const userIdToUnfollow = req.params.userId;

    res.json({
        message: "Non segui più l'utente " + userIdToUnfollow
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
    getUserStats
};