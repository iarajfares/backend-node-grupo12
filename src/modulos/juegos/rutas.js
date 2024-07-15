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
router.post('/', async function (req, res) {
    try {
        const juego = req.body;
        await controlador.agregarJuego(juego);
        respuesta.success(req, res, 'Juego agregado correctamente', 201);
    } catch (err) {
        respuesta.error(req, res, 'Error al agregar el juego', 500, err);
    }
});
router.put('/:id', async function (req, res) {
    try {
        const juego = req.body;
        await controlador.editarJuego(req.params.id, juego);
        respuesta.success(req, res, 'Juego editado correctamente', 200);
    } catch (err) {
        respuesta.error(req, res, 'Error al editar el juego', 500, err);
    }
});
router.delete('/:id', async function (req, res) {
    try {
        await controlador.eliminarJuego(req.params.id);
        respuesta.success(req, res, 'Juego eliminado correctamente', 200);
    } catch (err) {
        respuesta.error(req, res, 'Error al eliminar el juego', 500, err);
    }
});
module.exports = router;