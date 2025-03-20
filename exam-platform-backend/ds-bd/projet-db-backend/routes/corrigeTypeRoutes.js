const express = require("express");
const router = express.Router();
const { uploadCorrigeType } = require("../config/multer");
const { Exam } = require("../models");

// Route pour téléverser un fichier corrigé type
router.post("/exams/:examId/corrige-type", uploadCorrigeType.single("corrigeTypeFile"), async (req, res) => {
    try {
        const filePath = req.file.path; // Chemin du fichier téléversé
        const examId = req.params.examId; // ID de l'examen

        // Mettre à jour l'examen avec le chemin du fichier corrigé type
        await Exam.update(
            { fichier_corrige_type: filePath },
            { where: { id: examId } }
        );

        res.json({ message: "Fichier corrigé type téléversé avec succès !", filePath });
    } catch (error) {
        console.error("Erreur lors du téléversement du fichier corrigé type :", error);
        res.status(500).json({ error: "Erreur lors du téléversement du fichier corrigé type." });
    }
});

module.exports = router;