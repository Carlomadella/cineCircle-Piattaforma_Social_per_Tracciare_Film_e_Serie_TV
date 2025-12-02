// importo il modulo Express
const express = require('express');

// importo il router
const cineRouter = require('./routes/cineRouter'); 

// creo un'applicazione express
const app = express()

// imposto la porta dal valore di ambiente o usa la 3000
const port = process.env.SERVER_PORT || 3000;

// Definisco una route GET per la rotta prncipale del progetto

app.get("/", (req,res) => {
    res.send("Hello World!") // risponde con "Hello World!" alla richiesta
});

// Specifichiamo al programma di prendere i contenuti statici dalla cartella public
app.use(express.static("public"));

// Utilizzo il router per gestire tutte le richieste al percorso /api/cineCircle
app.use('/api/cineCircle', cineRouter);

// Avvio il srver sulla porta specificata
app.listen(port, () => {
    console.log("Server started on port " + port) // stampa un messaggio in console quando parte il server
});

