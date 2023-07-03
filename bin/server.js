const http = require('http');
const app = require('../app');
const mongoose = require("mongoose");
const port = 3000;
const server = http.createServer(app);

server.listen(port);

mongoose.connect('mongodb://mongo:27017/wazeline')
    .then(() => {
        console.log("La conexion a la base de datos se realizo correctamente");
    })
    .catch(err => console.log(err));


server.on('listening', () => {
    console.log(`El server esta en el puerto ${port}`)
});