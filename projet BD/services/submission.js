// Fonction pour soumettre un examen
export const submitExam = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/api/submissions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Fonction pour récupérer les soumissions
export const getSubmissions = async () => {
  const response = await axios.get('/api/submissions');
  return response.data;
};