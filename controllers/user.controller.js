const User = require("../models/user.model");
const bcrypt = require('bcrypt');

const saveUser = (async (req, res) => {
    try {
        const {body} = req;
        body.password = await bcrypt.hash(body.password, 10);
        const newUser = await User.create(body);
        return res.json(newUser);
    } catch (e) {
        const {code, _message = null} = e;
        if (code === 11000) {
            return res.status(400).json({error: 'El usuario ya existe'});
        }
        if (_message) {
            return res.status(400).json({error: 'Error en el formato'});
        }
        return res.status(500).json({error: 'Ha ocurrido un error'});
    }
});


const getUsers = (async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {
        res.status(500).json({error: 'Ha ocurrido un error'});
    }
});


const updateUser = (async (req, res) => {
    try {
        const userEdit = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            {new: true}
        )
        res.json(userEdit)
    } catch (e) {
        res.status(500).json({error: 'Ha ocurrido un error'});
    }
});


const deleteUser = (async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.userId,);
        res.json(user);
    } catch (e) {
        res.status(500).json({error: 'Ha ocurrido un error'});
    }
});

module.exports = {
    saveUser,
    getUsers,
    updateUser,
    deleteUser
}
