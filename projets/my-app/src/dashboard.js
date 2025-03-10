import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  TextField,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Fonction pour gérer l'envoi du fichier PDF
  const handleFileUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("Fichier soumis :", selectedFile.name);
      alert("Votre réponse a été soumise avec succès !");
    } else {
      alert("Veuillez sélectionner un fichier.");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Titre */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          textAlign: "center",
          mb: 4,
        }}
      >
        Tableau de Bord Étudiant
      </Typography>

      {/* Description */}
      <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
        Bienvenue sur votre tableau de bord. Vous pouvez accéder aux examens, soumettre vos réponses et consulter vos résultats.
      </Typography>

      {/* Boutons Principaux */}
      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/exam"
            sx={{ px: 4, py: 2 }}
          >
            Passer un Examen
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            color="inherit"
            size="large"
            component={Link}
            to="/results"
            sx={{ px: 4, py: 2 }}
          >
            Voir Résultats
          </Button>
        </Grid>
      </Grid>

      {/* Soumission des réponses en PDF */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Soumettre une réponse (PDF)
        </Typography>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{ mb: 2, py: 1 }}
          >
            Téléverser un fichier PDF
          </Button>
        </label>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          fullWidth
          sx={{ py: 1.5 }}
        >
          Soumettre
        </Button>
      </Paper>

      {/* Chatbot pour poser des questions */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Posez une question sur un sujet ou une correction
        </Typography>
        <TextField
          fullWidth
          placeholder="Posez votre question ici..."
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ py: 1.5 }}
        >
          Envoyer au Chatbot
        </Button>
      </Paper>
    </Container>
  );
};

export default Dashboard;