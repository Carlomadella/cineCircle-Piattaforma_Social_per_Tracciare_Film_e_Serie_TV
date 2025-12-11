// backend/models/listModel.js
const db = require('../config/db');

// Crea una nuova lista
const create = function(userId, name, description, isPublic, resultCallback) {
    const query = "INSERT INTO lists (user_id, name, description, is_public) VALUES (?, ?, ?, ?)";
    // Eseguiamo la query passando i parametri
    db.query(query, [userId, name, description, isPublic], function(err, res) {
        if (err) {
            resultCallback(err, null); // Se c'è errore, lo passiamo
            return;
        }
        resultCallback(null, { id: res.insertId, name, description }); // Ritorniamo l'ID creato
    });
};

// Ottiene tutte le liste pubbliche
const getPublicLists = function(resultCallback) {
    // Prendiamo le liste e il nome dell'autore
    const query = `
        SELECT l.*, u.username 
        FROM lists l
        JOIN users u ON l.user_id = u.id
        WHERE l.is_public = 1
        ORDER BY l.created_at DESC
    `;
    db.query(query, [], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// Ottiene i dettagli di una lista e i film al suo interno
const getById = function(listId, resultCallback) {
    // Prima query: dettagli lista
    const queryList = "SELECT * FROM lists WHERE id = ?";
    
    db.query(queryList, [listId], function(err, listRes) {
        if (err || listRes.length === 0) {
            resultCallback(err || "Lista non trovata", null);
            return;
        }

        const listData = listRes[0];

        // Seconda query: film dentro la lista
        const queryItems = `
            SELECT c.* 
            FROM list_items li
            JOIN contents c ON li.content_id = c.id
            WHERE li.list_id = ?
            ORDER BY li.position ASC
        `;

        db.query(queryItems, [listId], function(err, itemsRes) {
            if (err) {
                resultCallback(err, null);
                return;
            }
            // Uniamo i dati: info lista + array dei film
            listData.items = itemsRes;
            resultCallback(null, listData);
        });
    });
};

// Aggiunge un film alla lista
const addItem = function(listId, contentId, resultCallback) {
    const query = "INSERT INTO list_items (list_id, content_id) VALUES (?, ?)";
    db.query(query, [listId, contentId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// Rimuove un film dalla lista
const removeItem = function(listId, contentId, resultCallback) {
    const query = "DELETE FROM list_items WHERE list_id = ? AND content_id = ?";
    db.query(query, [listId, contentId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

// Elimina l'intera lista
const deleteList = function(listId, userId, resultCallback) {
    // Controlliamo anche l'userId per sicurezza (solo il proprietario può cancellare)
    const query = "DELETE FROM lists WHERE id = ? AND user_id = ?";
    db.query(query, [listId, userId], function(err, res) {
        if (err) {
            resultCallback(err, null);
            return;
        }
        resultCallback(null, res);
    });
};

module.exports = { create, getPublicLists, getById, addItem, removeItem, deleteList };