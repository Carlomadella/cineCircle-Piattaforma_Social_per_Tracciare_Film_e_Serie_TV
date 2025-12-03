// utils/passwordUtils.js
const bcrypt = require('bcrypt');

const saltRounds = 10; // Quanto deve essere complessa la crittografia

// Funzione per criptare la password (usata nella Registrazione)
const hashPassword = function(plainPassword) {
    // hashSync è la versione semplice (sincrona) per iniziare
    return bcrypt.hashSync(plainPassword, saltRounds);
};

// Funzione per confrontare password (usata nel Login)
const comparePassword = function(plainPassword, hashedPassword) {
    // Restituisce true se combaciano, false se no
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
};