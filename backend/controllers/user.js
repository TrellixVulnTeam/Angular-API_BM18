//Initialisation du model User
const User = require('../models/user');

//Initialisation de la fonction de hachage du mot de passe
const bcrypt = require('bcrypt');

//Initialisation du token
const jwt = require('jsonwebtoken');


//Méthode d'inscription d'un utilisateur à la base de données MongoDB
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {

      //Initialisation du modèle User
      const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash
      });

      //Insertion des donnèes dans la base MongoDB
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error, message: 'Utilisateur existant' }));
    })
    .catch(error => res.status(500).json({ error }));
};



//Méthode d'authentification d'un utilisateur à la base de donné MongoDB
exports.login = (req, res, next) => {

  //Comparaison de l'identifiant aux autres identifants de la base de données MongoDB
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }

      //Comparaison du hashage du mot de passe aux autres hashsages de la base de données MongoDB
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



//Méthode d'obtention des informations d'un utilisateur de la base de donné MongoDB
exports.getOneUser = (req, res, next) => {

  //Recherche des informations d'un utilisateur via son identifiant
  User.findOne({
    _id: req.params.id
  }).then(

    //Envoie des informations de l'utilisateur
    (user) => {
      res.status(200).json(user);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};



//Méthode de modification des informations d'un utilisateur de la base de donné MongoDB
exports.modifyUser = (req, res, next) => {

  //Initialisation des informations envoyées par le model utilisateur 
  const userObject = req.file ?
    {
      ...JSON.parse(req.body.user),
    } : { ...req.body };

  //Modification d'un utilisateur suivant son identifiant
  User.updateOne({ _id: req.params.id }, { ...userObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'User modifié !' }))
    .catch(error => res.status(400).json({ error }));
};



//Methode de suppression d'un utilisateur selon son identifiant 
exports.deleteUser = (req, res, next) => {

  //Recherche d'un utilisateur via son identifiant
  User.findOne({ _id: req.params.id })
    .then(user => {
      () => {

        //Supression d'un utilisateur via son identifiant
        User.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Utilisateur supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      }
    })

};



//Méthode d'obtention des utilisateur à la base de donné MongoDB
exports.getAllUser = (req, res, next) => {

  //Recherche des informations des utilisateurs dans la BDD MongoDB
  Thing.find().then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    
    //Envoi des informations des utilisateurs 
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};