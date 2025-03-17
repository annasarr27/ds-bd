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
} from "@mui/material";
import axios from "axios";

const TeacherSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  // Récupérer la liste des copies soumises
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/submissions", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des copies :", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Copies Soumises
      </Typography>

      {submissions.length === 0 ? (
        <Typography variant="body1">Aucune copie soumise pour le moment.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Étudiant</strong>
                </TableCell>
                <TableCell>
                  <strong>Examen</strong>
                </TableCell>
                <TableCell>
                  <strong>Date de soumission</strong>
                </TableCell>
                <TableCell>
                  <strong>Fichier</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.User?.prenom} {submission.User?.nom}</TableCell>
                  <TableCell>{submission.Exam?.titre}</TableCell>
                  <TableCell>{new Date(submission.date_submission).toLocaleString()}</TableCell>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default TeacherSubmissions;