module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define('Exam', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      titre: {
        type: DataTypes.STRING(255), // Correspond à varchar(255)
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT, // Correspond à text
        allowNull: false,
      },
      enseignant_id: {
        type: DataTypes.INTEGER, // Correspond à int
        allowNull: false,
      },
      date_creation: {
        type: DataTypes.DATE, // Correspond à timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles
      },
      fichier_exam: {
        type: DataTypes.STRING(255), // Correspond à varchar(255)
        allowNull: false,
      },
    }, {
      tableName: 'exams', // Nom de la table dans la base de données
      timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques de Sequelize
    });

    
     
    
    return Exam;
  };