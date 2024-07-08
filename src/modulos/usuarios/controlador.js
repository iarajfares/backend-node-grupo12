const TABLA = 'usuarios'
const autenticacion = require('../autenticacion')
module.exports = function (dbInyectada) { 
    let db = dbInyectada;
    
    if(!db) {
        db = require('../../DB/mysql');
    }
    
    function listaDeUsuarios() {
        return db.listaDeUsuarios(TABLA);
    }

    function leerUsuario(id) {
        return db.leerUsuario(TABLA, id);
    }

    async function agregarUsuario(body){
        const usuario = {
            id: body.id,
            nombre: body.nombre,
            usuario: body.usuario,
            activo: body.activo
        }
        const respuesta = db.guardarUsuario(TABLA, usuario);
        
        var insertId = 0;
        if (body.id === 0){
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }

        var resp2 = '';
        if(body.usuario || body.clave) {
            resp2 = await autenticacion.guardarUsuario({
                id: insertId,
                usuario: body.usuario,
                clave: body.clave
            })
        }
        return resp2;
    }

    function eliminarUsuario(id){
        return db.eliminarUsuario(TABLA, id);
    }
    return { listaDeUsuarios, leerUsuario, agregarUsuario , eliminarUsuario };

}