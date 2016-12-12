var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io').listen(http);
var port = 8080;
var usr = 0;

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    usr++;
    console.log('a users connected.',usr,'users connected');
    socket.on('draw',function(data){
        socket.broadcast.emit('draw',data);
    });
    socket.on('disconnect', function(){
        usr--;
        console.log('a user disconnected.',usr,'users connected');
    });
});

http.listen(8080, function(){
    console.log('server running @ port:', port);
});
