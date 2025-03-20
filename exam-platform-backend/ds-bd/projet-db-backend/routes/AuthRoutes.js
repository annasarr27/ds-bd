const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Route de connexion
router.post('/login', async (req, res) => {
  const { email, mot_de_passe } = req.body;

  if (!email || !mot_de_passe) {
    return res.status(400).json({ error: 'Email et mot de passe sont obligatoires.' });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user || user.mot_de_passe !== mot_de_passe) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect.' });
    }

    res.status(200).json({
      success: true,
      message: 'Connexion réussie !',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la connexion.' });
  }
});

// Route d'inscription
router.post('/signup', async (req, res) => {
  const { prenom, nom, email, mot_de_passe, role } = req.body;

  if (!prenom || !nom || !email || !mot_de_passe || !role) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires.' });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    const newUser = await User.create({
      prenom,
      nom,
      email,
      mot_de_passe,
      role,
    });

    res.status(201).json({
      success: true,
      message: 'Inscription réussie !',
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'inscription.' });
  }
});



module.exports = router;