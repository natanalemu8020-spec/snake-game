//lets go
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const over = document.querySelector(".OVER");
console.log(ctx);

let scale = 20;
let row = canvas.height / scale;
let column = canvas.width / scale;

let snake = [];
let food = [];

 
let d = "right";

document.onkeydown = direction;

function direction(event) {
 let key = event.keyCode;
 if (key == 37 && d != "right") {
    d = "left";
 } else if (key == 38 && d != "down") {
    d = "up";
 } else if (key == 39 && d != "left") {
    d = "right";
 } else if (key == 40 && d != "up") {
    d = "down";
 } 
}
snake[0] = {
  x: (Math.floor(Math.random() * column)) * scale,
  y: (Math.floor(Math.random() * row)) * scale   
};

food[0] = {
  x:(Math.floor(Math.random()*column))*scale,
  y:(Math.floor(Math.random()*row))*scale
}
let playgame = setInterval(draw, 200);

function draw() {


  ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = "green";
        ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
        ctx.strokeRect(snake[i].x, snake[i].y, scale, scale); 
    }  
ctx.fillStyle = "#ff0";
ctx.strokeStyle = "green";
ctx.fillRect(food[0].x,food[0].y,scale,scale);
ctx.strokeRect(food[0].x,food[0].y,scale,scale);
    // Get current head position
    let snakex = snake[0].x;
    let snakey = snake[0].y;

    // Calculate new head position
    if (d === "right") snakex += scale;
    if (d === "left") snakex -= scale;
    if (d === "up") snakey -= scale;
    if (d === "down") snakey += scale;

if (snakex > canvas.width ) {
  snakex = 0;  
}
if (snakey > canvas.height ) {
    snakey = 0;  
}

if (snakex < 0 ) {
    snakex = canvas.width;  
  }

  if (snakey < 0 ) {
      snakey = canvas.height;  
  }
if (snakex == food[0].x && snakey == food[0].y) {

  food[0] = {
    x:(Math.floor(Math.random()*row))*scale,
    y:(Math.floor(Math.random()*column))*scale
  }  
  
  
}else{
  snake.pop();
}



    let newhead = {
        x: snakex,
        y: snakey
    };
  if (eatitself(newhead, snake)) {
    clearInterval(playgame);
  }
    snake.unshift(newhead); // Add new head to front
            // Remove tail to keep same length
}

function eatitself(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true; 
    }
  }  
  return false; 

}

const start = document.querySelector(".start");
const game = document.querySelector(".game-site");
const snakeim = document.querySelector(".snakeim");
start.addEventListener('click', () => {
  game.style.display = 'block';
  snakeim.style.display = 'none';
  start.style.display = 'none';
  initGame();
 });