import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const TeacherBoard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord Enseignant
      </Typography>
      <Box mt={4} display="flex" flexDirection="column" gap={2}>
        <Button variant="contained" component={Link} to="/teacherexams">
          Gérer les Examens
        </Button>
        <Button variant="contained" component={Link} to="/teachersubmissions">
          Consulter les Copies
        </Button>
        <Button variant="contained" component={Link} to="/teachercorrections">
          Voir les Corrections
        </Button>
        <Button variant="contained" component={Link} to="/teachervalidation">
          Valider les Notes
        </Button>
        <Button variant="contained" component={Link} to="/teacherstatistics">
          Voir les Statistiques
        </Button>
      </Box>
    </Container>
  );
};

export default TeacherBoard;


