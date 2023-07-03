const router = require('express').Router();
const {ensureAuth} = require('../../middlewares/authenticated');
const {uploadImage, getImageFile} = require("../../controllers/images.controller");
const multipart = require('connect-multiparty');
const mdUpload = multipart({uploadDir: './uploads/users'})

router.post('/:id', [ ensureAuth, mdUpload], uploadImage);
router.get('/:imageFile', getImageFile);

module.exports = router;
