import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [mot_de_passe, setMotDePasse] = useState("");
  const [status, setStatus] = useState("etudiant"); // Par défaut, l'utilisateur est un étudiant
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Données envoyées :", { prenom, nom, email, mot_de_passe, role: status }); // Affiche les données envoyées

      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        prenom,
        nom,
        email,
        mot_de_passe,
        role: status, // Ici, "status" correspond à "role" dans la base de données
      });

      console.log("Réponse du backend :", response.data); // Affiche la réponse du backend
      toast.success("Inscription réussie !");
      navigate("/login"); // Redirige vers la page de connexion après l'inscription
    } catch (error) {
      console.error(
        "Erreur lors de l'inscription :",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.error ||
          "Une erreur s'est produite lors de l'inscription."
      );
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Inscription
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Prénom"
          fullWidth
          margin="normal"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          required
        />
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Mot de passe"
          fullWidth
          margin="normal"
          type="password"
          value={mot_de_passe}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Statut</FormLabel>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel
              value="etudiant"
              control={<Radio />}
              label="Étudiant"
            />
            <FormControlLabel
              value="enseignant"
              control={<Radio />}
              label="Enseignant"
            />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          S'inscrire
        </Button>
      </form>
      <Typography variant="body2" style={{ marginTop: "10px" }}>
        Déjà inscrit ? <a href="/login">Connectez-vous ici</a>
      </Typography>
      <ToastContainer />
    </Container>
  );
};

export default Signup;