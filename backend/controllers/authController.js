const register = function(req, res) {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log("Richiesta di registrazione:", username);

    // Simuliamo una risposta positiva
    res.status(201).json({
        message: "Utente registrato con successo (Simulato)",
        user: { username: username, email: email }
    });
};

const login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    console.log("Richiesta di login:", email);

    // Simuliamo il login
    res.json({
        message: "Login effettuato con successo (Simulato)",
        token: "token-finto-123456"
    });
};

const logout = function(req, res) {
    res.json({ message: "Logout effettuato" });
};

// Esportiamo tutto alla fine
module.exports = {
    register,
    login,
    logout
};