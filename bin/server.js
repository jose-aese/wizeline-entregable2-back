const http = require('http');
const app = require('../app');
const mongoose = require("mongoose");
const {Server} = require("socket.io");
const port = 3000;
const portIo = 3001;
let server = http.Server(app);
server.listen(port);


mongoose.connect('mongodb://localhost:27017/wazeline')
    .then(() => {
        console.log("La conexion a la base de datos se realizo correctamente");
    })
    .catch(err => console.log(err));

const io = new Server(portIo);

io.on("connection", (socket) => {
    socket.on("howdy", (arg) => {
        console.log(arg)
        socket.emit('new message', `Bienvenido ${arg.name}`);
    })

})

server.on('listening', () => {
    console.log(`El server esta en el puerto ${port}`)
});
