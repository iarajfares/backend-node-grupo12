const express = require('express');
const config = require('./config');

const juegos = require('./modulos/juegos/rutas')

const app = express();

app.set('port', config.app.port);

// rutas
app.use('/api/juegos', juegos)
module.exports = app;