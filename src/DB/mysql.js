const mysql = require('mysql');
const config = require('../config');

const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let conexion;

function conexionmysql() {
    conexion = mysql.createConnection(dbConfig);

    // En caso de error al conectar
    conexion.connect((err) => {
        if(err){
            console.log('[Error al conectarse a la base de datos]', err);
            setTimeout(conexionmysql, 200);
        } else {
            console.log('Base de datos conectada correctamente')
        }
    });
    conexion.on('error', err => {
        console.log('[Error al conectarse a la base de datos]', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            conexionmysql();
        } else {
            throw err;
        }
    })
}

conexionmysql();

function listaDeJuegos(tabla){
    return prueba
}

function leerJuego(tabla, id){}

function agregarJuego(tabla, data){}

function eliminarJuego(tabla, id){}

module.exports = {
    listaDeJuegos,
    leerJuego,
    agregarJuego,
    eliminarJuego
}