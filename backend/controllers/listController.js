// backend/controllers/listController.js
const List = require('../models/listModel');

// Recupera le liste pubbliche
const getLists = function(req, res) {
    List.getPublicLists(function(err, data) {
        if (err) return res.status(500).json({ message: "Errore server" });
        res.json(data);
    });
};

// Dettaglio lista specifica
const getListDetails = function(req, res) {
    const listId = req.params.id;
    List.getById(listId, function(err, data) {
        if (err) return res.status(500).json({ message: "Errore caricamento lista" });
        if (!data) return res.status(404).json({ message: "Lista non trovata" });
        res.json(data);
    });
};

// Crea nuova lista
const createList = function(req, res) {
    const userId = req.user.id; // Dal token
    const { name, description, is_public } = req.body;

    if (!name) return res.status(400).json({ message: "Il nome è obbligatorio" });

    List.create(userId, name, description, is_public ? 1 : 0, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore creazione lista" });
        res.status(201).json({ message: "Lista creata!", listId: result.id });
    });
};

// Aggiunge film alla lista
const addListItem = function(req, res) {
    const listId = req.params.id;
    const { content_id } = req.body;

    List.addItem(listId, content_id, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore aggiunta film" });
        res.json({ message: "Film aggiunto alla lista" });
    });
};

// Rimuove film dalla lista
const removeListItem = function(req, res) {
    const listId = req.params.id;
    const contentId = req.params.contentId;

    List.removeItem(listId, contentId, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore rimozione film" });
        res.json({ message: "Film rimosso" });
    });
};

// Elimina lista
const deleteList = function(req, res) {
    const listId = req.params.id;
    const userId = req.user.id;

    List.deleteList(listId, userId, function(err, result) {
        if (err) return res.status(500).json({ message: "Errore eliminazione" });
        res.json({ message: "Lista eliminata" });
    });
};

// Placeholder per updateList (per ora vuoto ma ESISTENTE per non far crashare il router)
const updateList = function(req, res) {
    res.json({ message: "Funzione modifica in arrivo" });
};

// Esportiamo TUTTE le funzioni chiamate nel router
module.exports = {
    getLists,
    getListDetails,
    createList,
    updateList,
    deleteList,
    addListItem,
    removeListItem
};