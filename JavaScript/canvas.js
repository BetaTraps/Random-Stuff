var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// Line
// lineTo to continue connecting lines
// strokeStyle = "Color" to change the color of a line
// stroke method to draw the lins are arcs 

// Rectangle
// fillStyle = 'Color' to change rect colors
// fillRect to create a Rectangle

// Arc / Circle
// arc(x, y, radius, startAngle, endAngle, drawCounterClockwise)

var mouse = {// this is an object in JavaScript
    x: undefined,
    y: undefined
}

var maxRadius = 50;
//var minRadius = 2;

var colorArray = [
    '#2E112D',
    '#540032',
    '#820333',
    '#C9283E',
    '#F0433A'
];

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

function Circle(x, y, dx, dy, radius){ // this is how u make a object in JavaScript 
    this.x = x;
    this.y = y
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0,Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
        this.dx = -this.dx;
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
        this.dy = -this.dy;

    this.x += this.dx;
    this.y += this.dy;
    
    // Interactions
    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
        mouse.y - this.y < 50 && mouse.y - this.y > -50) {
        if(this.radius < maxRadius)
            this.radius += 1;
    }else if (this.radius > this.minRadius){
        this.radius -= 1;
    }

    this.draw();
    }

}


var cirlcleArray = [];
function init(){
    cirlcleArray = [];
    for(var i = 0; i < 1200; i++){
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight- radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 10; // velocity of x
        var dy = (Math.random() - 0.5) * 10; // velocity of y
        cirlcleArray.push(new Circle(x,y, dx, dy, radius));
    }
    animate();
}

function animate(){
    requestAnimationFrame(animate);
    //clears the the whole screen
    //c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = "#111";
    c.fillRect(0, 0, innerWidth, innerHeight);

    for(var i = 0; i< cirlcleArray.length; i++){
        cirlcleArray[i].update();
    }
}

init();