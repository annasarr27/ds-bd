import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Exam = () => {
  const [examTitle, setExamTitle] = useState('');
  const [examFile, setExamFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', examTitle);
    formData.append('file', examFile);

    try {
      const response = await axios.post('/api/exams', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Examen créé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la création de l\'examen', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Créer un Examen
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Titre de l'examen"
          fullWidth
          margin="normal"
          value={examTitle}
          onChange={(e) => setExamTitle(e.target.value)}
          required
        />
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setExamFile(e.target.files[0])}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Créer
        </Button>
      </form>
    </Container>
  );
};

export default Exam;



