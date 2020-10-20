const express = require('express')
const http = require('http')
const path = require('path')  //Habilita el uso de direcciones entre carpetas
const socketio = require('socket.io')

/*A continuacion se sirven los archivos para crear un servidor en express
utilizando el protocolo http*/
const app = express()
const server = http.createServer(app)
//Se requiere de un servidor http para instanciar el elemento de socket.io
const io = socketio(server)

//una vez iniciado el servidor, este redirige la pagina a index.html
//se encuentra en la carpeta public
const publicDirectoryPath = path.join(__dirname, './public')
app.use(express.static(publicDirectoryPath))

//Se utiliza el evento CONNECTION para activar la funcion SOCKET
//cuando hay una nueva conexion se muestra en el server el mensaje de nueva conexion
io.on('connection', socket => {
  console.log("Nueva conexión establecida")
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log('El servidor está en ejecución'))
io.on('connection', socket => {
    //Cuando se abre una nueva instancia de la app se notifica a todos los clientes activos
    socket.broadcast.emit("showMessage", { name: 'Sistema', message: 'Se ha unido un nuevo usuario' })
    socket.on('sendMessage', message => io.emit('showMessage', message))
  })