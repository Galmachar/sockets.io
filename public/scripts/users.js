current_users = socket.on('get_users',function(data){
    current_users = data;
});

login.addEventListener('click', function(){ //click na button 
    if(username.value != ""){
       if(current_users.includes(username.value)){
            document.getElementById('zly_login').innerHTML = "Login zajety, sprobuj innego!"
       }else{
        socket.emit('login',username.value);
        document.getElementById('logowanie').style.display = 'none';
        document.getElementById('mario-chat').style.display = 'block';
        document.getElementById('handle').value = username.value;
        document.getElementById('zly_login').innerHTML = ""
        }
}
 });


 socket.on('login',function(data){
    current_users = data;
    console.log(current_users);
    document.getElementById('users_list').innerHTML = "Users:<br/>";
    for(var i = 0; i<data.length; i++){
    document.getElementById('users_list').innerHTML += data[i] + "<br/>";
    }
 });



