const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//Import des fichiers route
const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

//Initialisation de app
const app = express();
app.use(bodyParser.json());

//Initialisation de la base de données MongoDB Atlas
mongoose.connect('mongodb+srv://emmanuel:0wTH1lsrNC8cs97p@egrolleau.lqgyw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//Utilisation de la route basique /images
app.use('/images', express.static(path.join(__dirname, 'images')));

//Utilisation de la route basique /api/stuff en liaison avec le fichier route stuff
app.use('/api/stuff', stuffRoutes);
//Utilisation de la route basique /api/auth en liaison avec le fichier route auth
app.use('/api/auth', userRoutes);


module.exports = app;