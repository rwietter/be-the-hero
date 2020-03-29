const express = require('express');
const ongsController = require('./controllers/OngController');
const incidentsController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');

const routes = express.Router(); // express instance

try {
  routes.post('/session', sessionController.create);

  routes.post('/ongs', ongsController.create);
  routes.get('/ongs', ongsController.index);

  routes.get('/profile', profileController.profile);

  routes.post('/incidents', incidentsController.create);
  routes.get('/incidents', incidentsController.index);
  routes.delete('/incidents/:id', incidentsController.delete);
} catch (e) {
  console.log(e);
}

module.exports = routes;
