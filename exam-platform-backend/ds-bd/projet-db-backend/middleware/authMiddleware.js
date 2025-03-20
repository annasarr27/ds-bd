const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Importez le modèle User si nécessaire


// Middleware pour vérifier le token JWT
const authenticate = async (req, res, next) => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Si le token n'existe pas, renvoyer une erreur
    if (!token) {
      return res.status(401).json({ error: 'Accès non autorisé. Token manquant.' });
    }

    // Vérifier et décoder le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Trouver l'utilisateur associé au token
    const user = await User.findByPk(decoded.userId); // Assurez-vous que le token contient `userId`

    // Si l'utilisateur n'existe pas, renvoyer une erreur
    if (!user) {
      return res.status(401).json({ error: 'Accès non autorisé. Utilisateur introuvable.' });
    }

    // Ajouter l'utilisateur et le token à la requête pour une utilisation ultérieure
    req.user = user;
    req.token = token;

    // Passer à la prochaine fonction middleware ou au contrôleur
    next();
  } catch (error) {
    // Gérer les erreurs (token invalide, expiration, etc.)
    res.status(401).json({ error: 'Accès non autorisé. Token invalide.' });
  }
};

// Middleware pour vérifier le rôle de l'utilisateur (optionnel)
const isEnseignant = (req, res, next) => {
  if (req.user.role !== 'enseignant') {
    return res.status(403).json({ error: 'Accès refusé. Réservé aux enseignants.' });
  }
  next();
};

const isEtudiant = (req, res, next) => {
  if (req.user.role !== 'etudiant') {
    return res.status(403).json({ error: 'Accès refusé. Réservé aux étudiants.' });
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Accès refusé. Réservé aux administrateurs.' });
  }
  next();
};

// Exporter les middlewares
module.exports = {
  authenticate,
  isEnseignant,
  isEtudiant,
  isAdmin,
};