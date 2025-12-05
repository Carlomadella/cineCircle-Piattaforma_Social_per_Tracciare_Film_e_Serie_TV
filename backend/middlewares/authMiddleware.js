const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = function(req, res, next) {
    // 1. Cerchiamo l'header "Authorization"
    const authHeader = req.headers['authorization'];
    
    // Il client manda "Bearer <token>", noi prendiamo solo la seconda parte
    const token = authHeader && authHeader.split(' ')[1];

    // Se non c'è il token, blocchiamo subito
    if (!token) {
        console.log("⛔ Accesso negato: Nessun token fornito.");
        return res.status(401).json({ message: "Accesso Negato: Token mancante" });
    }

    // 2. Definiamo la chiave segreta (DEVE ESSERE UGUALE a tokenUtils)
    const secret = process.env.JWT_SECRET || "la-tua-chiave-segreta-super-sicura";

    // 3. Verifichiamo il token
    jwt.verify(token, secret, function(err, userDecoded) {
        if (err) {
            console.log("❌ Errore Token:", err.message); // Qui vedremo il motivo esatto!
            return res.status(403).json({ message: "Sessione scaduta o non valida. Rifai il login." });
        }

        // 4. Se è valido, passiamo i dati VERI alla richiesta
        req.user = userDecoded;
        
        console.log("✅ Utente autorizzato:", req.user.username, "(ID:", req.user.id, ")");
        
        // Passiamo il controllo al controller successivo
        next();
    });
};

module.exports = { verifyToken };