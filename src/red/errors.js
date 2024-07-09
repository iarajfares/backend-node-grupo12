const respuesta = require('./respuestas');

function errores(err, req, res, next){
    console.error('[error', err);
    const mensaje = err.mensaje || 'Error Interno';
    const status = err.statusCode || 500;

    respuesta.error(req, res, mensaje, status);
}
module.exports = errores;