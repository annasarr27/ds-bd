import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Button,
  TextField,
  Paper,
  Grid,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TeacherExam = () => {
  const [examTitle, setExamTitle] = useState("");
  const [examDescription, setExamDescription] = useState("");
  const [examFile, setExamFile] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleAddExam = async (e) => {
    e.preventDefault();

    // Vérifier si un fichier a été sélectionné
    if (!examFile) {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }

    // Récupérer le token du localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token manquant !");
      alert("Vous devez être connecté pour ajouter un examen.");
      return;
    }

    // Créer un FormData pour envoyer les données
    const formData = new FormData();
    formData.append("titre", examTitle);
    formData.append("description", examDescription);
    formData.append("fichier_exam", examFile);

    // Configuration de l'en-tête avec le token
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      console.log("Envoi des données au backend..."); // Log avant l'envoi
      const response = await axios.post("http://localhost:3000/api/exams", formData, config);
      console.log("Réponse du backend :", response.data); // Log de la réponse

      // Afficher un message de succès
      setSnackbarMessage("Examen ajouté avec succès !");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Réinitialiser le formulaire après succès
      setExamTitle("");
      setExamDescription("");
      setExamFile(null);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'examen :", error.response?.data || error.message); // Log de l'erreur

      // Afficher un message d'erreur
      setSnackbarMessage(error.response?.data?.error || "Erreur lors de l'ajout de l'examen.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ajouter un Examen
      </Typography>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <form onSubmit={handleAddExam}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre de l'examen"
                fullWidth
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description de l'examen"
                fullWidth
                value={examDescription}
                onChange={(e) => setExamDescription(e.target.value)}
                required
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setExamFile(e.target.files[0])}
                required
                style={{ display: "none" }}
                id="upload-file"
              />
              <label htmlFor="upload-file">
                <Button variant="outlined" component="span" fullWidth sx={{ py: 1 }}>
                  Téléverser un fichier PDF
                </Button>
              </label>
              {examFile && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Fichier sélectionné : {examFile.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5 }}>
                Ajouter Examen
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default TeacherExam;