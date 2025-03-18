import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [examId, setExamId] = useState("");
  const [exams, setExams] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Charger la liste des examens disponibles
  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/exams/available", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setExams(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des examens :", error);
        setSnackbarMessage("Une erreur s'est produite lors de la récupération des examens.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchExams();
  }, []);

  // Gérer la sélection du fichier PDF
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("Fichier sélectionné :", file);
  };

  // Gérer la sélection de l'examen
  const handleExamChange = (event) => {
    setExamId(event.target.value);
    console.log("Examen sélectionné :", event.target.value);
  };

  // Gérer la soumission du fichier PDF au backend
  const handleSubmit = async () => {
    if (!selectedFile) {
      setSnackbarMessage("Veuillez sélectionner un fichier.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    if (!examId) {
      setSnackbarMessage("Veuillez sélectionner un examen.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("fichier_submission", selectedFile);
    formData.append("exam_id", examId);

    console.log("Données envoyées :", { exam_id: examId, fichier_submission: selectedFile });

    try {
      const token = localStorage.getItem("token");
      console.log("Token utilisé :", token);

      const response = await axios.post("http://localhost:3000/api/submissions", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Réponse du backend :", response);

      if (response.status === 201) {
        setSnackbarMessage("Votre réponse a été soumise avec succès !");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
        setSelectedFile(null);
        setExamId("");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du fichier :", error);
      console.error("Détails de l'erreur :", error.response);
      setSnackbarMessage("Une erreur s'est produite lors de la soumission du fichier.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Gérer la soumission de la question au chatbot
  const handleChatbotSubmit = async () => {
    if (!question) {
      setSnackbarMessage("Veuillez poser une question.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:3000/api/chatbot-logs",
        { question },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const chatbotResponse = response.data.reponse;
      setResponse(chatbotResponse);
      setSnackbarMessage("Réponse du chatbot reçue !");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Erreur lors de la soumission de la question :", error);
      setSnackbarMessage("Une erreur s'est produite lors de la soumission de la question.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Gérer la fermeture du Snackbar
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  // Formater la réponse pour afficher les sauts de ligne
  const formattedResponse = response.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: "bold", color: "primary.main", textAlign: "center", mb: 4 }}>
        Tableau de Bord Étudiant
      </Typography>

      <Typography variant="body1" sx={{ textAlign: "center", mb: 4 }}>
        Bienvenue sur votre tableau de bord. Vous pouvez accéder aux examens, soumettre vos réponses et consulter vos résultats.
      </Typography>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
        <Grid item>
          <Button variant="contained" color="primary" size="large" component={Link} to="/exam" sx={{ px: 4, py: 2 }}>
            Accéder aux sujets d'examen
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="inherit" size="large" component={Link} to="/results" sx={{ px: 4, py: 2 }}>
            Voir Résultats
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" size="large" onClick={() => navigate("/login")} sx={{ px: 4, py: 2 }}>
            Déconnexion
          </Button>
        </Grid>
      </Grid>

      {/* Soumission des réponses en PDF */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Soumettre une réponse (PDF)
        </Typography>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="exam-select-label">Sélectionner un examen</InputLabel>
          <Select
            labelId="exam-select-label"
            id="exam-select"
            value={examId}
            label="Sélectionner un examen"
            onChange={handleExamChange}
            required
          >
            {exams.map((exam) => (
              <MenuItem key={exam.id} value={exam.id}>
                {exam.titre} (Créé le {new Date(exam.date_creation).toLocaleDateString()})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          style={{ display: "none" }}
          id="upload-file"
        />
        <label htmlFor="upload-file">
          <Button variant="outlined" component="span" fullWidth sx={{ mb: 2, py: 1 }}>
            Téléverser un fichier PDF
          </Button>
        </label>
        {selectedFile && (
          <Typography variant="body2" sx={{ mb: 2 }}>
            Fichier sélectionné : {selectedFile.name}
          </Typography>
        )}
        <Button variant="contained" color="secondary" onClick={handleSubmit} fullWidth sx={{ py: 1.5 }}>
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
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="success"
          onClick={handleChatbotSubmit}
          fullWidth
          sx={{ py: 1.5 }}
          disabled={isLoading}
        >
          {isLoading ? "Chargement..." : "Envoyer au Chatbot"}
        </Button>
        {response && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Réponse :</strong> {formattedResponse}
          </Typography>
        )}
        {response && (
          <Button variant="outlined" color="error" onClick={() => setResponse("")} sx={{ mt: 2 }}>
            Effacer la réponse
          </Button>
        )}
      </Paper>

      {/* Snackbar pour les messages */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;