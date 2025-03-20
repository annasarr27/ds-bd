module.exports = (sequelize, DataTypes) => {
    const Exam = sequelize.define(
        'Exam', // Nom du modèle
        {
            // Définition des colonnes de la table
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            titre: {
                type: DataTypes.STRING(255), // Correspond à VARCHAR(255)
                allowNull: false, // Le champ ne peut pas être null
            },
            description: {
                type: DataTypes.TEXT, // Correspond à TEXT
                allowNull: false, // Le champ ne peut pas être null
            },
            enseignant_id: {
                type: DataTypes.INTEGER, // Correspond à INT
                allowNull: false, // Le champ ne peut pas être null
            },
            date_creation: {
                type: DataTypes.DATE, // Correspond à TIMESTAMP
                allowNull: false, // Le champ ne peut pas être null
                defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles
            },
            fichier_exam: {
                type: DataTypes.STRING(255), // Correspond à VARCHAR(255)
                allowNull: false, // Le champ ne peut pas être null
            },
            fichier_corrige_type: {
                type: DataTypes.STRING(255), // Correspond à VARCHAR(255)
                allowNull: true, // Le champ peut être null
            },
        },
        {
            // Options supplémentaires
            tableName: 'exams', // Nom de la table dans la base de données
            timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques de Sequelize
        }
    );
    return Exam;
  };
