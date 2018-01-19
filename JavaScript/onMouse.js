var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var earth = [
    'rgba(0, 38, 28, x)', 
    'rgba(4, 76, 41, x)',
    'rgba(22, 127, 57, x)',
    'rgba(69, 191, 85, x)',
    'rgba(150, 237, 137, x)',
];
    
// fire color scheme
var fire = [
    'rgba(242, 193, 102, x)', 
    'rgba(242, 134, 39, x)',
    'rgba(217, 63, 7, x)',
    'rgba(140, 29, 4, x)',
    'rgba(65, 15, 4, x)',
];
    
// water color scheme
var water = [
    'rgba(0, 48, 90, x)', 
    'rgba(0, 75, 141, x)',
    'rgba(0, 116, 217, x)',
    'rgba(65, 147, 217, x)',
    'rgba(122, 186, 242, x)',
];
    
// collection of earth, fire and water
var colorArray = [earth, fire, water];
    
// current color accessor
var colors = colorArray[0];

var mouse = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
}

window.addEventListener('mousemove', 
    function(event){
        mouse.x = event.x;
        mouse.y = event.y;
    });

window.addEventListener('click', 
    function() {
        colorArray.push(colorArray.shift());
        colors = colorArray[0];
        circleArray.push(new circle(mouse.x, mouse.y, 0, 0, 10, 20));
    });

window.addEventListener('resize', 
    function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        animate();
    });

function circle(x, y, dx, dy, r, growth){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.growth = growth;
    this.color = colors[Math.floor(Math.random() * colors.length)];
	this.alpha = 1;

    this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.r, Math.PI * 2, false);
        c.lineWidth = 2;
        c.strokeStyle = this.color.replace('x', + this.alpha);
		c.stroke();
		c.fillStyle = this.color.replace('x', + this.alpha);
		c.fill();
	}

	this.update = function() {
		this.x += this.dx;
        this.y += this.dy;
        this.alpha -= 0.015;
        this.r += this.growth;
		this.draw();
	}
}

var circleArray = [];
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
	var dx = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
	var dy = (Math.random() - 0.5) * 5 + (Math.random() < 0.5 ? -2 : 2);
	var r = Math.random() * 20 + 30;
    circleArray.push(new circle(mouse.x, mouse.y, dx, dy, r, -.5));
    
    for( let i = 0; i < circleArray.length; i++){
        
        circleArray[i].update();
        
        if (circleArray[i].alpha < 0 || circleArray[i].r < 3) {
			circleArray.splice(i, 1);
		}
    }

}

animate();