let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let score = 0;
let scoreEl = document.getElementById('score');
scoreEl.innerText = score;

let w = cvs.width;
let h = cvs.height;

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
let constant = pipeNorth.height + separation;
let bX = 20, bY = 150;
let gravity = 3; 
let distance = 100;
let fgHeight = h - fg.height;

//Key events
document.addEventListener("keydown", moveUp);
function moveUp() { 
  let bYcopy = bY;
  let move = setInterval(function() {
    if(bYcopy - bY > 60) {
      clearInterval(move);      
    } else {
      bY-=gravity ;
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
    ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y+constant);
    
    pipe[i].x-=speed; 
    
    if(pipe[i].x == distance) {
      pipe.push({
        x: w,
        y: (Math.random() * pipeNorth.height) - pipeNorth.height 
      }); 
    }
    
    if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY + bird.height >= pipe[i].y + constant)) {
      return location.reload();
    }
    
    if(pipe[i].x == 10) {
      scoreEl.innerText++;
      scor.play();
    }
  }
  
  ctx.drawImage(fg, 0, fgHeight);
  
  ctx.drawImage(bird, bX, bY);
  bY+= gravity; 
  
  if(bY + bird.height > fgHeight) {
    return location.reload()  ;
  }

   requestAnimationFrame(draw);
  
}
draw();
//setInterval(draw, 10)