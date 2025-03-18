const { Exam, User } = require('../models');


// Créer un examen avec upload de fichier PDF
exports.createExam = async (req, res) => {
  try {
    // Récupérer les données de la requête
    const { titre, description } = req.body;
    const fichier_exam = req.file ? req.file.path : null; // Chemin du fichier téléchargé

    // Vérifier que l'utilisateur est bien un enseignant
    if (!req.user || req.user.role !== 'enseignant') {
      return res.status(403).json({ error: 'Accès refusé. Vous devez être enseignant.' });
    }

    // Vérifier que les champs obligatoires sont remplis
    if (!titre || !description || !fichier_exam) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Créer l'examen dans la base de données
    const exam = await Exam.create({
      titre,
      description,
      enseignant_id: req.user.id, // ID de l'enseignant
      fichier_exam,
    });

    res.status(201).json(exam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur est survenue lors de l\'ajout de l\'examen.' });
  }
};

// Obtenir tous les examens
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [
        {
          model: User, // Inclure les informations de l'enseignant
          attributes: ['prenom', 'nom'], // Sélectionner uniquement le prénom et le nom
          as: 'Enseignant', // Alias pour l'association
        },
      ],
    });
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des examens.' });
  }
};

// Obtenir un examen par son ID
exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id, { include: User });
    if (!exam) {
      return res.status(404).json({ error: 'Examen non trouvé' });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un examen
exports.updateExam = async (req, res) => {
  try {
    const { titre, description } = req.body;
    const exam = await Exam.findByPk(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Examen non trouvé' });
    }

    // Vérifier que l'utilisateur authentifié est l'enseignant qui a créé l'examen
    if (exam.enseignant_id !== req.user.id) {
      return res.status(403).json({ error: 'Accès refusé. Vous n\'êtes pas l\'enseignant de cet examen.' });
    }

    let fichier_exam = exam.fichier_exam;
    if (req.file) {
      fichier_exam = req.file.path; // Mettre à jour le fichier si un nouveau fichier est uploadé
    }

    const [updated] = await Exam.update(
      { titre, description, fichier_exam },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedExam = await Exam.findByPk(req.params.id);
      res.status(200).json(updatedExam);
    } else {
      res.status(404).json({ error: 'Examen non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un examen
exports.deleteExam = async (req, res) => {
  try {
    const exam = await Exam.findByPk(req.params.id);

    if (!exam) {
      return res.status(404).json({ error: 'Examen non trouvé' });
    }

    // Vérifier que l'utilisateur authentifié est l'enseignant qui a créé l'examen
    if (exam.enseignant_id !== req.user.id) {
      return res.status(403).json({ error: 'Accès refusé. Vous n\'êtes pas l\'enseignant de cet examen.' });
    }

    const deleted = await Exam.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Examen non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};