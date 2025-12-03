const errorHandler = function(err, req, res, next) {
    console.error("ERRORE RILEVATO:", err.stack);

    // Rispondiamo al frontend con un JSON invece che crashare
    res.status(500).json({
        status: 'error',
        message: 'Qualcosa è andato storto nel server!',
        error: err.message // In produzione questo andrebbe nascosto
    });
};

module.exports = errorHandler;