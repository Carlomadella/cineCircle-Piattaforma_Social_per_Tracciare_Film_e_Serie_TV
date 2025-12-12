// backend/controllers/contentController.js
const Content = require('../models/contentModel');

// 1. GET /contents (Home e Ricerca)
const searchContents = function(req, res) {
    // Estraiamo TUTTI i possibili filtri dall'URL
    // Esempio URL: /api/contents?genre=2&min_year=1990&sort=rating
    const filters = {
        keyword: req.query.keyword,
        type: req.query.type,
        sort: req.query.sort,
        genre: req.query.genre,         // <--- Nuovo
        min_year: req.query.min_year,   // <--- Nuovo
        max_year: req.query.max_year,   // <--- Nuovo
        min_rating: req.query.min_rating // <--- Nuovo
    };

    console.log("Ricerca con filtri avanzati:", filters);

    Content.search(filters, function(err, data) {
        if (err) {
            return res.status(500).json({ message: "Errore nel recupero dei contenuti" });
        }
        
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