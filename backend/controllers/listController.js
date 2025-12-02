const getLists = function(req, res) {
    res.json({
        lists: [
            { id: 1, name: "I miei preferiti", is_public: true },
            { id: 2, name: "Horror Anni 90", is_public: true }
        ]
    });
};

const getListDetails = function(req, res) {
    const id = req.params.id;

    res.json({
        id: id,
        name: "Nome Lista Dettaglio",
        items: []
    });
};

const createList = function(req, res) {
    const name = req.body.name;

    res.status(201).json({
        message: "Lista creata",
        name: name
    });
};

const updateList = function(req, res) {
    const id = req.params.id;
    res.json({ message: "Lista " + id + " aggiornata" });
};

const deleteList = function(req, res) {
    const id = req.params.id;
    res.json({ message: "Lista " + id + " eliminata" });
};

const addListItem = function(req, res) {
    const listId = req.params.id;
    const contentId = req.body.content_id;

    res.status(201).json({
        message: "Film aggiunto alla lista",
        listId: listId,
        contentId: contentId
    });
};

const removeListItem = function(req, res) {
    const listId = req.params.id;
    const contentId = req.params.contentId;

    res.json({
        message: "Film rimosso dalla lista",
        listId: listId,
        contentId: contentId
    });
};

module.exports = {
    getLists,
    getListDetails,
    createList,
    updateList,
    deleteList,
    addListItem,
    removeListItem
};