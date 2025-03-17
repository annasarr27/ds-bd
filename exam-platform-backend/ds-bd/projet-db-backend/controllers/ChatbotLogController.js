exports.createChatbotLog = async (req, res) => {
  try {
    const { question } = req.body; // Récupérer la question du corps de la requête
    const etudiant_id = req.user.id; // Récupérer l'ID de l'utilisateur authentifié

    if (!question) {
      return res.status(400).json({ error: "La question est requise." });
    }

    // Simuler une réponse du chatbot (remplace cela par une interaction avec un modèle d'IA)
    const reponse = `Réponse simulée pour la question : ${question}`;

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