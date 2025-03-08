import React from 'react';
import { Typography, Container } from '@mui/material';

const Statistics = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Statistiques
      </Typography>
      <Typography variant="body1">
        Visualisez les statistiques des examens ici.
      </Typography>
    </Container>
  );
};

export default Statistics;