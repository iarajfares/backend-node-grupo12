const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config');

const juegos = require('./modulos/juegos/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const autenticacion = require('./modulos/autenticacion/rutas')
const error = require('./red/errors');

const app = express();

var corsOptions = {
    origin: '*',
    optionSuccessStatus: 200
}

// middleware
app.use(express.static('../front'));
app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// config
app.set('port', config.app.port);

// rutas
app.use('/api/juegos', juegos);
app.use('/api/usuarios', usuarios);
app.use('/api/autenticacion', autenticacion);

app.use(error);

module.exports = app;