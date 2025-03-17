const express = require('express');
const router = express.Router();
const SubmissionController = require('../controllers/SubmissionController');
const { authenticate, isEtudiant } = require('../middleware/authMiddleware');
const { uploadSubmission } = require('../config/multer'); // Importer Multer pour les soumissions
const { corrigerCopie } = require('../services/correctionService'); // Importer le service de correction automatique
const { Submission } = require('../models'); // Importer le modèle Submission

// Route pour soumettre une copie (protégée par authentification et rôle étudiant)
router.post(
  '/submissions',
  authenticate, // Vérifie que l'utilisateur est connecté
  isEtudiant, // Vérifie que l'utilisateur est un étudiant
  uploadSubmission.single('fichier_submission'), // Gère l'upload du fichier PDF
  SubmissionController.createSubmission // Contrôleur pour créer la soumission
);

// Obtenir toutes les soumissions (protégée par authentification)
router.get('/submissions', authenticate, SubmissionController.getAllSubmissions);

// Obtenir une soumission par son ID (protégée par authentification)
router.get('/submissions/:id', authenticate, SubmissionController.getSubmissionById);

// Mettre à jour une soumission (protégée par authentification)
router.put('/submissions/:id', authenticate, SubmissionController.updateSubmission);

// Supprimer une soumission (protégée par authentification)
router.delete('/submissions/:id', authenticate, SubmissionController.deleteSubmission);

// Correction automatique d'une copie
router.post('/corriger', authenticate, SubmissionController.corrigerCopie);

// Récupérer les corrections automatiques et les notes
router.get('/corrections/:examId', authenticate, SubmissionController.getCorrections);

// Modifier ou valider les notes proposées par l'IA
router.put('/updateNote', authenticate, SubmissionController.updateNote);

// Récupérer les statistiques détaillées
router.get('/statistics/:examId', authenticate, SubmissionController.getStatistics);

// Nouvelle route pour déclencher la correction automatique d'une soumission
router.post('/submissions/:id/corriger', authenticate, async (req, res) => {
  const { id } = req.params; // ID de la soumission
  const { texteCorrigeType } = req.body; // Corrigé type de l'examen

  try {
    // Récupérer la soumission depuis la base de données
    const submission = await Submission.findByPk(id);
    if (!submission) {
      return res.status(404).json({ error: "Soumission non trouvée." });
    }

    // Chemin du fichier PDF soumis
    const fichierPath = submission.fichier_submission;

    // Générer la correction automatique
    const correction = await corrigerCopie(fichierPath, texteCorrigeType);

    // Extraire la note de la réponse de l'IA
    const noteMatch = correction.match(/Note : (\d+)\/20/);
    const noteAuto = noteMatch ? parseFloat(noteMatch[1]) : null;

    // Mettre à jour la soumission avec la correction et la note
    await submission.update({
      corrige_auto: correction,
      note_auto: noteAuto,
    });

    // Renvoyer la réponse
    res.json({ correction, noteAuto });
  } catch (error) {
    console.error("Erreur lors de la correction automatique :", error);
    res.status(500).json({ error: "Erreur lors de la correction automatique." });
  }
});

module.exports = router;