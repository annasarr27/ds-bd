import React from "react";
import { Container, Typography, Box } from "@mui/material"; // ✅ Ajout de Box
import { Link, useNavigate } from "react-router-dom"; // ✅ Ajout de useNavigate

const Home = () => {
  const navigate = useNavigate();
  
  const passerExam = () => {
    navigate('/exam'); // ✅ Fonction de navigation corrigée
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
        textAlign: "center",
        padding: 3,
      }}
    >
      <Typography variant="h2" fontWeight="bold" gutterBottom>
        Bienvenue sur ExamMaster 🎓
      </Typography>
      <Typography variant="h5" sx={{ maxWidth: 600, opacity: 0.9 }}>
        Une plateforme intuitive pour gérer vos examens, soumettre vos copies
        et consulter vos résultats en toute simplicité.
      </Typography>

      {/* <Box mt={4} display="flex" gap={2}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          component={Link}
          to="/exam"
          
        >
          Passer un Examen
        </Button>
        
  
        <Button
          variant="outlined"
          color="inherit"
          size="large"
          component={Link}
          to="/results"
        >
          Voir Résultats
        </Button>
      </Box> */}
    </Box>
  );
};

export default Home;
