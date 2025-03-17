const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const { sequelize } = require("./models");
const routes = require("./routes"); // Import des routes

dotenv.config();

const app = express();

// Middlewares de base
app.use(express.json()); // Pour parser les requêtes JSON
app.use(cors({
  origin: 'http://localhost:4001', // Autoriser les requêtes du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes autorisées
  credentials: true, // Autoriser les cookies et les en-têtes d'authentification
}));

// Middleware de logging pour les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Servir les fichiers statiques du dossier uploads/exams
app.use('/uploads/exams', express.static(path.join(__dirname, 'uploads/exams')));
// Servir les fichiers statiques du dossier uploads/submissions
app.use('/uploads/submissions', express.static(path.join(__dirname, 'uploads/submissions')));

// Test de la connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie.'))
  .catch(err => console.error('Impossible de se connecter à la base de données:', err));

// Synchronisation des modèles avec la base de données
sequelize.sync({ force: false }) // Ne pas forcer la synchronisation (évite de supprimer les données)
  .then(() => console.log('Modèles synchronisés avec la base de données.'))
  .catch(err => console.error('Erreur de synchronisation des modèles :', err));

// Utilisation des routes
app.use(routes); // Utilise les routes définies dans routes/index.js

// Route de bienvenue
app.get("/", (req, res) => {
    res.send("Bienvenue sur la plateforme de gestion d'examens !");
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
});