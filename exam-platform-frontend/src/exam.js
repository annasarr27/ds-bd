import React, { useEffect, useState } from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import axios from "axios";
import DownloadIcon from "@mui/icons-material/Download";
import PersonIcon from "@mui/icons-material/Person";
import EventIcon from "@mui/icons-material/Event";
import DescriptionIcon from "@mui/icons-material/Description";

const StudentExam = () => {
  const [exams, setExams] = useState([]);

  // Récupérer les examens disponibles
  const fetchExams = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3000/api/exams/available", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Examen reçu :", response.data); // Inspectez la structure ici
      setExams(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des examens :", error);
    }
  };

  // Charger les examens au montage du composant
  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 4 }}>
        Examens Disponibles
      </Typography>
      {exams.length > 0 ? (
        <Grid container spacing={3}>
          {exams.map((exam) => (
            <Grid item key={exam.id} xs={12} sm={6} md={4}>
              <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="div" gutterBottom>
                    <DescriptionIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    {exam.titre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {exam.description}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    <PersonIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Enseignant : {exam.Enseignant?.prenom} {exam.Enseignant?.nom}
                  </Typography>
                  <Typography variant="body2">
                    <EventIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                    Date de création : {new Date(exam.date_creation).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DownloadIcon />}
                    href={`http://localhost:3000/${exam.fichier_exam}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    fullWidth
                  >
                    Télécharger l'examen (PDF)
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1" sx={{ mt: 4 }}>
          Aucun examen disponible pour le moment.
        </Typography>
      )}
    </Container>
  );
};

export default StudentExam;