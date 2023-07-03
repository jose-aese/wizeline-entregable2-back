const fs = require('fs');
const path = require('path');
const User = require("../models/user.model");
const pathImage = './uploads/users/';
const uploadImage = async (req, res) => {
    const {params: {id: userId = null} = {}, files} = req;
    const filesEntries = Object.entries(files);
    let image = null;
    for (let filesEntrie of filesEntries) {
        if (filesEntrie[0] !== 'image') {
            if (Array.isArray(filesEntrie[1])) {
                for (let fileEntrie of filesEntrie[1]) {
                    removeFiles(null, fileEntrie.path, '');
                }
            } else {
                removeFiles(null, filesEntrie[1].path, '');
            }
        } else {
            image = filesEntrie[1]
        }
    }
    if (!image) {
        return res.status(500).send({message: 'no se subieron imagenes'});
    }
    if (Array.isArray(image)) {
        for (let img of image) {
            removeFiles(null, img.path, '');
        }
        return res.status(500).send({message: 'Se mando 2 archivos con el mismo nombre'});
    }

    const filePath = image.path;
    const [fileName, fileExt] = filePath.split('\/')[2].split('\.');
    if (userId !== req.user.sub) {
        return removeFiles(res, filePath, 'no tienes permiso para actualizar los datos del usuario');
    }
    if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {
        const {image} = await User.findByIdAndUpdate(userId, {image: `${fileName}.${fileExt}`});
        if (image) {
            removeFiles(null, `${pathImage}${image}`, '');
        }
        res.json({});
    } else {
        return removeFiles(res, filePath, 'extension no valida');
    }
};

const removeFiles = ((res, filePath, message) => {
    fs.unlink(filePath, (err) => {
        if (res) {
            return res.status(500).send({message: message});
        }
    });
});

const getImageFile = ((req, res) => {
    const {params: {imageFile = null} = {}} = req
    fs.exists(`${pathImage}${imageFile}`, (exists) => {
        if (exists) {
            res.sendFile(path.resolve(`${pathImage}${imageFile}`));
        } else {
            res.status(200).send({message: 'no existe la imagen'});
        }
    });
});


module.exports = {
    uploadImage,
    getImageFile
}
