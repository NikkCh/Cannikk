document.addEventListener('DOMContentLoaded', function(event){
    var startMoveX = new Array();
    var startMoveY = new Array();
    var socket = io.connect();
    socket.on('draw',function(drawData){
       outDraw(drawData);
    });

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext("2d");
    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    var drawing = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        canvas.addEventListener('touchmove', function(e){
            var mouseX = Math.round(e.targetTouches[0].clientX);
            var mouseY = Math.round(e.targetTouches[0].clientY);
            var status = document.getElementById('status');
            status.innerHTML = mouseX+" | "+mouseY;
            if(drawing) draw(e);
        }, false);
        canvas.addEventListener("touchstart", function (e) {
            moveBol = true;
            drawing = true;
            startMoveX.pop();
            startMoveY.pop();
            startMoveX.push(Math.round(e.targetTouches[0].clientX));
            startMoveY.push(Math.round(e.targetTouches[0].clientY));
            ctx.moveTo(startMoveX[0], startMoveY[0]);
        }, false);
        canvas.addEventListener("touchend", function (e) {drawing = false;}, false);
        canvas.addEventListener("mousecancel", function (e) {drawing = false;}, false);
    } else {
    canvas.addEventListener('mousemove', function(e){
        var mouseX = e.clientX - ctx.canvas.offsetLeft;
        var mouseY = e.clientY - ctx.canvas.offsetTop;
        var status = document.getElementById('status');
        status.innerHTML = mouseX+" | "+mouseY;
        if(drawing) draw(e);
    }, false);
        canvas.addEventListener("mousedown", function (e) {
            drawing = true;
            moveBol = true;
            startMoveX.pop();
            startMoveY.pop();
            startMoveX.push(e.clientX - ctx.canvas.offsetLeft);
            startMoveY.push(e.clientY - ctx.canvas.offsetTop);
            ctx.moveTo(startMoveX[0], startMoveY[0]);

        }, false);
    canvas.addEventListener("mouseup", function (e) {drawing = false;}, false);
    canvas.addEventListener("mouseout", function (e) {drawing = false;}, false);
    }
    function draw(e) {
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
            cX = Math.round(e.targetTouches[0].clientX);
            cY = Math.round(e.targetTouches[0].clientY);
        } else {
            cX = e.clientX - canvas.offsetLeft;
            cY = e.clientY - canvas.offsetTop;
        }
        ctx.strokeStyle = '#333333';
        ctx.lineTo(cX, cY);
        ctx.stroke();
        if (moveBol){
            socket.emit('draw',{x:cX,y:cY, preX: startMoveX[0], preY: startMoveY[0]});
            //console.log(moveBol);
            moveBol = false;
        } else {
            socket.emit('draw',{x:cX,y:cY});
            //console.log(moveBol);
        }
    }
    function outDraw(e) {

        ctx.strokeStyle = '#333333';
        ctx.moveTo(e.preX, e.preY);
        ctx.lineTo(e.x, e.y);
        ctx.stroke();
    }
});
