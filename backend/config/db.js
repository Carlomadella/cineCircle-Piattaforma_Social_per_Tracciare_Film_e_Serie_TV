// config/db.js
require('dotenv').config(); // Carica le variabili dal file .env
const mysql = require('mysql2');

// Creiamo la connessione
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// Apriamo la connessione
connection.connect(function(err) {
    if (err) {
        console.error("❌ Errore di connessione al Database: " + err.stack);
        return;
    }
    console.log("✅ Connesso al Database MySQL con ID " + connection.threadId);
});

module.exports = connection;