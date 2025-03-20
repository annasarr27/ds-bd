const { Submission, User, Exam } = require('../models');
const { corrigerCopie } = require('../services/correctionService'); // Import du service de correction automatique

// Soumettre une copie avec fichier PDF
exports.createSubmission = async (req, res) => {
  try {
    console.log("Route /api/submissions atteinte"); // Log pour vérifier que la route est atteinte
    console.log("Fichier reçu :", req.file); // Log du fichier reçu
    console.log("Données reçues :", req.body); // Log des autres données reçues

    const { exam_id } = req.body;
    const etudiant_id = req.user.id;

    // Vérifier si un fichier a été uploadé
    if (!req.file) {
      console.log("Aucun fichier uploadé.");
      return res.status(400).json({ error: 'Aucun fichier uploadé.' });
    }

    console.log("Fichier uploadé :", req.file);

    // Vérifier si l'examen existe
    const exam = await Exam.findByPk(exam_id);
    if (!exam) {
      console.log("Examen non trouvé.");
      return res.status(404).json({ error: 'Examen non trouvé.' });
    }

    // Chemin du fichier uploadé
    const fichier_submission = req.file.path;
    console.log("Chemin du fichier :", fichier_submission);

    // Créer la soumission
    const submission = await Submission.create({
      etudiant_id,
      exam_id,
      fichier_submission,
      date_submission: new Date(), // Ajouter la date de soumission
    });

    console.log("Soumission créée :", submission);

    res.status(201).json(submission);
  } catch (error) {
    console.error('Erreur lors de la soumission :', error);
    res.status(400).json({ error: error.message });
  }
};

// Obtenir toutes les soumissions
exports.getAllSubmissions = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      include: [
        {
          model: User, // Inclure les informations de l'étudiant
          attributes: ['prenom', 'nom'], // Sélectionner uniquement le prénom et le nom
        },
        {
          model: Exam, // Inclure les informations de l'examen
          attributes: ['titre'], // Sélectionner uniquement le titre
        },
      ],
    });
    res.status(200).json(submissions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir une soumission par son ID
exports.getSubmissionById = async (req, res) => {
  try {
    const submission = await Submission.findByPk(req.params.id, { include: [User, Exam] });
    if (!submission) {
      return res.status(404).json({ error: 'Soumission non trouvée' });
    }
    res.status(200).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour une soumission
exports.updateSubmission = async (req, res) => {
  try {
    const { etudiant_id, exam_id, fichier_submission } = req.body;
    const [updated] = await Submission.update(
      { etudiant_id, exam_id, fichier_submission },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedSubmission = await Submission.findByPk(req.params.id);
      res.status(200).json(updatedSubmission);
    } else {
      res.status(404).json({ error: 'Soumission non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une soumission
exports.deleteSubmission = async (req, res) => {
  try {
    const deleted = await Submission.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Soumission non trouvée' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Correction automatique d'une copie
exports.corrigerCopie = async (req, res) => {
  const { texteCopie, texteCorrigeType } = req.body;

  try {
    const resultat = await corrigerCopie(texteCopie, texteCorrigeType);
    res.json({ correction: resultat });
  } catch (error) {
    console.error("❌ Erreur lors de la correction :", error);
    res.status(500).json({ error: "Erreur de l'IA" });
  }
};

// Récupérer les corrections automatiques et les notes
exports.getCorrections = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { exam_id: req.params.examId },
      include: [{ model: User, as: 'etudiant' }]
    });
    res.json(submissions);
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des corrections :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des corrections" });
  }
};

// Modifier ou valider les notes proposées par l'IA
exports.updateNote = async (req, res) => {
  const { submissionId, noteFinale } = req.body;

  try {
    const submission = await Submission.findByPk(submissionId);
    if (submission) {
      submission.note_finale = noteFinale;
      await submission.save();
      res.json({ message: "Note mise à jour avec succès" });
    } else {
      res.status(404).json({ error: "Soumission non trouvée" });
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour de la note :", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour de la note" });
  }
};

// Récupérer les statistiques détaillées
exports.getStatistics = async (req, res) => {
  try {
    const submissions = await Submission.findAll({
      where: { exam_id: req.params.examId }
    });

    const notes = submissions.map(sub => sub.note_finale).filter(note => note !== null);
    const moyenne = notes.reduce((a, b) => a + b, 0) / notes.length;
    const distribution = notes.reduce((acc, note) => {
      acc[note] = (acc[note] || 0) + 1;
      return acc;
    }, {});

    res.json({ moyenne, distribution });
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des statistiques :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des statistiques" });
  }
};