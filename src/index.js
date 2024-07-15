// 1 - Importamos app
const app = require('./app');

// 2 - Inicialización del servidor
app.listen(app.get('port'), () => {
    console.log('Escuchando en el puerto', app.get('port'))
})