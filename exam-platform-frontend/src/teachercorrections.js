import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Alert,
} from "@mui/material";
import axios from "axios";

const TeacherCorrections = () => {
  const [submissions, setSubmissions] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  // Charger les soumissions depuis l'API
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token"); // Récupérer le token depuis le localStorage
        const response = await axios.get("http://localhost:3000/api/submissions", {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
          },
        });
        setSubmissions(response.data); // Mettre à jour l'état avec les données reçues
      } catch (error) {
        console.error("Erreur lors du chargement des soumissions", error);
        setAlertMessage("Erreur lors du chargement des soumissions.");
      }
    };

    fetchSubmissions();
  }, []);

  // Déclencher la correction automatique
  const handleCorrection = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Récupérer le token depuis le localStorage
      const response = await axios.post(
        `http://localhost:3000/api/submissions/${id}/corriger`,
        {
          texteCorrigeType: "Corrigé type de l'examen", // Remplacez par le corrigé type réel
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ajouter le token dans les en-têtes
          },
        }
      );

      // Utilisation explicite de la variable `response`
      console.log("Réponse de la correction automatique :", response.data);

      // Afficher un message de succès avec les détails de la réponse
      setAlertMessage(`Correction automatique générée avec succès ! Note : ${response.data.noteAuto}`);

      // Recharger les soumissions pour afficher la correction
      const updatedResponse = await axios.get("http://localhost:3000/api/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmissions(updatedResponse.data);
    } catch (error) {
      console.error("Erreur lors de la correction automatique", error);
      setAlertMessage("Erreur lors de la correction automatique.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Corrections Automatiques
      </Typography>

      {alertMessage && (
        <Alert severity="info" style={{ marginBottom: 20 }}>
          {alertMessage}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Étudiant</strong>
              </TableCell>
              <TableCell>
                <strong>Fichier</strong>
              </TableCell>
              <TableCell>
                <strong>Correction</strong>
              </TableCell>
              <TableCell>
                <strong>Note Auto</strong>
              </TableCell>
              <TableCell>
                <strong>Action</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {submissions.map((submission) => (
              <TableRow key={submission.id}>
                <TableCell>
                  {submission.User?.prenom} {submission.User?.nom}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    href={`http://localhost:3000/${submission.fichier_submission}`}
                    target="_blank"
                  >
                    Télécharger
                  </Button>
                </TableCell>
                <TableCell>{submission.corrige_auto || "Non corrigé"}</TableCell>
                <TableCell>{submission.note_auto || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleCorrection(submission.id)}
                  >
                    Corriger
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TeacherCorrections;