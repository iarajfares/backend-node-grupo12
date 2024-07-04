const express = require('express');
const config = require('./config');
const morgan = require('morgan');

const juegos = require('./modulos/juegos/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const app = express();
// middleware
app.use(morgan('dev'));

// config
app.set('port', config.app.port);
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// rutas
app.use('/api/juegos', juegos);
app.use('/api/usuarios', usuarios);
module.exports = app;