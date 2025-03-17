const ollama = require("ollama").default;
const fs = require("fs");
const pdf = require("pdf-parse");

async function corrigerCopie(fichierPath, texteCorrigeType) {
  try {
    // Lire le fichier PDF
    const dataBuffer = fs.readFileSync(fichierPath);
    const data = await pdf(dataBuffer);

    // Extraire le texte du PDF
    const texteCopie = data.text;

    // Envoyer le texte à l'IA pour correction
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
        timeout: 60000, // Augmenter le délai d'attente à 60 secondes
      },
    });

    return response.response;
  } catch (error) {
    console.error("Erreur lors de la correction automatique :", error);
    return "Erreur lors de la correction automatique.";
  }
}

module.exports = { corrigerCopie };