const db = require('../../DB/mysql');
const TABLA = 'Juegos'

function listaDeJuegos() {
    return db.listaDeJuegos(TABLA);
}
module.exports = { listaDeJuegos };