import React, { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText } from "@mui/material";
import axios from "axios";

const TeacherValidation = () => {
  const [grades, setGrades] = useState([]);

  // Charger les notes depuis l'API
  useEffect(() => {
    axios.get("/api/submissions/corrections/1") // Remplace 1 par l'ID de l'examen
      .then(response => {
        setGrades(response.data);
      })
      .catch(error => {
        console.error("Erreur lors du chargement des notes", error);
      });
  }, []);

  // Fonction pour valider une note
  const validateGrade = (id, noteFinale) => {
    axios.put("/api/submissions/updateNote", { submissionId: id, noteFinale })
      .then(() => {
        setGrades(grades.map(grade =>
          grade.id === id ? { ...grade, validated: true } : grade
        ));
      })
      .catch(error => {
        console.error("Erreur lors de la validation de la note", error);
      });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Validation des Notes
      </Typography>
      <List>
        {grades.map((grade) => (
          <ListItem key={grade.id} divider>
            <ListItemText
              primary={`Note: ${grade.note_finale || grade.note_auto}`}
              secondary={grade.validated ? "Validée" : "En attente"}
            />
            {!grade.validated && (
              <Button
                variant="contained"
                color="primary"
                onClick={() => validateGrade(grade.id, grade.note_finale)}
              >
                Valider
              </Button>
            )}
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TeacherValidation;