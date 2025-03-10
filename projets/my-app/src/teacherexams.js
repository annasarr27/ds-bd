// // import React from "react";
// // import { Container, Typography } from "@mui/material";

// // const TeacherExam = () => {
// //   return (
// //     <Container>
// //       <Typography variant="h4">Gestion des Examens</Typography>
// //     </Container>
// //   );
// // };

// // export default TeacherExam;


// import React, { useState, useEffect } from "react";
// import { Container, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";

// const TeacherExam = () => {
//   const [exams, setExams] = useState([]); // Liste des examens
//   const [examTitle, setExamTitle] = useState("");
//   const [examFile, setExamFile] = useState(null);

//   // 📌 Charger les examens au montage
//   useEffect(() => {
//     fetchExams();
//   }, []);

//   // ✅ Charger les examens depuis l'API
//   const fetchExams = async () => {
//     try {
//       const response = await axios.get("/api/exams");
//       setExams(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des examens", error);
//     }
//   };

//   // ✅ Ajouter un examen
//   const handleAddExam = async (e) => {
//     e.preventDefault();
//     if (!examFile) {
//       alert("Veuillez sélectionner un fichier PDF.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("title", examTitle);
//     formData.append("file", examFile);

//     try {
//       const response = await axios.post("/api/exams", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setExams([...exams, response.data]); // Mettre à jour la liste
//       setExamTitle("");
//       setExamFile(null);
//       alert("Examen ajouté avec succès !");
//     } catch (error) {
//       console.error("Erreur lors de l'ajout de l'examen", error);
//     }
//   };

//   // ✅ Supprimer un examen
//   const handleDeleteExam = async (id) => {
//     try {
//       await axios.delete(`/api/exams/${id}`);
//       setExams(exams.filter((exam) => exam.id !== id));
//     } catch (error) {
//       console.error("Erreur lors de la suppression de l'examen", error);
//     }
//   };

//   return (
//     <Container>
//       <Typography variant="h4" gutterBottom>
//         Gestion des Examens
//       </Typography>

//       {/* 📌 Formulaire d'ajout d'examen */}
//       <form onSubmit={handleAddExam} style={{ marginBottom: "20px" }}>
//         <TextField
//           label="Titre de l'examen"
//           fullWidth
//           margin="normal"
//           value={examTitle}
//           onChange={(e) => setExamTitle(e.target.value)}
//           required
//         />
//         <input
//           type="file"
//           accept="application/pdf"
//           onChange={(e) => setExamFile(e.target.files[0])}
//           required
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Ajouter Examen
//         </Button>
//       </form>

//       {/* 📌 Liste des examens */}
//       <List>
//         {exams.length > 0 ? (
//           exams.map((exam) => (
//             <ListItem key={exam.id}>
//               <ListItemText primary={exam.title} secondary={`Ajouté le : ${new Date(exam.createdAt).toLocaleDateString()}`} />
//               <ListItemSecondaryAction>
//                 <IconButton edge="end" color="error" onClick={() => handleDeleteExam(exam.id)}>
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItemSecondaryAction>
//             </ListItem>
//           ))
//         ) : (
//           <Typography>Aucun examen ajouté.</Typography>
//         )}
//       </List>
//     </Container>
//   );
// };

// export default TeacherExam;

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const TeacherExam = () => {
  const [exams, setExams] = useState([]); // Liste des examens
  const [examTitle, setExamTitle] = useState("");
  const [examFile, setExamFile] = useState(null);

  // 📌 Charger les examens au montage
  useEffect(() => {
    fetchExams();
  }, []);

  // ✅ Charger les examens depuis l'API
  const fetchExams = async () => {
    try {
      const response = await axios.get("/api/exams");
      setExams(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des examens", error);
    }
  };

  // ✅ Ajouter un examen
  const handleAddExam = async (e) => {
    e.preventDefault();
    if (!examFile) {
      alert("Veuillez sélectionner un fichier PDF.");
      return;
    }

    const formData = new FormData();
    formData.append("title", examTitle);
    formData.append("file", examFile);

    try {
      const response = await axios.post("/api/exams", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setExams([...exams, response.data]); // Mettre à jour la liste
      setExamTitle("");
      setExamFile(null);
      alert("Examen ajouté avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'examen", error);
    }
  };

  // ✅ Supprimer un examen
  const handleDeleteExam = async (id) => {
    try {
      await axios.delete(`/api/exams/${id}`);
      setExams(exams.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'examen", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Titre */}
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "primary.main",
          textAlign: "center",
          mb: 4,
        }}
      >
        Gestion des Examens
      </Typography>

      {/* Formulaire d'ajout d'examen */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Ajouter un Examen
        </Typography>
        <form onSubmit={handleAddExam}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Titre de l'examen"
                fullWidth
                value={examTitle}
                onChange={(e) => setExamTitle(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setExamFile(e.target.files[0])}
                required
                style={{ display: "none" }}
                id="upload-file"
              />
              <label htmlFor="upload-file">
                <Button
                  variant="outlined"
                  component="span"
                  fullWidth
                  sx={{ py: 1 }}
                >
                  Téléverser un fichier PDF
                </Button>
              </label>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ py: 1.5 }}
              >
                Ajouter Examen
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Liste des examens */}
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Liste des Examens
        </Typography>
        {exams.length > 0 ? (
          <List>
            {exams.map((exam) => (
              <ListItem
                key={exam.id}
                sx={{
                  border: "1px solid #e0e0e0",
                  borderRadius: 1,
                  mb: 1,
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <ListItemText
                  primary={exam.title}
                  secondary={`Ajouté le : ${new Date(exam.createdAt).toLocaleDateString()}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => handleDeleteExam(exam.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center" }}>
            Aucun examen ajouté.
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default TeacherExam;
