//Initialisation de multer
const multer = require('multer');

//Initialisation de MIMES_TYPES pour les extensions fichiers acceptées
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//Méthode d'initialisation du multer
const storage = multer.diskStorage({
  //Renseignement du chemin de sauvegarde du fichier 
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  //Renseignement du nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//Export de la méthode
module.exports = multer({storage: storage}).single('image');