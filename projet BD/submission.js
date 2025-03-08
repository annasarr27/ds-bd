import React, { useState } from 'react';
import { Button, Container, Typography } from '@mui/material';
import axios from 'axios';

const Submission = () => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/submissions', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Copie soumise avec succès !');
    } catch (error) {
      console.error('Erreur lors de la soumission de la copie', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Soumettre une Copie
      </Typography>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Soumettre
        </Button>
      </form>
    </Container>
  );
};

export default Submission;




