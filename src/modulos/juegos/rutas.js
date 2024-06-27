const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./controlador');

const router = express.Router();

router.get('/', function (req, res) {
    const listaDeJuegos = controlador.listaDeJuegos();
    respuesta.success(req, res, listaDeJuegos, 200)
})
module.exports = router;