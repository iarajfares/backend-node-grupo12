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
    return { listaDeJuegos, leerJuego };

}