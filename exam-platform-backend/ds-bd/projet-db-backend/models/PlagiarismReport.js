// models/PlagiarismReport.js
module.exports = (sequelize, DataTypes) => {
    const PlagiarismReport = sequelize.define('PlagiarismReport', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      submission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      score_plagiat: {
        type: DataTypes.DECIMAL(5, 2), // Correspond à decimal(5,2)
        allowNull: false,
      },
      rapport_details: {
        type: DataTypes.TEXT, // Correspond à text
        allowNull: false,
      },
      date_generation: {
        type: DataTypes.DATE, // Correspond à timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles
      },
    }, {
      tableName: 'plagiarism_reports',
      timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques de Sequelize
    });
  
    return PlagiarismReport;
  };