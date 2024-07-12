const TABLA = 'juego'

module.exports = function (dbInyectada) { 
    let db = dbInyectada;
    
    if(!db) {
        db = require('../../DB/mysql');
    }

    function listaDeJuegos() {
        return db.listaDeJuegos(TABLA);
    }
    function leerJuego(id) {
        return db.leerJuego(TABLA, id);
    }
    function agregarJuego(data) {
        return db.agregarJuego(TABLA, data);
    }
    function eliminarJuego(id) {
        return db.eliminarJuego(TABLA, id);
    }
    return { listaDeJuegos, leerJuego, agregarJuego, eliminarJuego };

}