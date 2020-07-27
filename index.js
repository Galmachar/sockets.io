var express = require('express');
var socket = require('socket.io');
connections = [];
users = [];
// App setup
var app = express();
var server = app.listen(4000,function(){
    console.log('listening to requests on port 4000');
});

//static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);

function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
 }

io.on('connection', function(socket){
    //dolaczenie
    io.emit('get_users', users)

    connections.push(socket);
    console.log('Podlaczono! Obecnie polaczanych: %s uzytkownikow', connections.length);

    //odlaczenie
    socket.on('disconnect', function(data){
        connections.splice(connections.indexOf(socket), 1);
        console.log('Odlaczono! Obecnie polaczanych: %s uzytkownikow', connections.length);
    });
    socket.on('login', function(data){ 
        if(users.includes(data)){
            io.emit('not_login');
        }else{
            socket.user = data;
            console.log(socket.user);
           // console.log(socket.id);
            users.push(data);
            io.emit('login',users);
        }
    });

    socket.on('remove_user', function(data){ 
          users = arrayRemove(users,data);
          console.log(users);
          io.emit('login',users);
      });

    socket.on('chat', function(data){
        console.log(data);
        io.emit('chat',data);
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
    
});