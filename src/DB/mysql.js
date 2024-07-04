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
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function leerJuego(tabla, id){
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function agregarJuego(tabla, data){}

function eliminarJuego(tabla, id){}


// modulo usuarios
function listaDeUsuarios(tabla){
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}

function leerUsuario(tabla, id){
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id=${id}`, (error, result) => {
            if(error) return reject(error);
            resolve(result);
        })
    })
}
function agregarUsuario(tabla, data){}

function eliminarUsuario(tabla, id){
    return new Promise ((resolve, reject) => {
        conexion.query(`DELETE * FROM ${tabla} WHERE id=${id}`, data.id, (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}
module.exports = {
    listaDeJuegos,
    leerJuego,
    agregarJuego,
    eliminarJuego,
    // modulo usuarios
    listaDeUsuarios,
    leerUsuario,
    agregarUsuario,
    eliminarUsuario
}