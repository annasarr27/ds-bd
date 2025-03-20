const { Exam } = require('../models');

// Téléverser un fichier corrigé type
exports.uploadCorrigeType = async (req, res) => {
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
};

// Récupérer le fichier corrigé type d'un examen
exports.getCorrigeType = async (req, res) => {
    try {
        const examId = req.params.examId; // ID de l'examen

        // Récupérer l'examen avec le chemin du fichier corrigé type
        const exam = await Exam.findByPk(examId, {
            attributes: ['fichier_corrige_type'] // Sélectionner uniquement le chemin du fichier corrigé type
        });

        if (!exam || !exam.fichier_corrige_type) {
            return res.status(404).json({ error: "Fichier corrigé type non trouvé." });
        }

        // Renvoyer le chemin du fichier corrigé type
        res.json({ fichier_corrige_type: exam.fichier_corrige_type });
    } catch (error) {
        console.error("Erreur lors de la récupération du fichier corrigé type :", error);
        res.status(500).json({ error: "Erreur lors de la récupération du fichier corrigé type." });
    }
};