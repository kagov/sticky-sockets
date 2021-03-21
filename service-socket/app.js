var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var chat = express.Router();
app.use('/sticky',chat);

chat.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

chat.get('/socket', function(req, res){
  res.sendFile(__dirname + '/socket.io.js');
});

chat.get('/chat', function(req, res){
  res.sendFile(__dirname + '/chat.html');
});

chat.get('/mypage', function(req, res){
  res.sendFile(__dirname + '/mypage.html');
});

chat.get('/main.css', function(req, res){
    res.sendFile(__dirname + '/main.css');
  });

  chat.get('/chat-client.js', function(req, res){
    res.sendFile(__dirname + '/chat-client.js');
  });  
  
  chat.get('/favicon.ico', function(req, res){
    res.sendFile(__dirname + '/favicon.ico');
  });  

  chat.get('/trench.ttf', function(req, res){
    res.sendFile(__dirname + '/trench.ttf');
  });
  
 

io.on('connection', function(socket){

  socket.on('chat_message', function(msg){
    console.log('message: ' + msg);
    io.emit("message_from_kaushik",msg)
  });

  socket.on('chat_user', function(msg){
    console.log('message from user: ' + msg);
    io.emit("message_from_user",msg)
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:',port);
});