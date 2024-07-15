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
    async function agregarJuego(body) {
        const juego = {
            id: body.id,
            nombre: body.nombre,
            descripcion: body.descripcion,
            precio: body.precio,
            fecha_lanzamiento: body.fecha_lanzamiento
        };
        const respuesta = await db.agregarJuego(TABLA, juego);
        let insertId = 0;
        if (body.id === 0) {
            insertId = respuesta.insertId;
        } else {
            insertId = body.id;
        }
        let resp2 = '';
        return resp2;
    }
    function eliminarJuego(id) {
        return db.eliminarJuego(TABLA, id);
    }
    return { listaDeJuegos, leerJuego, agregarJuego, eliminarJuego };

}