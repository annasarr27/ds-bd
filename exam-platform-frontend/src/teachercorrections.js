import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Alert,
} from "@mui/material";
import axios from "axios";

const TeacherCorrections = () => {
    const [submissions, setSubmissions] = useState([]);
    const [alertMessage, setAlertMessage] = useState("");
    const [corrigeTypeFile, setCorrigeTypeFile] = useState(null);
    const [isFileUploaded, setIsFileUploaded] = useState(false);

    // Charger les soumissions depuis l'API
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:3000/api/submissions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSubmissions(response.data);
            } catch (error) {
                console.error("Erreur lors du chargement des soumissions", error);
                setAlertMessage("Erreur lors du chargement des soumissions.");
            }
        };

        fetchSubmissions();
    }, []);

    // Soumettre le fichier corrigé type
    const handleSubmitCorrigeType = async () => {
        if (!corrigeTypeFile) {
            setAlertMessage("Veuillez sélectionner un fichier corrigé type avant de soumettre.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const formData = new FormData();
            formData.append("corrigeTypeFile", corrigeTypeFile);

            const examId = submissions[0]?.exam_id;
            console.log("ID de l'examen :", examId);

            if (!examId) {
                setAlertMessage("ID de l'examen non trouvé.");
                return;
            }

            await axios.post(
                `http://localhost:3000/api/exams/${examId}/corrige-type`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setAlertMessage("Fichier corrigé type soumis avec succès !");
            setIsFileUploaded(true);
        } catch (error) {
            console.error("Erreur lors de la soumission du fichier corrigé type :", error.response || error.message || error);
            setAlertMessage("Erreur lors de la soumission du fichier corrigé type. Vérifiez la console pour plus de détails.");
        }
    };

    // Déclencher la correction automatique
    const handleCorrection = async (id) => {
        if (!isFileUploaded) {
            setAlertMessage("Veuillez soumettre un fichier corrigé type avant de corriger.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            console.log("ID de la soumission à corriger :", id);

            const response = await axios.post(
                `http://localhost:3000/api/submissions/${id}/corriger`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Réponse de la correction automatique :", response.data);

            if (response.data.noteAuto !== null) {
                setAlertMessage(`Correction automatique générée avec succès ! Note : ${response.data.noteAuto}`);
            } else {
                setAlertMessage("Correction générée, mais la note n'a pas pu être extraite.");
            }

            // Recharger les soumissions
            const updatedResponse = await axios.get("http://localhost:3000/api/submissions", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSubmissions(updatedResponse.data);
        } catch (error) {
            console.error("Erreur lors de la correction automatique :", error.response || error.message || error);
            setAlertMessage(`Erreur lors de la correction automatique : ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Corrections Automatiques
            </Typography>

            {alertMessage && (
                <Alert severity="info" style={{ marginBottom: 20 }}>
                    {alertMessage}
                </Alert>
            )}

            {/* Champ pour sélectionner le fichier corrigé type */}
            <div style={{ marginBottom: 20 }}>
                <input
                    type="file"
                    id="corrigeTypeFile"
                    onChange={(e) => setCorrigeTypeFile(e.target.files[0])}
                    style={{ display: "none" }}
                />
                <label htmlFor="corrigeTypeFile">
                    <Button
                        variant="contained"
                        component="span"
                        color="primary"
                        style={{ marginRight: 10 }}
                    >
                        Sélectionner le corrigé type
                    </Button>
                </label>
                {corrigeTypeFile && (
                    <Typography variant="body1" style={{ marginTop: 10 }}>
                        Fichier sélectionné : {corrigeTypeFile.name}
                    </Typography>
                )}
            </div>

            {/* Bouton pour soumettre le fichier corrigé type */}
            <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmitCorrigeType}
                style={{ marginBottom: 20 }}
            >
                Soumettre le corrigé type
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>Étudiant</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Fichier</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Correction</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Note Auto</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Action</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {submissions.map((submission) => (
                            <TableRow key={submission.id}>
                                <TableCell>
                                    {submission.User?.prenom} {submission.User?.nom}
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href={`http://localhost:3000/${submission.fichier_submission}`}
                                        target="_blank"
                                    >
                                        Télécharger
                                    </Button>
                                </TableCell>
                                <TableCell>{submission.corrige_auto || "Non corrigé"}</TableCell>
                                <TableCell>{submission.note_auto || "N/A"}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleCorrection(submission.id)}
                                        disabled={!isFileUploaded}
                                    >
                                        Corriger
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default TeacherCorrections;