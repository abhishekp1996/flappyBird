let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let score = 0;
let scoreEl = document.getElementById('score');
scoreEl.innerText = score;

let w = cvs.width;

// load images
let bg = new Image();
let fg = new Image();
let bird = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();

let scor = new Audio();
scor.src = "sounds/score.mp3";

bg.src = "images/bg.png";
fg.src = "images/fg.png";
bird.src = "images/bird.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

//Variables
let speed = 2;
let separation = 120;
let bX = 20, bY = 150;

//Key events
document.addEventListener("keydown", moveUp);
document.addEventListener("click", moveUp);
function moveUp() { 
  let bYcopy = bY;
  let move = setInterval(function() {
    if(bYcopy - bY > 50) {
      clearInterval(move);      
    } else {
      bY-=3 ;
    }
  }, 0);
}

let pipe = [];
pipe[0] = {
  x: w,
  y: 0
}

function draw() {
  ctx.drawImage(bg, 0, 0);
  
  for(let i=0; i<pipe.length; i++) {
    ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+pipeNorth.height + 105);
    
    pipe[i].x-=speed; 
    
    if(pipe[i].x == 80) {
      pipe.push({
        x: w,
        y: -Math.ceil((Math.random() * (pipeNorth.height - 10)))
      }); 
    }
    
    if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + pipeNorth.height + 105)) {
      return location.reload();
    }
    
    if(pipe[i].x == 10) {
      scoreEl.innerText++;
      scor.play();
    }
  }
  
  ctx.drawImage(fg, 0, cvs.height - fg.height);
  
  ctx.drawImage(bird, bX, bY);
  bY+= 3; 
  
  if((bY + bird.height) > (cvs.height - fg.height)) {
    return location.reload()  ;
  }

   requestAnimationFrame(draw);
  
}
draw();
//setInterval(draw, 10)