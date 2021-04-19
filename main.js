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

document.body.style.margin = MARGINTOP.toString() + "px " + MARGINRIGHT.toString() + "px " + MARGINBOTTOM.toString() + "px " + MARGINLEFT.toString() + "px";

window.addEventListener("resize", function() {
    window.location.reload();
})

var mouse = {
    x: 0,
    y: 0,
    click: false
}
var canvasPos = canvas.getBoundingClientRect();
canvas.addEventListener("mousedown", function(e){
    mouse.x = e.x - canvasPos.left;
    mouse.y = e.y - canvasPos.top;
    console.log(mouse.x, mouse.y);
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
        }
        if (mouse.y != this.y) {
            this.y -= dy/20;
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
        this.x = Math.random() * WIDTH;
        this.y = y;
        this.r = r;
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
            return true;
        }
    }
    
}

var player = new Player(0, 0, 10, "#93C4F6");
var Foods = [];

for (i = 0; i < 10; i++) {
    Foods[i] = new Food(0, 10, 10, "red");
}
function Update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    player.Draw();
    player.Update();
    for (i = 0; i < 10; i++) {
        Foods[i].Draw();
        if (Foods[i].Check()) {
            console.log("Collision with " + i);
            Foods.splice(i, 1);
        }
    }
    requestAnimationFrame(Update);
}

Update();
