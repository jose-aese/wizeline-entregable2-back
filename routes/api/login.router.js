const LoginController = require("../../controllers/login.controller");
const router = require('express').Router();

router.post('/', LoginController.login);



module.exports = router;
