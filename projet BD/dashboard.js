import React from 'react';
import { Typography, Container } from '@mui/material';

const Dashboard = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Tableau de Bord
      </Typography>
      <Typography variant="body1">
        Bienvenue sur votre tableau de bord. Vous pouvez gérer vos examens et consulter les résultats.
      </Typography>
    </Container>
  );
};

export default Dashboard;