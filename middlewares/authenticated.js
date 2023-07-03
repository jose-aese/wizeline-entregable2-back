const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_mean';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({ message: "la peticion no tiene cabecera de authorization"})
    }
    const token = req.headers.authorization.replace(/['"']+/g, '');
    try{
        const payload = jwt.decode(token, secret);
        if(payload.exp <= moment().unix()){
            return res.status(401).send({
                message: 'el token a expirado'
            });
        }
        req.user = payload;
        next();
    }catch(e){
        return res.status(401).send({
            message: 'el token no es valido'
        });
    }
}
