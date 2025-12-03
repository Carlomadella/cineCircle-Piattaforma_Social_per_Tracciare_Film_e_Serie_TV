const express = require('express');
const router = express.Router();

// Importiamo i controller
const contentController = require('../controllers/contentController');
const reviewController = require('../controllers/reviewController');
const collectionController = require('../controllers/collectionController');
const listController = require('../controllers/listController');
const socialController = require('../controllers/socialController');
const authController = require('../controllers/authController')
// Importo i middleware
const { validateRegister, validateReview } = require('../middlewares/validationMiddleware');
// Importiamo il middleware di autenticazione (JWT)
const { verifyToken } = require('../middlewares/authMiddleware');


// ==========================================
// 0. AUTENTICAZIONE (Login & Register)
// ==========================================

// POST /api/register
// Spiegazione: Prima esegue 'validateRegister'. Se i dati mancano, si ferma e dà errore.
// Se i dati ci sono tutti, passa la palla a 'authController.register'.
router.post('/register', validateRegister, authController.register);

// POST /api/login
// Qui non abbiamo messo validatori particolari per ora, va diretto al controller.
router.post('/login', authController.login);

// ==========================================
// 1. CONTENUTI (Contents & Genres)
// ==========================================

// GET /api/genres
// Restituisce la lista di tutti i generi disponibili
router.get('/genres', contentController.getAllGenres);

// GET /api/contents
// Ricerca e filtri (query params: keyword, genre, year, type, sort, page, limit)
router.get('/contents', contentController.searchContents);

// GET /api/contents/:id
// Dettagli di un singolo film/serie (include cast, rating, generi)
router.get('/contents/:id', contentController.getContentDetails);


// ==========================================
// 2. COLLEZIONE PERSONALE (User Contents)
// Tutte queste rotte richiedono il login (verifyToken)
// ==========================================

// GET /api/my-collection
// Ottiene la collezione dell'utente loggato (filtro opzionale ?status=...)
router.get('/my-collection', verifyToken, collectionController.getMyCollection);

// POST /api/my-collection
// Aggiunge un contenuto alla collezione
// Body: { content_id, status }
router.post('/my-collection', verifyToken, collectionController.addToCollection);

// PUT /api/my-collection/:contentId
// Aggiorna lo stato di un contenuto (es. da "want_to_watch" a "watched")
// Body: { status }
router.put('/my-collection/:contentId', verifyToken, collectionController.updateCollectionStatus);

// DELETE /api/my-collection/:contentId
// Rimuove un contenuto dalla collezione
router.delete('/my-collection/:contentId', verifyToken, collectionController.removeFromCollection);


// ==========================================
// 3. RECENSIONI (Reviews)
// ==========================================

// GET /api/reviews/:contentId
// Legge tutte le recensioni di un film (Pubblico)
router.get('/reviews/:contentId', reviewController.getContentReviews);

// POST /api/reviews
// Crea una nuova recensione (Privato)
// Body: { content_id, rating, text }
router.post('/reviews', verifyToken, validateReview, reviewController.createReview); 

// PUT /api/reviews/:reviewId
// Modifica una recensione esistente (solo se sei l'autore)
// Body: { rating, text }
router.put('/reviews/:reviewId', verifyToken, reviewController.updateReview);

// DELETE /api/reviews/:reviewId
// Elimina una recensione (solo se sei l'autore)
router.delete('/reviews/:reviewId', verifyToken, reviewController.deleteReview);


// ==========================================
// 4. LISTE PERSONALIZZATE (Lists)
// ==========================================

// GET /api/lists
// Ottiene liste pubbliche o le proprie liste
router.get('/lists', listController.getLists);

// GET /api/lists/:id
// Dettagli di una lista specifica con i suoi film
router.get('/lists/:id', listController.getListDetails);

// POST /api/lists
// Crea una nuova lista (Privato)
// Body: { name, description, is_public }
router.post('/lists', verifyToken, listController.createList);

// PUT /api/lists/:id
// Modifica dettagli lista (Privato - Owner only)
router.put('/lists/:id', verifyToken, listController.updateList);

// DELETE /api/lists/:id
// Elimina una lista (Privato - Owner only)
router.delete('/lists/:id', verifyToken, listController.deleteList);

// POST /api/lists/:id/items
// Aggiunge un film alla lista
// Body: { content_id }
router.post('/lists/:id/items', verifyToken, listController.addListItem);

// DELETE /api/lists/:id/items/:contentId
// Rimuove un film dalla lista
router.delete('/lists/:id/items/:contentId', verifyToken, listController.removeListItem);


// ==========================================
// 5. SOCIAL & FEED (Follows & Activity)
// ==========================================

// POST /api/follow/:userId
// Segue un utente
router.post('/follow/:userId', verifyToken, socialController.followUser);

// DELETE /api/follow/:userId
// Smette di seguire un utente
router.delete('/follow/:userId', verifyToken, socialController.unfollowUser);

// GET /api/feed
// Ottiene il feed delle attività delle persone che segui
router.get('/feed', verifyToken, socialController.getActivityFeed);

// GET /api/users/:userId/stats
// Ottiene statistiche utente (film visti, generi preferiti, ecc.)
router.get('/users/:userId/stats', socialController.getUserStats);

module.exports = router;