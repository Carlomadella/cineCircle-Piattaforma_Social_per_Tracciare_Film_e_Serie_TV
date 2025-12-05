// backend/controllers/contentController.js
const Content = require('../models/contentModel');

// 1. GET /contents (Home e Ricerca)
const searchContents = function(req, res) {
    // Leggiamo i filtri dall'URL (es: ?keyword=Matrix&sort=rating)
    const filters = {
        keyword: req.query.keyword,
        sort: req.query.sort,
        type: req.query.type
        // Qui aggiungeremo genre, year, ecc.
    };

    console.log("Richiesta contenuti con filtri:", filters);

    // Chiamiamo il Modello
    Content.search(filters, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore nel recupero dei contenuti" });
        }
        
        // Restituiamo i dati trovati
        // Nota: Il frontend si aspetta un array o un oggetto con dentro l'array
        res.json({ 
            count: data.length, 
            results: data 
        });
    });
};

// 2. GET /contents/:id (Dettaglio)
const getContentDetails = function(req, res) {
    const contentId = req.params.id;

    Content.getById(contentId, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore Database" });
        }
        if (!data) {
            return res.status(404).json({ message: "Contenuto non trovato" });
        }
        res.json(data);
    });
};

// 3. GET /genres (Lasciamolo finto per ora o creiamo il modello Genres se serve)
const getAllGenres = function(req, res) {
    res.json({ genres: [] }); // Placeholder
};

module.exports = {
    searchContents,
    getContentDetails,
    getAllGenres
};