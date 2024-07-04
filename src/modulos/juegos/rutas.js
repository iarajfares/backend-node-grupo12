const express = require('express');

const respuesta = require('../../red/respuestas');
const controlador = require('./index');

const router = express.Router();

router.get('/', async function (req, res) {
    try {
        const listaDeJuegos = await controlador.listaDeJuegos();
        respuesta.success(req, res, listaDeJuegos, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener la lista de juegos', 500, error);
    }
});
router.get('/:id', async function (req, res) {
    try {
        const items = await controlador.leerJuego(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err){
        respuesta.error(req, res, err, 500);
    }
});
module.exports = router;