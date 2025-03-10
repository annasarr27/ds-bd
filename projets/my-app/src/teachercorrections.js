import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Alert } from "@mui/material";
import axios from "axios";

const TeacherCorrections = () => {
  const [corrections, setCorrections] = useState([]);
  const [plagiarismReport, setPlagiarismReport] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");

  // Charger les corrections depuis l'API
  useEffect(() => {
    const fetchCorrections = async () => {
      try {
        const response = await axios.get("/api/corrections"); // Remplace par ton API
        setCorrections(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des corrections", error);
      }
    };

    fetchCorrections();
  }, []);

  // Modifier la note d'un étudiant
  const handleGradeChange = (id, newGrade) => {
    setCorrections((prev) =>
      prev.map((correction) =>
        correction.id === id ? { ...correction, grade: newGrade } : correction
      )
    );
  };

  // Modifier le commentaire de correction
  const handleCommentChange = (id, newComment) => {
    setCorrections((prev) =>
      prev.map((correction) =>
        correction.id === id ? { ...correction, comment: newComment } : correction
      )
    );
  };

  // Valider la correction
  const handleValidate = async (id) => {
    try {
      await axios.post(`/api/corrections/${id}/validate`);
      alert("Correction validée !");
    } catch (error) {
      console.error("Erreur lors de la validation", error);
    }
  };

  // Détecter le plagiat
  const handleDetectPlagiarism = async () => {
    try {
      // Envoyer les copies des étudiants au backend pour détection de plagiat
      const response = await axios.post("/api/plagiarism/detect", { submissions: corrections });
      const report = response.data;

      // Mettre à jour le rapport de plagiat
      setPlagiarismReport(report);

      // Si un plagiat est détecté, envoyer une alerte
      if (report.length > 0) {
        setAlertMessage("Plagiat détecté ! Vérifiez le rapport ci-dessous.");
      } else {
        setAlertMessage("Aucun plagiat détecté.");
      }
    } catch (error) {
      console.error("Erreur lors de la détection de plagiat", error);
      setAlertMessage("Erreur lors de la détection de plagiat.");
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Corrections Automatiques</Typography>

      {corrections.length === 0 ? (
        <Typography variant="body1">Aucune correction disponible.</Typography>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Étudiant</strong></TableCell>
                  <TableCell><strong>Matière</strong></TableCell>
                  <TableCell><strong>Note Auto</strong></TableCell>
                  <TableCell><strong>Modifier Note</strong></TableCell>
                  <TableCell><strong>Commentaire</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {corrections.map((correction) => (
                  <TableRow key={correction.id}>
                    <TableCell>{correction.studentName}</TableCell>
                    <TableCell>{correction.subject}</TableCell>
                    <TableCell>{correction.autoGrade}</TableCell>
                    <TableCell>
                      <TextField
                        type="number"
                        value={correction.grade || correction.autoGrade}
                        onChange={(e) => handleGradeChange(correction.id, e.target.value)}
                        inputProps={{ min: 0, max: 20 }}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        value={correction.comment || ""}
                        onChange={(e) => handleCommentChange(correction.id, e.target.value)}
                        placeholder="Ajouter un commentaire"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="success" onClick={() => handleValidate(correction.id)}>
                        Valider
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Bouton pour détecter le plagiat */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleDetectPlagiarism}
            style={{ marginTop: "20px" }}
          >
            Détecter le Plagiat
          </Button>

          {/* Afficher une alerte si un plagiat est détecté */}
          {alertMessage && (
            <Alert severity={plagiarismReport.length > 0 ? "warning" : "info"} style={{ marginTop: "20px" }}>
              {alertMessage}
            </Alert>
          )}

          {/* Afficher le rapport de plagiat */}
          {plagiarismReport.length > 0 && (
            <>
              <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
                Rapport de Plagiat
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Étudiant 1</strong></TableCell>
                      <TableCell><strong>Étudiant 2</strong></TableCell>
                      <TableCell><strong>Similarité</strong></TableCell>
                      <TableCell><strong>Statut</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plagiarismReport.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.student1}</TableCell>
                        <TableCell>{entry.student2}</TableCell>
                        <TableCell>{entry.similarity}%</TableCell>
                        <TableCell>{entry.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default TeacherCorrections;