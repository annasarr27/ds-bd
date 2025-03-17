const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Chemin du dossier de destination
const uploadDir = 'uploads/exams';
const uploadSubmissionsDir = 'uploads/submissions';


// Vérifier si le dossier existe, sinon le créer 
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
if (!fs.existsSync(uploadSubmissionsDir)) {
  fs.mkdirSync(uploadSubmissionsDir, { recursive: true });
}

// Configuration du stockage des fichiers examens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // Dossier où les fichiers seront stockés
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique avec la date et l'extension d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Configuration du stockage des fichiers pour les soumissions
const storageSubmissions = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadSubmissionsDir ); // Dossier où les fichiers de soumissions seront stockés
  },
  filename: function (req, file, cb) {
    // Générer un nom de fichier unique avec la date et l'extension d'origine
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileName = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, fileName);
  },
});


// Filtre pour n'accepter que les fichiers PDF
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Seuls les fichiers PDF sont autorisés.'), false);
  }
};

// Configuration de multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 Mo
});


const uploadSubmission = multer({
  storage: storageSubmissions,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 Mo
});


// Middleware pour gérer les erreurs de téléversement
const handleUploadErrors = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Erreur liée à Multer (par exemple, taille de fichier dépassée)
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // Autres erreurs (par exemple, fichier non PDF)
    return res.status(400).json({ error: err.message });
  }
  next();
};

module.exports = { upload, uploadSubmission, handleUploadErrors };