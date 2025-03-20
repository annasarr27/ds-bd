import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Données envoyées :", { email, password }); // Affiche les données envoyées

      const response = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        mot_de_passe: password, // Utilisez le champ attendu par le backend
      });

      console.log("Réponse du backend :", response.data); // Affiche la réponse du backend

      // Sauvegarde du token et du rôle dans le localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      // Message de confirmation de connexion réussie
      toast.success("Connexion réussie ! Vous allez être redirigé...", {
        autoClose: 3000, // Ferme le message après 3 secondes
      });

      // Rediriger en fonction du rôle après un délai de 3 secondes
      setTimeout(() => {
        if (response.data.user.role === "enseignant") {
          navigate("/teacherboard");
        } else if (response.data.user.role === "etudiant") {
          navigate("/dashboard");
        } else if (response.data.user.role === "admin") {
          navigate("/admin-dashboard");
        }
      }, 2000); // Délai de 3 secondes avant la redirection
    } catch (error) {
      console.error("Erreur lors de la connexion :", error.response?.data || error.message); // Affiche les erreurs
      toast.error(error.response?.data?.error || "Email ou mot de passe incorrect");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Connexion
      </Typography>
      <form onSubmit={handleSubmit}>
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Se connecter
        </Button>
      </form>
      <Typography sx={{ marginTop: 2 }}>
        Pas encore de compte ?{" "}
        <Link component={RouterLink} to="/signup" variant="body2">
          S'inscrire
        </Link>
      </Typography>
      <ToastContainer />
    </Container>
  );
};

export default Login;