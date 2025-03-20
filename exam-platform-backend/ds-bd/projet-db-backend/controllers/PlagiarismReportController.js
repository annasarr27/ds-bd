const { PlagiarismReport, Submission } = require('../models');
const { detecterPlagiat } = require('../services/plagiarismService'); // Import du service de détection de plagiat

// Créer un rapport de plagiat
exports.createPlagiarismReport = async (req, res) => {
  try {
    // Vérifier que l'utilisateur authentifié est un enseignant
    if (req.user.role !== 'enseignant') {
      return res.status(403).json({ error: 'Accès refusé. Réservé aux enseignants.' });
    }

    const { submission_id, score_plagiat, rapport_details } = req.body;
    const plagiarismReport = await PlagiarismReport.create({ submission_id, score_plagiat, rapport_details });
    res.status(201).json(plagiarismReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les rapports de plagiat
exports.getAllPlagiarismReports = async (req, res) => {
  try {
    const plagiarismReports = await PlagiarismReport.findAll({ include: Submission });
    res.status(200).json(plagiarismReports);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un rapport de plagiat par son ID
exports.getPlagiarismReportById = async (req, res) => {
  try {
    const plagiarismReport = await PlagiarismReport.findByPk(req.params.id, { include: Submission });
    if (!plagiarismReport) {
      return res.status(404).json({ error: 'Rapport de plagiat non trouvé' });
    }
    res.status(200).json(plagiarismReport);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un rapport de plagiat
exports.updatePlagiarismReport = async (req, res) => {
  try {
    const { submission_id, score_plagiat, rapport_details } = req.body;
    const [updated] = await PlagiarismReport.update(
      { submission_id, score_plagiat, rapport_details },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedPlagiarismReport = await PlagiarismReport.findByPk(req.params.id);
      res.status(200).json(updatedPlagiarismReport);
    } else {
      res.status(404).json({ error: 'Rapport de plagiat non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un rapport de plagiat
exports.deletePlagiarismReport = async (req, res) => {
  try {
    const deleted = await PlagiarismReport.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Rapport de plagiat non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Détection de plagiat
exports.detecterPlagiat = async (req, res) => {
  const { texteOriginal, autresCopies } = req.body;

  try {
    const resultat = detecterPlagiat(texteOriginal, autresCopies);
    res.json({ resultat });
  } catch (error) {
    console.error("❌ Erreur lors de la détection de plagiat :", error);
    res.status(500).json({ error: "Erreur lors de la détection de plagiat" });
  }
};