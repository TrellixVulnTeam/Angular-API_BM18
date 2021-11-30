const express = require('express');
const router = express.Router();

//Import des middleware
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Import des controlleurs de stuff.js en interraction avec la base de données
const stuffCtrl = require('../controllers/stuff');

//Liaison entre les routes et les méthodes de stuff.js
router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.get('/user/:id', auth, stuffCtrl.getThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.put('/reservation/:id', auth, stuffCtrl.modifyReservation);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;