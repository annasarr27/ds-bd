// routes/chatbotLogRoutes.js
const express = require('express');
const router = express.Router();
const ChatbotLogController = require('../controllers/ChatbotLogController');
const { authenticate } = require('../middleware/authMiddleware');

// Routes pour les logs de chatbot
router.post('/chatbot-logs', authenticate, ChatbotLogController.createChatbotLog); // Protégée
router.get('/chatbot-logs', authenticate, ChatbotLogController.getAllChatbotLogs); // Protégée
router.get('/chatbot-logs/:id', authenticate, ChatbotLogController.getChatbotLogById); // Protégée
router.put('/chatbot-logs/:id', authenticate, ChatbotLogController.updateChatbotLog); // Protégée
router.delete('/chatbot-logs/:id', authenticate, ChatbotLogController.deleteChatbotLog); // Protégée

module.exports = router;