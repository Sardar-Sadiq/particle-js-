const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = []; // ---> this empty will use in init function to print the infinite circles in a loop
let hue = 0;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// ctx.fillStyle = 'red';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 5;
// ctx.beginPath();
// ctx.arc(100, 100, 50, 0, Math.PI *2);
// ctx.stroke();
// console.log(ctx);

//custom mouse varialbes
const mouse = {
  x: undefined,
  y: undefined,
};

//in this u added the event listner for click
canvas.addEventListener("click", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // drawCircle();
  for (let i = 0; i < 10; i++) {
    //---> this loop is used for adding 10 particles when we click
    particlesArray.push(new Particle());
  }
});

// in this u added event listner for mouse movement
canvas.addEventListener("mousemove", function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
  // drawCircle();
  for (let i = 0; i < 5; i++) {
    //---> this loop is used for adding 10 particles when we click
    particlesArray.push(new Particle());
  }
});

// function drawCircle() {
//   ctx.fillStyle = "blue";
//   ctx.beginPath();
//   ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//   ctx.fill();
// }

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    // this.x = Math.random() * canvas.width;
    // this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 1; //here we assigned 1 To 6 random size
    //here we assigned for to move the particle all directions
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.color = "hsl(" + hue + " , 100%, 50%)";
  }
  //here we add the method for update the particles & its movements
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.size > 0.1) {
      this.size -= 0.05; // Decrease the size only if it's greater than 0.2
    } else {
      this.size = 0; // Set the size to 0 if it's not greater than 0.2 to ensure it disappears
    } // --> this line is for disappering after loading the particles
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

//we create this function for call the above particle function as infinite times

// this init function is used for background particles

// function init() {
//   for (let i = 0; i < 100; i++) {
//     particlesArray.push(new Particle());
//   }
// }
// init();
// to handle the particle

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
    // if (particlesArray[i].size <= 0.3) {
    //   particlesArray.splice(i, 1);
    //   i--;
    // }
    for (let j = i; j < particlesArray.length; j++) {
      //----> this for loop is writen for the creating lines in btw 2 circles for this we used the pythagorean theorem we have dx as x-axis & dy as y-axis value and we need to find hypotenuse

      const dx = particlesArray[i].x - particlesArray[j].x;
      const dy = particlesArray[i].y - particlesArray[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 100) {
        ctx.beginPath();
        ctx.strokeStyle = particlesArray[i].color;
        ctx.lineWidth = 0.5; // particlesArray[i].size / 10;
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
        ctx.stroke();
      }
    }
    if (particlesArray[i].size <= 0.5) {
      // this if condition helps to reduce time of apperaing the particles with line
      particlesArray.splice(i, 1);
      console.log(particlesArray.length);
      i--;
    }
  }
}

//this is the loop of animation
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // drawCircle();
  // ctx.fillStyle = "rgba(0,0,0,0.5)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += 2; //--> here u can control the speed of color changing by writing hue+=0.5 or hue+=5
  requestAnimationFrame(animate);
}
animate();
