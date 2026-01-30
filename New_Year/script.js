// Texts you want to show (edit these)
const texts = [
  "Happy New Year Mere dost 😊",
  "Apna bag pack karke rakhna, ✨",
  "Usi raat hume 2026 ke liya niklna h 🚀",
  "To Naye Saal ki hardik Subhkamnayan in Adhvans 😊",
];

const msgEl = document.getElementById("message");
let index = 0;

// Start showing text AFTER rocket finishes (4 seconds)
setTimeout(() => {
  msgEl.style.opacity = 1;
  msgEl.textContent = texts[index];

  setInterval(() => {
    index = (index + 1) % texts.length;
    msgEl.style.opacity = 0;

    setTimeout(() => {
      msgEl.textContent = texts[index];
      msgEl.style.opacity = 1;
    }, 400); // small fade gap
  }, 6000); // 6 seconds per text
}, 4000);

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = color;
    this.velocity = {
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6,
    };
    this.life = 100;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 15;
    ctx.fill();
  }

  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.life--;
  }
}

let particles = [];

function createFirework(x, y) {
  const colors = ["#ff4ecd", "#00f7ff", "#fff700", "#a855f7"];
  for (let i = 0; i < 80; i++) {
    particles.push(
      new Particle(x, y, colors[Math.floor(Math.random() * colors.length)])
    );
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles = particles.filter((p) => p.life > 0);
  particles.forEach((p) => {
    p.update();
    p.draw();
  });
}

setInterval(() => {
  createFirework(
    Math.random() * canvas.width,
    Math.random() * canvas.height * 0.6
  );
}, 800);

window.addEventListener("click", (e) => {
  createFirework(e.clientX, e.clientY);
});

animate();
