const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");

const MARGINTOP = window.innerHeight/10;
const MARGINRIGHT = window.innerWidth/8;
const MARGINBOTTOM = window.innerHeight/8;
const MARGINLEFT = window.innerWidth/10;

const WIDTH = window.innerWidth-((MARGINRIGHT+MARGINLEFT)+(2));
const HEIGHT = window.innerHeight-((MARGINTOP+MARGINBOTTOM)+(2));
canvas.width = WIDTH;
canvas.height = HEIGHT;

document.body.style.margin = MARGINTOP.toString() + "px " + MARGINRIGHT.toString() + "px " + MARGINBOTTOM.toString() + "px " + MARGINLEFT.toString() + "px";

class Player {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    Draw() {
        ctx.fillStyle = this.c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Food {
    constructor(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = c;
    }

    Draw() {
        ctx.fillStyle = c;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }
}

var player = new Player(0, 0, 10, 10, "Red");

function Update() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    player.Draw();
}
