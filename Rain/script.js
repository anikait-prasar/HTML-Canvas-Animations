const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight


//Main Variables
let maxSpeed = 10,
    spacing = 7, //This will act as the space between two raindrops 
    xPosition,
    n;

//This function will create an array, drops which will contain information of every drop
function init() {
  drops = []; //This array will contain the x, y, width and height of all the drops
  xPosition = 0;
  n = canvas.width / spacing;

  for (let i = 0; i < n; i++) {
    xPosition += spacing; 
    drops.push({
      x: xPosition, 
      y: Math.round(Math.random() * canvas.height), //We need to set y to some value so that the drops look like they are moving differently/not together 
      width: 1,  //This will be the width of every rain drop
      height: 50,  //This will be the height of every rain drop
      speed: Math.round(Math.random() * maxSpeed + 10), //Every drop will have different random speed
    });
  }
}

//This function renders animation and makes the drops move downwards
function rain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clearing the screen for new position of all drops
  for (let i = 0; i < n; i++){
    ctx.fillStyle = "white";
    ctx.fillRect(drops[i].x, drops[i].y, drops[i].width, drops[i].height); //creating raindrops from values we stored in the drops array
    drops[i].y += drops[i].speed;

    if (drops[i].y > canvas.height) {  //When drops touch ground, they will start from top again
      drops[i].y = 0 - drops[i].height;
    }
  }
  requestAnimationFrame(rain);  //It makes a loop in rain function
}

function main() {
  init();
  rain();
}

window.addEventListener('load', main, false);
window.addEventListener('resize', init, false);
