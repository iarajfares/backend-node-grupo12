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
        conexion.query(`SELECT * FROM ??`,[tabla], (error, result) => {
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

function guardarUsuario(tabla, data) {
    return new Promise((resolve, reject) => {
        if (!tabla || typeof data !== 'object' || !Object.keys(data).length) {
            return reject(new Error('Tabla u objeto invalido'));
        }
        const keys = Object.keys(data);
        const updates = keys.map(key => `${key} = VALUES(${key})`).join(', ');

        let sql;
        let parametros;

        if (data.id === 0 || data.id == null) {
            sql = `INSERT INTO ?? SET ? ON DUPLICATE KEY UPDATE ${updates}`;
            parametros = [tabla, data];
        } else {
            sql = `UPDATE ?? SET ? WHERE id = ?`;
            parametros = [tabla, data, data.id];
        }
        conexion.query(sql, parametros, (error, result) => {
            if (error) {
                const mensajeError = error.message || 'Ocurrio un error';
                return reject(new Error(`Error al guardar usuario: ${mensajeError}`));
            }
            resolve(result);
        })
    })
}

function eliminarUsuario(tabla, id){
    return new Promise ((resolve, reject) => {
        conexion.query(`DELETE FROM ?? WHERE id= ?`, [tabla, id], (error, result) => {
            return error ? reject(error) : resolve(result);
        })
    });
}

function query(tabla, consulta){
    return new Promise((resolve, reject) => {
        conexion.query(`SELECT * FROM ?? WHERE ?`, [tabla, consulta], (error, result) => {
            return error ? reject(error) : resolve(result[0]);
        })
    });
}
module.exports = {
    // modulo juegos
    listaDeJuegos,
    leerJuego,
    agregarJuego,
    eliminarJuego,

    // modulo usuarios
    listaDeUsuarios,
    leerUsuario,
    guardarUsuario,
    eliminarUsuario,
    query
}