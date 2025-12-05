const jwt = require('jsonwebtoken');
require('dotenv').config();

// IMPORTANTE: Questa chiave deve essere IDENTICA a quella nel middleware
const SECRET_KEY = process.env.JWT_SECRET || "la-tua-chiave-segreta-super-sicura"; 

const generateToken = function(user) {
    const payload = {
        id: user.id,        // Salviamo l'ID
        username: user.username,
        email: user.email
    };

    // Generiamo il token
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    return token;
};

// Funzione opzionale per verifica manuale
const verifyTokenValid = function(token) {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyTokenValid,
    SECRET_KEY
};