const express = require('express');

const ongsController = require('./controllers/OngController');
const incidentController = require('./controllers/IncidentsController');
const profileController = require('./controllers/ProfileController');
const sessionController = require('./controllers/SessionController');
const Validators = require('./middlewares/Validators');

const routes = express.Router(); // express instance

try {
  routes.post('/session', sessionController.create);

  routes.post('/ongs', Validators.createOng, ongsController.create);
  routes.get('/ongs', ongsController.index);

  routes.get('/profile', Validators.ongProfile, profileController.profile);

  routes.post('/incidents', incidentController.create);
  routes.get('/incidents', Validators.getIncidents, incidentController.index);
  routes.delete('/incidents/:id', Validators.delete, incidentController.delete);
} catch (e) {
  throw new Error('Failure in routes');
}

module.exports = routes;
