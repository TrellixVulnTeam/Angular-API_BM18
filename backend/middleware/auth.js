//Initialisation du Token
const jwt = require('jsonwebtoken');

//Méthode de vérification d'un token
module.exports = (req, res, next) => {

  //Initialisation des paramètres du token
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;

    //Vérification du token
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};