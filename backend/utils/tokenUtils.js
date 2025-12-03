// utils/tokenUtils.js
const jwt = require('jsonwebtoken');

// Questa chiave segreta dovrebbe stare in un file .env, ma per ora va bene qui
const SECRET_KEY = "la-mia-super-chiave-segreta-cinecircle"; 

// Genera il token
const generateToken = function(user) {
    // Creiamo il payload (i dati dentro il token)
    const payload = {
        id: user.id,
        username: user.username,
        email: user.email
    };

    // Il token scade dopo 24 ore
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
    return token;
};

// Verifica se il token è valido (lo useremo nel middleware)
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