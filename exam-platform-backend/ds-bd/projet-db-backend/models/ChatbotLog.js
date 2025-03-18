// models/ChatbotLog.js
module.exports = (sequelize, DataTypes) => {
    const ChatbotLog = sequelize.define('ChatbotLog', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      etudiant_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT, // Correspond à text
        allowNull: false,
      },
      reponse: {
        type: DataTypes.TEXT, // Correspond à text
        allowNull: false,
      },
      date_interaction: {
        type: DataTypes.DATE, // Correspond à timestamp
        allowNull: false,
        defaultValue: DataTypes.NOW, // Valeur par défaut : date et heure actuelles
      },
    }, {
      tableName: 'chatbot_logs',
      timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques de Sequelize
    });
  
    return ChatbotLog;
  };