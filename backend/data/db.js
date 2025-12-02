// importo mysql2
const mysql = require('mysql2');

// creo la variabile per la connesione al database
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'LaMiaPrimaConnessione22',
database: 'db_cineCircle'
});

// utilizzo la variabile per instaurare una connessione

connection.connect(() => {
console.log('Connected to MySQL!')
});

module.exports = connection;