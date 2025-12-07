/* -------------------------------
   FADE-IN SCROLL ANIMATION
-------------------------------- */
const faders = document.querySelectorAll('.fade-in');

function showOnScroll() {
  faders.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
      el.classList.add('show');
    }
  });
}
window.addEventListener('scroll', showOnScroll);
showOnScroll();


/* -------------------------------
   PARALLAX FLOAT-IN SECTIONS
-------------------------------- */
const floatSections = document.querySelectorAll("section");

function floatScroll() {
  floatSections.forEach(sec => {
    const rect = sec.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) {
      sec.classList.add("visible");
    }
  });
}
window.addEventListener("scroll", floatScroll);
floatScroll();


/* -------------------------------
   MAGNETIC HOVER EFFECT (smooth)
-------------------------------- */
function makeMagnetic() {
  const magnets = document.querySelectorAll(
    ".project a, nav a, button, .magnetic"
  );

  magnets.forEach(magnet => {
    let xForce = 0, yForce = 0;

    magnet.addEventListener("mousemove", function (e) {
      const rect = magnet.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      xForce = x * 0.18;
      yForce = y * 0.18;

      magnet.style.transform = `translate(${xForce}px, ${yForce}px)`;
    });

    magnet.addEventListener("mouseleave", function () {
      magnet.style.transform = "translate(0, 0)";
    });
  });
}
makeMagnetic();


/* -------------------------------
   LAVENDER PARTICLE CLOUD ✨
-------------------------------- */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];

function createParticle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 1.8 + 0.8,
    speedX: (Math.random() - 0.5) * 0.25,
    speedY: (Math.random() - 0.5) * 0.25,
    opacity: Math.random() * 0.5 + 0.2
  };
}

for (let i = 0; i < 70; i++) particles.push(createParticle());

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.speedX;
    p.y += p.speedY;

    if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
    if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

    ctx.fillStyle = `rgba(167, 122, 203, ${p.opacity})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();
