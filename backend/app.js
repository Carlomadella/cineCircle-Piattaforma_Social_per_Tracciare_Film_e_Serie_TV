// importo il modulo Express
const express = require('express');
// Importo CORS
const cors = require('cors'); 
require('dotenv').config();

// creo un'applicazione express
const app = express()

app.use(express.json()); 

// importo il router
const cineRouter = require('./routes/cineRouter'); 

// Importo i middleware
const logger = require('./middlewares/loggerMiddleware'); 
const errorHandler = require('./middlewares/errorMiddleware');

// CONFIGURAZIONE CORS (Fondamentale per far parlare React con Node)
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true 
};

app.use(cors(corsOptions));

// Utilizzo il middleware del login
app.use(logger);

// Utilizzo il router per gestire tutte le richieste al percorso /api/cineCircle
app.use('/api', cineRouter);

// Definisco una route GET per la rotta prncipale del progetto
app.get("/", (req,res) => {
    res.send("Hello World!") // risponde con "Hello World!" alla richiesta
});

// Specifichiamo al programma di prendere i contenuti statici dalla cartella public
app.use(express.static("public"));

// Utilizzo il middleware degli errori
app.use(errorHandler);

// imposto la porta dal valore di ambiente o usa la 3000
const port = process.env.SERVER_PORT || 3000;

app.listen(port, () => {
    console.log(`Server attivo sulla porta ${port}`);
});

// Avvio il srver sulla porta specificata
app.listen(port, () => {
    console.log("Server started on port " + port) // stampa un messaggio in console quando parte il server
});

