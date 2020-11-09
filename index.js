
const path = require('path');
const express = require('express');
const app = express();
const SocketIO = require('socket.io');

//setings
app.set('port', process.env.PORT || 3000 );

// static files
app.use(express.static(path.join(__dirname, 'public')));

// iniciar el servidor 
const server = app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});


// encargado de la conexion
// ↓ es el que recibe la config del chat 
const io = SocketIO(server);
// cuando se inicializa express con listen o sin listen lo guardamos en SocketIO

// websockets 
// ↓ cuando se comunique navegador con servidor se escuchan eventos, el primer evento es cuando se conecta un nuevo cliente 
// nombre del evento connection 
// osea socket io cuando alguien se conecte vamos a empezar hacer la funcion 
// ↓ servidor
// de servidor a cliente 
io.on('connection', (socket) => {
console.log('new connection', socket.id );
  // escuchemos el evento
  // el evento dispara la conexion
  // on(); metodo escuchar 
  // es para el boton enviar
    socket.on('Nchat:message', (data) => {   
        
        socket.emit('Schat:message', data);
    });

    socket.on('navChat:typing', (data) => {
        // quiero emitir a todos excepto yo
        socket.broadcast.emit('servChat:typing', data);
    });
});



