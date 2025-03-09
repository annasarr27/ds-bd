import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Plateforme d'Examens
        </Typography>
        <Button color="inherit" component={Link} to="/">Accueil</Button>
        <Button color="inherit" component={Link} to="/login">Connexion</Button>
        {/* <Button color="inherit" component={Link} to="/dashboard">Tableau de Bord</Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;