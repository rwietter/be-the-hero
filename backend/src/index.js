const routes = require('./routes');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // use querys in json format
app.use(routes);

app.listen(3333); // listen port 3333
