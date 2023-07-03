const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_mean';

exports.createToken = async (user) => {
    const payload = {
        ...user,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    };
    return jwt.encode(payload, secret);
};
