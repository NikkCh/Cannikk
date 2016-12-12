var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var port = 8080;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('draw',function(data){
        socket.broadcast.emit('draw',data);
    });
    socket.on('disconnect', function(){
        console.log('a user disconnected');
    });
});

http.listen(8080, function(){
    console.log('server running @ port:', port);
});
