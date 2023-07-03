const router = require('express').Router();
const {ensureAuth} = require('../../middlewares/authenticated');
const {getTiendas} = require("../../controllers/tiendas.controller");


router.post('/', getTiendas, );


module.exports = router;

