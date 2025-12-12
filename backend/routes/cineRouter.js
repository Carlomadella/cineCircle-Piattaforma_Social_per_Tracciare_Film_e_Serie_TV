// backend/routes/cineRouter.js
const express = require('express');
const router = express.Router();

// Importiamo i Controller
const authController = require('../controllers/authController');
const contentController = require('../controllers/contentController');
const collectionController = require('../controllers/collectionController');
const reviewController = require('../controllers/reviewController');
const listController = require('../controllers/listController');
const socialController = require('../controllers/socialController');

// Importiamo i Middleware
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateRegister, validateReview } = require('../middlewares/validationMiddleware');

// --- 1. AUTENTICAZIONE ---
router.post('/register', validateRegister, authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

// --- 2. CONTENUTI (Pubblici) ---
router.get('/contents', contentController.searchContents);
router.get('/contents/:id', contentController.getContentDetails);
router.get('/genres', contentController.getAllGenres);

// --- 3. COLLEZIONE PERSONALE (Richiede Login) ---
router.get('/my-collection', verifyToken, collectionController.getMyCollection);
router.post('/my-collection', verifyToken, collectionController.addToCollection);
// Questa è la riga che probabilmente dava errore (PUT):
router.put('/my-collection/:contentId', verifyToken, collectionController.updateCollectionStatus);
router.delete('/my-collection/:contentId', verifyToken, collectionController.removeFromCollection);
// Check stato singolo film
router.get('/my-collection/check/:contentId', verifyToken, collectionController.getItemStatus);

// --- 4. RECENSIONI ---
router.get('/reviews/:contentId', reviewController.getContentReviews);
router.post('/reviews', verifyToken, validateReview, reviewController.createReview);
router.put('/reviews/:reviewId', verifyToken, reviewController.updateReview);
router.delete('/reviews/:reviewId', verifyToken, reviewController.deleteReview);

// --- 5. LISTE PERSONALIZZATE ---
router.get('/lists', listController.getLists);
router.get('/lists/:id', listController.getListDetails);
router.post('/lists', verifyToken, listController.createList);
router.put('/lists/:id', verifyToken, listController.updateList);
router.delete('/lists/:id', verifyToken, listController.deleteList);
router.post('/lists/:id/items', verifyToken, listController.addListItem);
router.delete('/lists/:id/items/:contentId', verifyToken, listController.removeListItem);

// --- 6. SOCIAL & ATTIVITÀ ---
router.get('/my-activity', verifyToken, socialController.getMyActivity);
router.post('/follow/:userId', verifyToken, socialController.followUser);
router.delete('/follow/:userId', verifyToken, socialController.unfollowUser);
router.get('/feed', verifyToken, socialController.getActivityFeed);
router.get('/users', verifyToken, socialController.getAllUsers);
router.get('/follow/status/:userId', verifyToken, socialController.checkFollowStatus);
// 4. Feed Amici (Home Social)
router.get('/feed', verifyToken, socialController.getActivityFeed);
// 5. Statistiche Utente
router.get('/users/:userId/stats', socialController.getUserStats);
router.post('/follow/:userId', verifyToken, socialController.followUser);
router.delete('/follow/:userId', verifyToken, socialController.unfollowUser);
router.get('/users/:userId/followers', verifyToken, socialController.getUserFollowers);
router.get('/users/:userId/following', verifyToken, socialController.getUserFollowing);
router.get('/users/:userId/activity', verifyToken, socialController.getUserPublicActivity);
router.get('/users/search', verifyToken, socialController.searchUsers);

  

module.exports = router;