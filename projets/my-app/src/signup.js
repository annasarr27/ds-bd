import React, { useState } from "react";
import { 
  TextField, Button, Container, Typography, 
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel 
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("student"); // Par défaut, étudiant
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        status,
      });

      console.log(response.data);
      alert("Inscription réussie !");
      
      // ✅ Rediriger vers le bon tableau de bord selon le statut
      if (status === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
      
    } catch (error) {
      console.error("Erreur lors de l'inscription", error);
      alert("Une erreur s'est produite lors de l'inscription.");
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
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          label="Nom"
          fullWidth
          margin="normal"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
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
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Statut</FormLabel>
          <RadioGroup
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <FormControlLabel value="student" control={<Radio />} label="Étudiant" />
            <FormControlLabel value="teacher" control={<Radio />} label="Enseignant" />
          </RadioGroup>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          S'inscrire
        </Button>
      </form>
    </Container>
  );
};

export default Signup;

