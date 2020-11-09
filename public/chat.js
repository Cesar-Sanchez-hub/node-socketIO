
const socket = io();

// DOM elements
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

// cliente emite datos 
btn.addEventListener('click', function () {
    // socket.emit(  ,  dato);
    // emit(); metodo con el que cliente emite datos 
    socket.emit('Nchat:message', {
        message: message.value,
        username: username.value
    });
});

message.addEventListener('keypress', function(){
    console.log(username.value);
    socket.emit('navChat:typing', username.value );
});


socket.on('Schat:message', function (data) {
    actions.innerHTML = '';
    output.innerHTML += `<p>
        <strong> ${data.username} </strong>: ${data.message}
    </p>`
});

socket.on('servChat:typing', function (data){
   actions.innerHTML = `<p><em>${data}: is t message</em></p>`
});
