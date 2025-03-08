import axios from 'axios';

// Fonction pour créer un examen
const createExam = async (title, file) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('file', file);

  const response = await axios.post('/api/exams', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Fonction pour récupérer la liste des examens
const getExams = async () => {
  const response = await axios.get('/api/exams');
  return response.data;
};

// Fonction pour supprimer un examen
const deleteExam = async (id) => {
  const response = await axios.delete(`/api/exams/${id}`);
  return response.data;
};

// Exportez les fonctions
export default {
  createExam,
  getExams,
  deleteExam,
};




