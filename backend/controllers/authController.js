const User = require('../models/userModel'); // Importiamo il modello
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const { generateToken } = require('../utils/tokenUtils');

// ==========================================
// REGISTRAZIONE (Reale)
// ==========================================
const register = function(req, res) {
    const { username, email, password } = req.body;

    // 1. Controlliamo se l'email esiste già
    User.findByEmail(email, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore interno del server (DB)" });
        }
        if (data) {
            // Se 'data' non è null, vuol dire che l'utente c'è già
            return res.status(400).json({ message: "Questa email è già registrata!" });
        }

        // 2. Se non esiste, procediamo: Hashiamo la password
        const hashedPassword = hashPassword(password);

        // Creiamo l'oggetto utente
        const newUser = {
            username: username,
            email: email,
            password: hashedPassword
        };

        // 3. Salviamo nel database
        User.create(newUser, function(err, data) {
            if (err) {
                return res.status(500).json({ message: "Errore durante la registrazione." });
            }

            // 4. Successo!
            res.status(201).json({
                message: "Utente registrato con successo!",
                user_id: data.id
            });
        });
    });
};

// ==========================================
// LOGIN (Reale)
// ==========================================
const login = function(req, res) {
    const { email, password } = req.body;

    // 1. Cerchiamo l'utente nel DB
    User.findByEmail(email, function(err, user) {
        if (err) {
            return res.status(500).json({ message: "Errore interno del server." });
        }
        
        // Se user è null, l'email non esiste
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato." });
        }

        // 2. Controlliamo la password (quella nel DB è user.password)
        const passwordValida = comparePassword(password, user.password);

        if (!passwordValida) {
            return res.status(401).json({ message: "Password errata!" });
        }

        // 3. Generiamo il token
        const token = generateToken(user);

        // 4. Inviamo risposta
        res.json({
            message: "Login effettuato!",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    });
};

const logout = function(req, res) {
    res.json({ message: "Logout effettuato" });
};

module.exports = {
    register,
    login,
    logout
};