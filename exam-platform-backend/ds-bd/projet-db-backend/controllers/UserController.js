const { User } = require('../models');
const jwt = require('jsonwebtoken');

// Inscription d'un utilisateur
exports.signup = async (req, res) => {
  try {
    const { prenom, nom, email, mot_de_passe, role } = req.body;

    // Validation des champs obligatoires
    if (!prenom || !nom || !email || !mot_de_passe || !role) {
      return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Créer un nouvel utilisateur
    const newUser = await User.create({
      prenom,
      nom,
      email,
      mot_de_passe,
      role,
    });

    // Renvoyer la réponse sans le mot de passe
    const userResponse = { ...newUser.toJSON() };
    delete userResponse.mot_de_passe;

    res.status(201).json({
      success: true,
      message: 'Inscription réussie !',
      user: userResponse,
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);

    // Gestion des erreurs de validation Sequelize
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors.map(e => e.message).join(', ') });
    }

    // Gestion des autres erreurs
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
};

// Connexion d'un utilisateur
exports.login = async (req, res) => {
  try {
    const { email, mot_de_passe } = req.body;

    // Trouver l'utilisateur par son email
    const user = await User.findOne({ where: { email } });

    // Si l'utilisateur n'existe pas ou si le mot de passe est incorrect
    if (!user || user.mot_de_passe !== mot_de_passe) {
      return res.status(401).json({ error: 'Identifiants invalides.' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Renvoyer le token et les informations de l'utilisateur (sans le mot de passe)
    const userResponse = { ...user.toJSON() };
    delete userResponse.mot_de_passe;

    res.status(200).json({ token, user: userResponse });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les utilisateurs
exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [
        {
          model: User, // Inclure les informations de l'enseignant
          attributes: ['prenom', 'nom'], // Sélectionner uniquement le prénom et le nom
          as: 'Enseignant', // Utiliser l'alias défini dans l'association
        },
      ],
    });
    res.status(200).json(exams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la récupération des examens.' });
  }
};

// Obtenir un utilisateur par son ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ['mot_de_passe'] }, // Exclure le mot de passe des résultats
    });

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier que l'utilisateur authentifié est l'utilisateur concerné ou un administrateur
    if (req.user.userId !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé. Vous n\'avez pas les droits nécessaires.' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }

    // Vérifier que l'utilisateur authentifié est l'utilisateur concerné ou un administrateur
    if (req.user.userId !== user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé. Vous n\'avez pas les droits nécessaires.' });
    }

    const { prenom, nom, email, mot_de_passe, role } = req.body;

    // Mettre à jour l'utilisateur avec le mot de passe en clair
    const [updated] = await User.update(
      { prenom, nom, email, mot_de_passe, role },
      { where: { id: req.params.id } }
    );

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id, {
        attributes: { exclude: ['mot_de_passe'] }, // Exclure le mot de passe des résultats
      });
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    // Vérifier que l'utilisateur authentifié est un administrateur
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
    }

    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};