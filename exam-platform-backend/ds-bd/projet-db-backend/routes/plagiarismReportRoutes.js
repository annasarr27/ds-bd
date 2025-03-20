const express = require('express');
const router = express.Router();
const PlagiarismReportController = require('../controllers/PlagiarismReportController');
const { authenticate, isEnseignant } = require('../middleware/authMiddleware');

// Routes pour les rapports de plagiat
router.post('/plagiarism-reports', authenticate, isEnseignant, PlagiarismReportController.createPlagiarismReport); // Protégée
router.get('/plagiarism-reports', authenticate, isEnseignant, PlagiarismReportController.getAllPlagiarismReports); // Protégée
router.get('/plagiarism-reports/:id', authenticate, isEnseignant, PlagiarismReportController.getPlagiarismReportById); // Protégée
router.put('/plagiarism-reports/:id', authenticate, isEnseignant, PlagiarismReportController.updatePlagiarismReport); // Protégée
router.delete('/plagiarism-reports/:id', authenticate, isEnseignant, PlagiarismReportController.deletePlagiarismReport); // Protégée

// Détection de plagiat
router.post('/detecterPlagiat', authenticate, isEnseignant, async (req, res) => {
    const { texteOriginal, autresCopies } = req.body;
  
    try {
      const resultat = detecterPlagiat(texteOriginal, autresCopies);
      res.json({ resultat });
    } catch (error) {
      console.error("Erreur lors de la détection de plagiat :", error);
      res.status(500).json({ error: "Erreur lors de la détection de plagiat" });
    }
  });
  
module.exports = router;