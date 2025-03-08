import React from 'react';
import { Typography, Container } from '@mui/material';

const Results = () => {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Résultats et Corrections
      </Typography>
      <Typography variant="body1">
        Consultez vos résultats et les corrections automatiques ici.
      </Typography>
    </Container>
  );
};

export default Results;