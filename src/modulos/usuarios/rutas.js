const express = require('express');
const seguridad = require('./seguridad');
const respuesta = require('../../red/respuestas');
const controlador = require('./index');
const router = express.Router();

// ruta traer lista de usuarios
router.get('/', async function (req, res) {
    try {
        const listaDeUsuarios = await controlador.listaDeUsuarios();
        respuesta.success(req, res, listaDeUsuarios, 200);
    } catch (error) {
        respuesta.error(req, res, 'Error al obtener la lista de usuarios', 500, error);
    }
});

// ruta traer usuarios por id
router.get('/:id', async function (req, res) {
    try {
        const items = await controlador.leerUsuario(req.params.id);
        respuesta.success(req, res, items, 200);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});

// ruta agregar usuarios nuevos
router.post('/', seguridad(), async function (req, res, next) {
    try {
        const items = await controlador.agregarUsuario(req.body);
        const mensaje = req.body.id ? 'Usuario actualizado correctamente' : 'Usuario agregado correctamente';
        respuesta.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
});

// ruta eliminar usuario
router.put('/:id', seguridad(), async function (req, res) {
    try {
        const items = await controlador.eliminarUsuario(req.params.id);
        respuesta.success(req, res, 'Eliminado correctamente', 200);
    } catch (err) {
        respuesta.error(req, res, err, 500);
    }
});


module.exports = router;