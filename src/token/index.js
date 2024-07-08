// asignacion de token con JSON Web Token
const jwt = require('jsonwebtoken');
config = require('../config');
const error = require('../middleware/errors');
const secret = config.jwt.secret;

function asigToken(data){
    return jwt.sign(data, secret);
}
function verificarToken(token){
    return jwt.verify(token, secret);
}
const checkToken = {
    confirmarToken: function(req, id){
        const decodificado = decodificarHeaders(req);

        if(decodificado.id !== id){
            throw new error ('No tienes los permisos suficientes para realizar esta acción.', 401)
        }
    }
}

function obtenerToken(autorizacion){
    if(!autorizacion){
        throw new error('No hay token', 401);
    }
    if(autorizacion.startsWith('Bearer ')){
        throw new error('Formato inválido', 401)
    }
    let token = autorizacion.slice(7).trim();
    return token;
}

function decodificarHeaders(req){
    const autorizacion = req.headers.authorization || '';
    const token = obtenerToken(autorizacion);
    verificarToken(token);

    req.user = decodificado;

    return decodificado;
}

module.exports = {
    asigToken,
    checkToken
}