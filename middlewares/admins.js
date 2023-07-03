exports.admins = ((req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(401).send({message: "No tienes permisos para ejecutar esta operacion"})
    }
    next();
});
