import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      // ✅ Sauvegarde du token et du statut dans le localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("status", response.data.status); // Ex: "teacher" ou "student"

      // ✅ Rediriger selon le statut de l'utilisateur
      if (response.data.status === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.error("Erreur de connexion", error);
      alert("Identifiants incorrects. Veuillez réessayer.");
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
    </Container>
  );
};

export default Login;
