const router = require('express').Router();
router.use('/users', require('./users.router'));
router.use('/login', require('./login.router'));
router.use('/images', require('./images.router'));
router.use('/tiendas', require('./tiendas.router'));
module.exports = router;
