import React, { useState, useEffect } from "react";
import { Container, Typography, Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom"; // Importez useParams pour récupérer l'ID de l'examen

const TeacherValidation = () => {
    const [grades, setGrades] = useState([]);
    const { examId } = useParams(); // Récupérez l'ID de l'examen depuis l'URL

    // Charger les notes depuis l'API
    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(`http://localhost:3000/api/corrections/${examId}`, { // Utilisez l'ID de l'examen dynamiquement
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setGrades(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des notes", error);
            }
        };

        fetchGrades();
    }, [examId]); // Déclenchez le chargement lorsque l'ID de l'examen change

    // Fonction pour valider ou modifier une note
    const validateGrade = async (id, noteFinale) => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                "http://localhost:3000/api/updateNote",
                { submissionId: id, noteFinale },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Mettre à jour l'état local
            setGrades(grades.map(grade =>
                grade.id === id ? { ...grade, note_finale: noteFinale, validated: true } : grade
            ));
        } catch (error) {
            console.error("Erreur lors de la validation de la note", error);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Validation des Notes (Examen ID: {examId}) {/* Affichez l'ID de l'examen pour vérification */}
            </Typography>
            <List>
                {grades.map((grade) => (
                    <ListItem key={grade.id} divider>
                        <ListItemText
                            primary={`Étudiant: ${grade.User?.prenom} ${grade.User?.nom}`}
                            secondary={`Note Auto: ${grade.note_auto || "N/A"} | Note Finale: ${grade.note_finale || "N/A"}`}
                        />
                        {!grade.validated && (
                            <>
                                <TextField
                                    type="number"
                                    label="Note Finale"
                                    defaultValue={grade.note_auto || 0}
                                    onChange={(e) => {
                                        const updatedGrades = grades.map(g =>
                                            g.id === grade.id ? { ...g, note_finale: parseFloat(e.target.value) } : g
                                        );
                                        setGrades(updatedGrades);
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => validateGrade(grade.id, grade.note_finale)}
                                >
                                    Valider
                                </Button>
                            </>
                        )}
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default TeacherValidation;