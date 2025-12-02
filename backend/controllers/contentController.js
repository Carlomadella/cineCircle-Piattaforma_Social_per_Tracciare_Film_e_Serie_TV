const getAllGenres = function(req, res) {
    // Simuliamo la lista dei generi
    res.json({
        genres: [
            { id: 1, name: "Action" },
            { id: 2, name: "Drama" },
            { id: 3, name: "Comedy" }
        ]
    });
};

const searchContents = function(req, res) {
    // Leggiamo i parametri dalla URL (es: ?genre=Action)
    const genre = req.query.genre;
    const year = req.query.year;

    res.json({
        message: "Risultati ricerca",
        filters: { genre: genre, year: year },
        results: [] // Array vuoto per ora
    });
};

const getContentDetails = function(req, res) {
    const id = req.params.id;

    res.json({
        id: id,
        title: "Titolo Film Esempio",
        description: "Descrizione finta del film...",
        average_rating: 4.5
    });
};

module.exports = {
    getAllGenres,
    searchContents,
    getContentDetails
};