const TABLA = 'autenticacion';
const bcrypt = require('bcrypt');
const token = require('../../token')
module.exports = function (dbInyectada) { 
    let db = dbInyectada;
    
    if(!db) {
        db = require('../../DB/mysql');
    }
    async function login(usuario, clave){
        const data = await db.query(TABLA, {usuario: usuario});
        return bcrypt.compare(clave, data.clave)
        .then(resultado => {
            if (resultado === true) {
                // generacion de token
                return token.asigToken({...data});
            } else {
                // error
                throw new Error('Informacion invalida.')
            }
        })
    }

    async function guardarUsuario(data){
        const authData = {
            id: data.id,
        } 
        if(data.usuario){
            authData.usuario = data.usuario;
        }
        if(data.clave){
            authData.clave = await bcrypt.hash(data.clave.toString(), 5);
        }
        return db.guardarUsuario(TABLA, authData);
    }

    return { guardarUsuario, login };

}