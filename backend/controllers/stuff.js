//Initialisation du modèle Thing
const Thing = require('../models/thing');
const fs = require('fs');


//Méthode de création d'un produit dans la base de données MongoDB
exports.createThing = (req, res, next) => {

  //Initialisation de thingObject avec les données à insérer
  const thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    reserv: 0
  });

  //Insertion des données dans la BDD MongoDB
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error }));
};



//Méthode d'obtention des informations des produits à vendre d'un utilisateur
exports.getThing = (req, res, next) => {

  //Recherche des informations des produits de l'utilisateur
  Thing.find({
    userId: req.params.id
  }).then(

    //Envoi des informations
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};



//Méthode d'obtention des informations d'un produit 
exports.getOneThing = (req, res, next) => {

  //Recherche des informations d'un produit suivant son ID
  Thing.findOne({
    _id: req.params.id
  }).then(

    //Envoi des informations
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};



//Méthode de modification du champs reserv d'un produit 
exports.modifyReservation = (req, res, next) => {

  //Initialisation de thingObject avec les informations à modifier 
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
    } : { ...req.body };

  //Modification du champs reserv d'un produit selon son ID
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Réservation modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};



//Méthode de modification des informations d'un produit de la base de données MongoDB
exports.modifyThing = (req, res, next) => {

  //Initialisation de thingObject avec les informations à modifier 
  const thingObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  //Modification des champs d'un produit selon son ID
  Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch(error => res.status(400).json({ error }));
};



//Méthode de supression d'un produit de la base de données MongoDB
exports.deleteThing = (req, res, next) => {

  //Recherche d'un produit selon son ID
  Thing.findOne({ _id: req.params.id })
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {

        //Suppression d'un produit selon son ID
        Thing.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};



//Méthode d'obtention des informations des produits de la base de données MongoDB
exports.getAllStuff = (req, res, next) => {

  //Recherche des produits à vendre
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    
    //Envoi des informations
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};