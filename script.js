// -----------------------------
// script.js
// All-in-one portfolio interactions
// -----------------------------

// --- CONFIG ---
const DISABLE_ANIM_WIDTH = 900; // disable heavy effects under this width
const PARTICLE_MAX = 120;       // cap particles

// -----------------------------
// Particle background (bgCanvas)
// lightweight, auto-resizes, disabled on small screens
// -----------------------------
(function initParticles() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;

  function shouldDisable() {
    return window.innerWidth < 520; // very small screens: hide entirely
  }

  const ctx = canvas.getContext('2d');
  let particles = [];
  let rafId = null;

  function resize() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  }
  resize();
  window.addEventListener('resize', () => {
    resize();
    // rebuild particle array proportionally on resize
    buildParticles();
  });

  function rand(min, max) { return Math.random() * (max - min) + min; }

  function buildParticles() {
    particles = [];
    if (shouldDisable()) return;
    const area = canvas.width * canvas.height;
    const count = Math.min(PARTICLE_MAX, Math.max(40, Math.floor(area / 15000)));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: rand(0, canvas.width),
        y: rand(0, canvas.height),
        r: rand(0.6, 2.2),
        vx: rand(-0.2, 0.2),
        vy: rand(-0.2, 0.2),
        alpha: rand(0.06, 0.25),
        alphaDir: Math.random() > 0.5 ? 1 : -1
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!shouldDisable()) {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // wrap-around
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // gentle breathing for alpha
        p.alpha += (Math.random() * 0.006 - 0.003) * p.alphaDir;
        if (p.alpha < 0.04) { p.alpha = 0.04; p.alphaDir = 1; }
        if (p.alpha > 0.3) { p.alpha = 0.3; p.alphaDir = -1; }

        ctx.beginPath();
        ctx.fillStyle = `rgba(79,195,247,${p.alpha})`; // soft electric blue
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    rafId = requestAnimationFrame(draw);
  }

  function start() {
    cancelAnimationFrame(rafId);
    if (!shouldDisable()) buildParticles();
    draw();
  }

  start();
})();

// -----------------------------
// Magnetic hover effect (disabled on small screens)
// - applies to primary interactive controls only
// -----------------------------
(function magnetic() {
  function applyMagnetic() {
    if (window.innerWidth < DISABLE_ANIM_WIDTH) return;
    const magnets = document.querySelectorAll('a.btn, a.link-primary, .navbar-brand, .magnetic');

    magnets.forEach(el => {
      // avoid stacking transforms: store original transform
      el.dataset._origTransform = el.style.transform || '';

      function onMove(e) {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.06}px, ${y * 0.04}px)`;
      }

      function onLeave() {
        el.style.transform = el.dataset._origTransform;
      }

      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);

      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  applyMagnetic();
  window.addEventListener('resize', () => {
    // re-apply on resize (so effect toggles on/off)
    applyMagnetic();
  });
})();


// -----------------------------
// Fallback JS fade-in (works alongside AOS)
// Adds .show to .fade-in when element is near viewport
// -----------------------------
(function fadeInOnScroll() {
  const faders = Array.from(document.querySelectorAll('.fade-in'));
  if (!faders.length) return;

  function check() {
    const offset = window.innerHeight - 80;
    faders.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= offset) el.classList.add('show');
    });
  }

  window.addEventListener('scroll', check, { passive: true });
  window.addEventListener('resize', check);
  // run once
  check();
})();


// -----------------------------
// Typing animation for hero name
// usage: <span id="typed-name" data-text="Noorunnisa Khan"></span>
// -----------------------------
(function typingEffect() {
  const el = document.getElementById('typed-name');
  if (!el) return;
  const text = el.dataset.text || el.textContent.trim();
  el.textContent = ''; // clear
  let i = 0;

  function tick() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, 70 + (Math.random() * 40));
    } else {
      // small caret blink
      el.classList.add('typed-done');
    }
  }
  // only run if not mobile (keeps simple on small)
  if (window.innerWidth >= 420) tick();
  else el.textContent = text;
})();


// -----------------------------
// Navbar shadow / compact on scroll
// -----------------------------
(function navbarOnScroll() {
  const nav = document.querySelector('.nav-glass') || document.querySelector('nav');
  if (!nav) return;
  function setShadow() {
    if (window.scrollY > 40) {
      nav.classList.add('nav-scrolled');
    } else {
      nav.classList.remove('nav-scrolled');
    }
  }
  window.addEventListener('scroll', setShadow, { passive: true });
  setShadow();
})();


// -----------------------------
// Dark / Light mode toggle
// HTML: add a button with id="theme-toggle" (see snippet in instructions)
// Stores preference in localStorage
// -----------------------------
(function themeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;
  const root = document.documentElement;
  const stored = localStorage.getItem('site-theme');

  if (stored) root.setAttribute('data-theme', stored);

  toggle.addEventListener('click', () => {
    const cur = root.getAttribute('data-theme') || 'dark';
    const next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('site-theme', next);
    // small click visual
    toggle.classList.add('pulse');
    setTimeout(() => toggle.classList.remove('pulse'), 350);
  });
})();
/* -----------------------------
   Typing Effect for About Me
------------------------------*/

const aboutText = 
"I write technical academic content for IT and computer science subjects and build small but practical projects in Python, SQL, Tableau, Django and Android. I enjoy breaking complex topics into clear explanations and creating clean, reproducible code for data analysis. I'm currently developing my skills in data analytics, EDA, dashboard building and machine learning while continuing my work as an IT academic writer.";

let index = 0;

function typeAbout() {
  const el = document.getElementById("aboutTyping");
  if (!el) return;

  if (index < aboutText.length) {
    el.textContent += aboutText.charAt(index);
    index++;
    setTimeout(typeAbout, 22); // typing speed
  }
}

document.addEventListener("DOMContentLoaded", typeAbout);
