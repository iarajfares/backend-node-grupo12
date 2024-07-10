// 1 - Carga las variables de entorno (de '.env')
require('dotenv').config();

// 2 - Se importa objeto con varias propiedades pera el uso de la API
module.exports = {
    
    // Define la variable 'port', la cual es tomada de '.env'; en su defecto usará el 3000
    app: {
        port: process.env.PORT || 3000,
    },

    // Establece la propiedad secret para JWT (si no se definió en '.env', se define)
    jwt: {
        secret: process.env.JET_SECRET || 'notaSecreta'
    },

    // Se configuran las credenciales para conectarse a la base de datos
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || 'root',
        database: process.env.MYSQL_DB || 'gamestation',
    }
}