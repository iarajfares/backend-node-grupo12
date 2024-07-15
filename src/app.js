// Importación de modulo express (para enrutamiento, middlewares y manejo de solicitudes/respuestas)
const express = require('express');

// Implementación de CORS (para seguridad)
const cors = require('cors');

// Importación de MORGAN 
const morgan = require('morgan');

// Importación del módulos internos
const config = require('./config');
const juegos = require('./modulos/juegos/rutas')
const usuarios = require('./modulos/usuarios/rutas')
const autenticacion = require('./modulos/autenticacion/rutas')
const error = require('./red/errors');

// Creación la instancia de express
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