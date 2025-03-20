const stringSimilarity = require("string-similarity");

function detecterPlagiat(texteOriginal, autresCopies) {
  let resultat = [];

  autresCopies.forEach((copie, index) => {
    let score = stringSimilarity.compareTwoStrings(texteOriginal, copie);
    resultat.push({
      copie_id: index + 1,
      texte: copie,
      similarite: (score * 100).toFixed(2) + "%",
    });
  });

  return resultat;
}

module.exports = { detecterPlagiat };