const router = require('express').Router();
const {getUsers, updateUser,deleteUser,saveUser} = require("../../controllers/user.controller");
const {ensureAuth} = require('../../middlewares/authenticated');
const {admins} = require('../../middlewares/admins');

router.post('/', saveUser);
router.get('/', [ensureAuth, admins], getUsers);
router.put('/:userId', [ensureAuth, admins], updateUser);
router.delete('/:userId', [ensureAuth, admins], deleteUser);

module.exports = router;

