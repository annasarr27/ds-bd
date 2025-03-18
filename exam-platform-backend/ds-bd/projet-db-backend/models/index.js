const { Sequelize } = require('sequelize');
const sequelize = require('../config/database'); // Import de la connexion à la base de données

// Import des modèles
const User = require('./User')(sequelize, Sequelize.DataTypes);
const Exam = require('./Exam')(sequelize, Sequelize.DataTypes);
const Submission = require('./Submission')(sequelize, Sequelize.DataTypes);
const PlagiarismReport = require('./PlagiarismReport')(sequelize, Sequelize.DataTypes);
const ChatbotLog = require('./ChatbotLog')(sequelize, Sequelize.DataTypes);

// Définition des relations

// Relation entre Exam et User 
User.hasMany(Exam, { foreignKey: 'enseignant_id', as: 'Exams' }); // Alias pour les examens créés par l'enseignant
Exam.belongsTo(User, { foreignKey: 'enseignant_id', as: 'Enseignant' }); // Alias pour l'enseignant qui a créé l'examen


// Relation entre Submission et User
User.hasMany(Submission, { foreignKey: 'etudiant_id' });
Submission.belongsTo(User, { foreignKey: 'etudiant_id' });
// Relation entre Submission et Exam
Exam.hasMany(Submission, { foreignKey: 'exam_id' });
Submission.belongsTo(Exam, { foreignKey: 'exam_id' });

// Relation entre PlagiarismReport et Submission
Submission.hasMany(PlagiarismReport, { foreignKey: 'submission_id' });
PlagiarismReport.belongsTo(Submission, { foreignKey: 'submission_id' });

// Relation entre ChatbotLog et User
User.hasMany(ChatbotLog, { foreignKey: 'etudiant_id' });
ChatbotLog.belongsTo(User, { foreignKey: 'etudiant_id' });

// Export des modèles
module.exports = {
  sequelize,
  User,
  Exam,
  Submission,
  PlagiarismReport,
  ChatbotLog,
};