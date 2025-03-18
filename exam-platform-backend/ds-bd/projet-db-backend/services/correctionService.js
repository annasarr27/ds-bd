const ollama = require("ollama").default;
const fs = require("fs");
const pdf = require("pdf-parse");
const path = require("path");

async function extraireTextePDF(fichierPath) {
  try {
    if (!fs.existsSync(fichierPath)) {
      throw new Error(`Le fichier ${fichierPath} n'existe pas.`);
    }
    const dataBuffer = fs.readFileSync(fichierPath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Erreur lors de l'extraction du texte du PDF :", error);
    throw new Error("Impossible de lire le fichier PDF.");
  }
}

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

    return response.response;
  } catch (error) {
    console.error("Erreur lors de la génération de la correction :", error);
    throw new Error("Erreur lors de la génération de la correction automatique.");
  }
}

async function corrigerCopie(fichierPath, texteCorrigeType) {
  try {
    const texteCopie = await extraireTextePDF(fichierPath);
    const correction = await genererCorrection(texteCopie, texteCorrigeType);

    const noteMatch = correction.match(/Note : (\d+)\/20/);
    const noteAuto = noteMatch ? parseFloat(noteMatch[1]) : null;

    return { correction, noteAuto };
  } catch (error) {
    console.error("Erreur lors de la correction automatique :", error);
    throw new Error("Erreur lors de la correction automatique.");
  }
}

module.exports = { corrigerCopie };