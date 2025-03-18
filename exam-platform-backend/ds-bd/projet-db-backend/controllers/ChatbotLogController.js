const { ChatbotLog, User } = require('../models');
const { Ollama } = require('ollama'); // Assurez-vous d'avoir installé le package ollama

const ollama = new Ollama({ host: 'http://localhost:11434' }); // Assurez-vous que Ollama est en cours d'exécution sur ce port

exports.createChatbotLog = async (req, res) => {
  try {
    const { question } = req.body; // Récupérer la question du corps de la requête
    const etudiant_id = req.user.id; // Récupérer l'ID de l'utilisateur authentifié

    if (!question) {
      return res.status(400).json({ error: "La question est requise." });
    }

    let reponse;
    try {
      // Interagir avec Ollama pour obtenir une réponse de DeepSeek
      console.log("Envoi de la question à Ollama :", question); // Log pour déboguer
      const response = await ollama.generate({
        model: 'deepseek-coder', // Utilisez le modèle DeepSeek que vous avez téléchargé via Ollama
        prompt: `Réponds en français : ${question}`, // Ajoutez une instruction en français
      });

      console.log("Réponse de l'IA (Ollama) :", response); // Log pour déboguer

      // Vérifier que la réponse est bien définie
      if (!response || !response.response) { // Utilisez `response.response` au lieu de `response.text`
        throw new Error("La réponse de l'IA est invalide ou vide.");
      }

      reponse = response.response; // Extraire la réponse de l'IA
    } catch (ollamaError) {
      console.error("Erreur lors de la génération de la réponse par Ollama :", ollamaError);
      reponse = "Désolé, une erreur s'est produite lors de la génération de la réponse.";
    }

    // Stocker la question et la réponse dans la base de données
    const chatbotLog = await ChatbotLog.create({ etudiant_id, question, reponse });

    res.status(201).json({ reponse }); // Renvoyer la réponse au frontend
  } catch (error) {
    console.error("Erreur lors de la création du log de chatbot :", error);
    res.status(400).json({ error: error.message });
  }
};

// Obtenir tous les logs de chatbot
exports.getAllChatbotLogs = async (req, res) => {
  try {
    const chatbotLogs = await ChatbotLog.findAll({ include: User });
    res.status(200).json(chatbotLogs);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtenir un log de chatbot par son ID
exports.getChatbotLogById = async (req, res) => {
  try {
    const chatbotLog = await ChatbotLog.findByPk(req.params.id, { include: User });
    if (!chatbotLog) {
      return res.status(404).json({ error: 'Log de chatbot non trouvé' });
    }
    res.status(200).json(chatbotLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mettre à jour un log de chatbot
exports.updateChatbotLog = async (req, res) => {
  try {
    const { etudiant_id, question, reponse } = req.body;
    const [updated] = await ChatbotLog.update(
      { etudiant_id, question, reponse },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedChatbotLog = await ChatbotLog.findByPk(req.params.id);
      res.status(200).json(updatedChatbotLog);
    } else {
      res.status(404).json({ error: 'Log de chatbot non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un log de chatbot
exports.deleteChatbotLog = async (req, res) => {
  try {
    const deleted = await ChatbotLog.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Log de chatbot non trouvé' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};