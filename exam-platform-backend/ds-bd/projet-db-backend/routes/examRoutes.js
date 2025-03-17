const express = require('express');
const router = express.Router();
const ExamController = require('../controllers/ExamController');
const { upload, handleUploadErrors } = require('../config/multer'); // Middleware pour l'upload de fichiers
const { authenticate, isEnseignant } = require('../middleware/authMiddleware');

// Routes pour les examens

// Créer un examen (protégée par authentification et rôle enseignant)
// Route pour ajouter un examen
router.post(
    '/exams',
    authenticate, // Vérifie que l'utilisateur est connecté
    isEnseignant, // Vérifie que l'utilisateur est un enseignant
    upload.single('fichier_exam'), // Gère l'upload du fichier PDF
    handleUploadErrors, // Gère les erreurs de téléversement
    ExamController.createExam // Contrôleur pour créer l'examen
  );

// Obtenir tous les examens disponibles (protégée par authentification)
router.get(
  '/exams/available',
  authenticate, // Vérifie que l'utilisateur est connecté
  ExamController.getAllExams // Contrôleur pour récupérer tous les examens
);

// Obtenir un examen par son ID (protégée par authentification)
router.get(
  '/exams/:id',
  authenticate, // Vérifie que l'utilisateur est connecté
  ExamController.getExamById // Contrôleur pour récupérer un examen par ID
);

// Mettre à jour un examen (protégée par authentification et rôle enseignant)
router.put(
  '/exams/:id',
  authenticate, // Vérifie que l'utilisateur est connecté
  isEnseignant, // Vérifie que l'utilisateur est un enseignant
  upload.single('fichier_exam'), // Gère l'upload du fichier PDF
  ExamController.updateExam // Contrôleur pour mettre à jour l'examen
);

// Supprimer un examen (protégée par authentification et rôle enseignant)
router.delete(
  '/exams/:id',
  authenticate, // Vérifie que l'utilisateur est connecté
  isEnseignant, // Vérifie que l'utilisateur est un enseignant
  ExamController.deleteExam // Contrôleur pour supprimer l'examen
);

module.exports = router;