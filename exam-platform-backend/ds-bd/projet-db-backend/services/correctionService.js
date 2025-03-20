const ollama = require("ollama").default;
const fs = require("fs");
const pdf = require("pdf-parse");

// Fonction pour extraire le texte d'un fichier PDF
async function extraireTextePDF(fichierPath) {
    try {
        if (!fs.existsSync(fichierPath)) {
            throw new Error(`Le fichier ${fichierPath} n'existe pas.`);
        }
        const dataBuffer = fs.readFileSync(fichierPath);
        const data = await pdf(dataBuffer);
        return data.text;
    } catch (error) {
        console.error("Erreur lors de l'extraction du texte du PDF :", error.stack);
        throw new Error("Impossible de lire le fichier PDF.");
    }
}

// Fonction pour générer la correction en utilisant l'IA
async function genererCorrection(texteCopie, texteCorrigeType) {
    try {
        const prompt = `
            Tu es un correcteur d'examen expert. Ton objectif est d'évaluer la copie d'un étudiant en la comparant à un corrigé type.
            - Lis attentivement la copie de l'étudiant et le corrigé type.
            - Attribue une note sur 20 en fonction de la pertinence des réponses.
            - Justifie ta notation en expliquant les points forts et les erreurs.

            Copie de l'étudiant :
            ${texteCopie}

            Corrigé type :
            ${texteCorrigeType}

            Réponds sous ce format :
            - Note : XX/20
            - Explication : "..."
        `;

        const response = await ollama.generate({
            model: "deepseek-coder",
            prompt: prompt,
            options: {
                timeout: 60000, // Délai d'attente de 60 secondes
            },
        });

        console.log("Réponse de l'IA :", response.response); // Log pour vérifier la réponse

        // Extraction de la note
        const noteMatch = response.response.match(/Note\s*:\s*(\d+)\/20/i); // Plus flexible pour les espaces et la casse
        const noteAuto = noteMatch ? parseFloat(noteMatch[1]) : null;

        if (noteAuto === null || noteAuto < 0 || noteAuto > 20 || isNaN(noteAuto)) {
            throw new Error("L'IA n'a pas généré de note valide.");
        }

        return { correction: response.response, noteAuto };
    } catch (error) {
        console.error("Erreur lors de la génération de la correction :", error.stack);
        throw new Error("Erreur lors de la génération de la correction automatique.");
    }
}

// Fonction principale pour corriger une copie
async function corrigerCopie(fichierPath, corrigeTypePath) {
    try {
        // Extraire le texte de la copie de l'étudiant
        const texteCopie = await extraireTextePDF(fichierPath);
        console.log("Texte extrait du PDF de l'étudiant :", texteCopie);

        // Extraire le texte du corrigé type
        const texteCorrigeType = await extraireTextePDF(corrigeTypePath);
        console.log("Texte extrait du corrigé type :", texteCorrigeType);

        // Limiter la longueur du texte envoyé à l'IA
        const texteCopieLimite = texteCopie.substring(0, 1000); // Limite le texte à 1000 caractères
        const texteCorrigeTypeLimite = texteCorrigeType.substring(0, 1000); // Limite le texte à 1000 caractères

        // Générer la correction automatique
        const { correction, noteAuto } = await genererCorrection(texteCopieLimite, texteCorrigeTypeLimite);

        return { correction, noteAuto };
    } catch (error) {
        console.error("Erreur lors de la correction automatique :", error.stack);
        throw new Error("Erreur lors de la correction automatique.");
    }
}

module.exports = { corrigerCopie };