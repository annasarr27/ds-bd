import React, { useEffect, useState } from "react";
import { Container, Typography, Paper } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios";

Chart.register(...registerables);

const TeacherStatistics = () => {
  const [average, setAverage] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [gradesDistribution, setGradesDistribution] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get("/api/statistics"); // Remplace par ton API
        const { average, successRate, gradesDistribution } = response.data;
        setAverage(average);
        setSuccessRate(successRate);
        setGradesDistribution(gradesDistribution);
      } catch (error) {
        console.error("Erreur lors du chargement des statistiques", error);
      }
    };

    fetchStatistics();
  }, []);

  // Données pour le graphique de distribution des notes
  const barData = {
    labels: ["0-5", "6-10", "11-15", "16-20"],
    datasets: [
      {
        label: "Nombre d'étudiants",
        data: gradesDistribution,
        backgroundColor: ["#FF5733", "#FFC300", "#28B463", "#3498DB"],
      },
    ],
  };

  // Données pour le graphique du taux de réussite
  const pieData = {
    labels: ["Réussite", "Échec"],
    datasets: [
      {
        data: [successRate, 100 - successRate],
        backgroundColor: ["#28B463", "#E74C3C"],
      },
    ],
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Statistiques des Examens
      </Typography>

      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6">Moyenne Générale : {average.toFixed(2)} / 20</Typography>
      </Paper>

      <Paper elevation={3} style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6">Distribution des Notes</Typography>
        <Bar data={barData} />
      </Paper>

      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h6">Taux de Réussite</Typography>
        <Pie data={pieData} />
        <Typography variant="body1">{successRate}% des étudiants ont réussi.</Typography>
      </Paper>
    </Container>
  );
};

export default TeacherStatistics;
