const http = require('http');
const app = require('./app');

//Renvoie d'un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

//Initalisation du port
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

//Vérification de l'utilisation du port d'écoute et de l'accessibilité du serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {

    //Problème de droit d'accès
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
      
    //Problème de port déja utiliser
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Initialisation de server
const server = http.createServer(app);

//Renseignement/Initialisation de l'url du serveur
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//Lancement du serveur au port 3000 
server.listen(port);
