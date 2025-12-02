// middleware/authMiddleware.js

// Questa funzione fa finta che l'utente sia sempre loggato e autorizzato
const verifyToken = function(req, res, next) {
    console.log("Middleware: Controllo sicurezza saltato per test...");
    
    // next() è fondamentale: dice a Express "Tutto ok, passa al prossimo blocco"
    next();
};

module.exports = {
    verifyToken
};