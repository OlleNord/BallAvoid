const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const MARGINTOP = window.innerHeight/10;
const MARGINRIGHT = window.innerWidth/8;
const MARGINBOTTOM = window.innerHeight/10;
const MARGINLEFT = window.innerWidth/8;

const WIDTH = window.innerWidth-((MARGINRIGHT+MARGINLEFT)+(2));
const HEIGHT = window.innerHeight-((MARGINTOP+MARGINBOTTOM)+(2));
canvas.width = WIDTH;
canvas.height = HEIGHT;

console.log(WIDTH);
console.log(canvas.width);

document.getElementById("c").style.margin = MARGINTOP.toString() + "px " + MARGINRIGHT.toString() + "px " + MARGINBOTTOM.toString() + "px " + MARGINLEFT.toString() + "px";

window.addEventListener("resize", function() {
    window.location.reload();
})

var mouse = {
    x: WIDTH/2,
    y: HEIGHT/2,
    click: false
}

var colors = ["#FF0000", "#e50000", "#51C651", "#007300", "#0000FF", "#0000E5", "#FFE62F"];

var canvasPos = canvas.getBoundingClientRect();
canvas.addEventListener("mousedown", function(e){
    mouse.x = e.x - canvasPos.left;
    mouse.y = e.y - canvasPos.top;
});
canvas.addEventListener("mousedown", function(e){
    console.log("Mouse x: " + mouse.x, "Mouse y: " + mouse.y);
    console.log("Event x: " + e.x, "Event y: " + e.y);
    console.log("Player x: " + Math.round(player.x), "Player y: " + Math.round(player.y));
});

class Player {
    constructor(x, y, r, c) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.c = c;
    }

    Update() {
        
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;

        if (mouse.x != this.x) {
            this.x -= dx/20;
            if (this.x > WIDTH-this.r) {
                this.x = WIDTH-this.r+0.001;
            }
            if (this.x < 0+this.r) {
                this.x = 0+this.r+0.001;
            }
        }
        if (mouse.y != this.y) {
            this.y -= dy/20;
            if (this.y > HEIGHT-this.r) {
                this.y = HEIGHT-this.r+0.001;
            }
            if (this.y < 0+this.r) {
                this.y = 0+this.r-0.001;
            }
        }
        
    }

    Draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
    
}

class Food {
    constructor(x, y, r, c) {
        this.r = r;
        this.x = (Math.random() * (WIDTH-this.r*2)) + this.r*1;
        this.y = (Math.random() * (HEIGHT-this.r*2)) + this.r*1;;
        this.c = c;
    }

    Draw() {
        ctx.fillStyle = this.c;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }

    Check() {
        if (Math.abs(player.x - this.x) < this.r*2 && Math.abs(player.y - this.y) < this.r*2) {
            collected++;
            return true;
        }
    }
    
}

var time = 3;
var collected = 0;
var player = new Player(WIDTH/2, HEIGHT/2, 10, colors[5]);
var Foods = [];

for (i = 0; i < 25; i++) {
    Foods.push(new Food(0, 10, 10, colors[2]));
}
console.log(WIDTH);
function Update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.font = WIDTH/20 + "px Verdana";
    ctx.fillStyle = colors[6];
    ctx.fillText(time, WIDTH/2-(WIDTH/20)/2, HEIGHT/2+(HEIGHT/20)/2);
    player.Draw();
    player.Update();
    for (i = 0; i < Foods.length; i++) {
        Foods[i].Draw();
        if (Foods[i].Check()) {
            console.log("Collision with " + i);
            Foods.splice(i, 1);
        }
    }
    if (!time == 0) {
        requestAnimationFrame(Update);
    }
    else {
        GameOver();
    }
}

function Timer() {
    time -= 1;
}

function GameOver() {
    ctx.fillStyle = colors[6];
    ctx.fillText("Game Over", WIDTH/2-(WIDTH/8), HEIGHT/2-(HEIGHT/10)/2);
}

Update();
setInterval(Timer, 1000);
