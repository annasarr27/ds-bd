// import React from "react";
// import { Container, Typography } from "@mui/material";

// const TeacherSubmissions = () => {
//   return (
//     <Container>
//       <Typography variant="h4">Copies Soumises</Typography>
//     </Container>
//   );
// };

// export default TeacherSubmissions; 

import React, { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import axios from "axios";

const TeacherSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);

  // Récupérer la liste des copies soumises
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get("/api/submissions"); // Remplace par ton API
        setSubmissions(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des copies", error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Copies Soumises</Typography>

      {submissions.length === 0 ? (
        <Typography variant="body1">Aucune copie soumise pour le moment.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Étudiant</strong></TableCell>
                <TableCell><strong>Matière</strong></TableCell>
                <TableCell><strong>Date de soumission</strong></TableCell>
                <TableCell><strong>Fichier</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell>{submission.studentName}</TableCell>
                  <TableCell>{submission.subject}</TableCell>
                  <TableCell>{new Date(submission.date).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" href={submission.fileUrl} target="_blank">
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
