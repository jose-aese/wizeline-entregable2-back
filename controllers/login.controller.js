const User = require("../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt');

const login = (async (req, res) => {
        try {

            const {_id = null, name = null, surname = null, nick = null, email = null, role = null, password = null,image = null} = await User.findOne({nick: req.body.nick}) || {};

            if (!_id) {
                return res.status(404).send({message: "El usuario no existe!"});
            }
            console.log(2)
            const match = await bcrypt.compare(req.body.password, password);
            if (!match) {
                return res.status(401).json({message: "Credenciales incorrectas!"});
            }
            let user = {_id, name, surname, nick, email, role, image};
            user.token = await jwt.createToken(user);
            return res.json(user);


        } catch
            (e) {
            console.log(e)
            res.status(500).json({error: 'Ha ocurrido un error'});
        }
    })
;

module.exports = {
    login,
}
