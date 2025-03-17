import React from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const TeacherBoard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimez le token ou toute autre information de session si nécessaire
    localStorage.removeItem("token"); // Exemple de suppression du token
    navigate("/login"); // Redirection vers la page de login
  };

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
        <Button variant="contained" color="secondary" onClick={handleLogout}>
          Déconnexion
        </Button>
      </Box>
    </Container>
  );
};

export default TeacherBoard;
