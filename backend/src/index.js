const routes = require('./routes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(
  cors({
    origin: 'http://127.0.0.1:3333/',
  })
);
app.use(express.json()); // use querys in json format
app.use(routes);

app.listen(3333); // listen port 3333
