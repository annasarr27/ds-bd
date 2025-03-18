// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('./controllers/UserController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');

// Routes pour les utilisateurs
router.post('/users', UserController.createUser); // Créer un utilisateur (publique)
router.post('/login', UserController.login); // Connexion (publique)
router.get('/users', authenticate, isAdmin, UserController.getAllUsers); // Obtenir tous les utilisateurs (protégée, admin seulement)
router.get('/users/:id', authenticate, UserController.getUserById); // Obtenir un utilisateur par son ID (protégée)
router.put('/users/:id', authenticate, UserController.updateUser); // Mettre à jour un utilisateur (protégée)
router.delete('/users/:id', authenticate, isAdmin, UserController.deleteUser); // Supprimer un utilisateur (protégée, admin seulement)

module.exports = router;