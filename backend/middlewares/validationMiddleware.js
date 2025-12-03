// middlewares/validationMiddleware.js

// Funzione generica per controllare se i campi esistono
const validateRegister = function(req, res, next) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ 
            message: "Dati mancanti! Username, email e password sono obbligatori." 
        });
    }

    // Se tutto c'è, prosegui
    next();
};

const validateReview = function(req, res, next) {
    const { rating, text } = req.body;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({ 
            message: "Il voto deve essere un numero tra 1 e 5." 
        });
    }

    next();
};

module.exports = {
    validateRegister,
    validateReview
};