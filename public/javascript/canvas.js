document.addEventListener('DOMContentLoaded', function(event){
    var socket = io.connect();
    socket.on('draw',function(data){
       outDraw(data);
    });

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    w = window.innerWidth;
    h = window.innerHeight;
    var drawing = false;
    canvas.addEventListener('mousemove', function(e){
        var mouseX = e.clientX - ctx.canvas.offsetLeft;
        var mouseY = e.clientY - ctx.canvas.offsetTop;
        var status = document.getElementById('status');
        status.innerHTML = mouseX+" | "+mouseY;
        if(drawing) draw(e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {drawing = true;}, false);
    canvas.addEventListener("mouseup", function (e) {drawing = false;}, false);
    canvas.addEventListener("mouseout", function (e) {drawing = false;}, false);

    function draw(e) {
        cX = e.clientX - canvas.offsetLeft;
        cY = e.clientY - canvas.offsetTop;
        ctx.strokeStyle = '#333333';
        ctx.lineTo(cX, cY);
        ctx.stroke();

        socket.emit('draw',{x:cX,y:cY});
    }
    function outDraw(e) {
        ctx.strokeStyle = '#333333';
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
    }
});
