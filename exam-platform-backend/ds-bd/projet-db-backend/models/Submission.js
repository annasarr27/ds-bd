module.exports = (sequelize, DataTypes) => {
    const Submission = sequelize.define('Submission', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      etudiant_id: {
        type: DataTypes.INTEGER, // Correspond à int
        allowNull: false,
      },
      exam_id: {
        type: DataTypes.INTEGER, // Correspond à int
        allowNull: false,
      },
      fichier_submission: {
        type: DataTypes.STRING(255), // Correspond à varchar(255)
        allowNull: false,
      },
      date_submission: {
        type: DataTypes.DATE, // Correspond à timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles
      },
      corrige_auto: {
        type: DataTypes.TEXT, // Correspond à text
        allowNull: true, // Peut être null si la correction automatique n'est pas encore faite
      },
      note_auto: {
        type: DataTypes.DECIMAL(5, 2), // Correspond à decimal(5,2)
        allowNull: true, // Peut être null si la note n'est pas encore calculée
      },
      note_finale: {
        type: DataTypes.DECIMAL(5, 2), // Correspond à decimal(5,2)
        allowNull: true, // Peut être null si la note finale n'est pas encore attribuée
      },
    }, {
      tableName: 'submissions', // Nom de la table dans la base de données
      timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques de Sequelize
    });
    
  
    return Submission;
  };