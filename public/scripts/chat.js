// Make connection
var socket = io.connect("http://localhost:4000")//lokalna zmienna, inna niz w index.js

//Query
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    username = document.getElementById('username'),
    login = document.getElementById('login');

// Emit events emotacja

btn.addEventListener('click', function(){ //click na button 
    socket.emit('chat',{
        message: message.value,
        handle: handle.value
    });
    message.value='';
});
//enter
window.addEventListener('beforeunload', function () {
    this.console.log("elo");
    socket.emit('remove_user',handle.value);

});

message.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("send").click();
    }
  });

function elo(){
 if(message.value != "" && handle.value != ""){
    socket.emit('typing',handle.value);
 }
}

message.addEventListener('keypress', function(){ 
    socket.emit('typing',{
        message: message.value,
        handle: handle.value,
    });
 });

//Listen for events

socket.on('chat',function(data){
    feedback.innerHTML = "";
    if(data.message != "" && data.handle != ""){
      output.innerHTML += '<p><strong>'+ data.handle + ': </strong>' + data.message + '</p>';
    }
});
var timeout = undefined;
socket.on('typing',function(data){
    //var timeout = undefined;
    if(data.handle!=""){
    feedback.innerHTML = '<p><em>'+ data.handle + ' is typing' + '<em/></p>';
    }
    clearTimeout(timeout);
    timeout = setTimeout(function(){      feedback.innerHTML = ""; }, 5000);    
});

