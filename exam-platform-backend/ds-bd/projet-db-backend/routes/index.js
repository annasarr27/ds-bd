const express = require('express');
const router = express.Router();

// Import des contrôleurs
const userController = require('../controllers/userController');
const examRoutes = require('./examRoutes');
const submissionRoutes = require('./submissionRoutes');
const chatbotLogRoutes = require('./chatbotLogRoutes');
const plagiarismReportRoutes = require('./plagiarismReportRoutes');
const corrigeTypeRoutes = require('./corrigeTypeRoutes'); // Import de la nouvelle route

// Routes d'authentification
router.post('/api/auth/signup', userController.signup); // Inscription
router.post('/api/auth/login', userController.login); // Connexion

// Autres routes
router.use('/api', examRoutes);
router.use('/api', submissionRoutes);
router.use('/api', chatbotLogRoutes);
router.use('/api', plagiarismReportRoutes);
router.use('/api', corrigeTypeRoutes); // Utilisation de la nouvelle route

module.exports = router;