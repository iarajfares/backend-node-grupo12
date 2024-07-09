const token = require('../../token');

module.exports = function checkAutenticacion() {
    // seguridad para que un usuario pueda modificar unicamente su perfil o para crear un usuario admin
    function middleware(req, res, next) {
        const id = req.body.id;
        try{
            token.checkToken.confirmarToken(req, id)
            next();
        } catch (error) {
            res.status(403).json({ error: 'No tienes los permisos suficientes para realizar esta acción.' })
        }
    }
    return middleware
}
