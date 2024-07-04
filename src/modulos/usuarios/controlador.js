const TABLA = 'usuarios'

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
    function eliminarUsuario(id){
        return db.eliminarUsuario(TABLA, id);
    }
    return { listaDeUsuarios, leerUsuario, eliminarUsuario };

}