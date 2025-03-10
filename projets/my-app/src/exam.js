import React, { useEffect, useState } from 'react';
import { Typography, Button, List, ListItem, ListItemText, Container } from '@mui/material';
import axios from 'axios';

const StudentExam = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    // Récupérer la liste des examens depuis l'API
    axios.get('/api/exams')
      .then(response => setExams(response.data))
      .catch(error => console.error("Erreur lors du chargement des examens", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Examens Disponibles
      </Typography>
      <List>
        {exams.length > 0 ? (
          exams.map((exam) => (
            <ListItem key={exam.id} divider>
              <ListItemText primary={exam.title} />
              <Button variant="contained" color="primary" href={`/exam/${exam.id}`}>
                Passer l'Examen
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography>Aucun examen disponible pour le moment.</Typography>
        )}
      </List>
    </Container>
  );
};

export default StudentExam;



