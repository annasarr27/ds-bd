import React from 'react';
import { Typography, Box } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
      <Typography variant="h6" align="center" gutterBottom>
        Plateforme d'Examens
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        © 2023 Tous droits réservés.
      </Typography>
    </Box>
  );
};

export default Footer;