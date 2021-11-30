const express = require('express');
const router = express.Router();

//Import des middleware
const auth = require('../middleware/auth');

//Import des controlleurs  de user.js en interraction avec la base de données
const userCtrl = require('../controllers/user');

//Liaison entre les routes et les méthodes de user.js
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.get('/get/all', userCtrl.getAllUser);
router.get('/get/:id', auth, userCtrl.getOneUser);
router.put('/modify/:id', auth, userCtrl.modifyUser);
router.delete('/delete/:id', auth, userCtrl.deleteUser);

module.exports = router;