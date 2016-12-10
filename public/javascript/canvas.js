var ctx = document.getElementById("myCanvas").getContext("2d");
ctx.canvas.addEventListener('mousemove', function(event){
    var mouseX = event.clientX - ctx.canvas.offsetLeft;
    var mouseY = event.clientY - ctx.canvas.offsetTop;
    var status = document.getElementById('status');
    status.innerHTML = mouseX+" | "+mouseY;
});
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;
