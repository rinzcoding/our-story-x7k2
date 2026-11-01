const canvas = document.getElementById("hearts-bg");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const COLORS = ["#b388ff", "#9c6bff", "#7c4dff", "#d1b3ff", "#e1bee7"];
const MAX_FLOATING = 35;
let hearts = [];
const mouse = { x: -1000, y: -1000 };

function makeHeart(x, y, burst = false) {
  const angle = Math.random() * Math.PI * 2;
  const speed = burst ? 2 + Math.random() * 4 : 0;
  return {
    x: x ?? Math.random() * canvas.width,
    y: y ?? canvas.height + 20,
    size: 8 + Math.random() * 18,
    speedY: 0.4 + Math.random() * 0.9,
    drift: Math.random() * Math.PI * 2,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    opacity: burst ? 0.9 : 0.3 + Math.random() * 0.5,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    burst
  };
}

function drawHeart(h) {
  ctx.save();
  ctx.translate(h.x, h.y);
  const s = h.size / 12;
  ctx.scale(s, s);
  ctx.globalAlpha = Math.max(h.opacity, 0);
  ctx.fillStyle = h.color;
  ctx.beginPath();
  ctx.moveTo(0, -6);
  ctx.bezierCurveTo(0, -12, -10, -12, -10, -4);
  ctx.bezierCurveTo(-10, 2, -4, 6, 0, 12);
  ctx.bezierCurveTo(4, 6, 10, 2, 10, -4);
  ctx.bezierCurveTo(10, -12, 0, -12, 0, -6);
  ctx.fill();
  ctx.restore();
}

function updateHeart(h) {
  if (h.burst) {
    h.x += h.vx;
    h.y += h.vy;
    h.vx *= 0.96;
    h.vy = h.vy * 0.96 - 0.03; // slowly drift upward
    h.opacity -= 0.01;
  } else {
    h.y -= h.speedY;
    h.drift += 0.02;
    h.x += Math.sin(h.drift) * 0.5;

    // hearts gently move away from the mouse or finger
    const dx = h.x - mouse.x;
    const dy = h.y - mouse.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 100 && dist > 0) {
      h.x += (dx / dist) * 2;
      h.y += (dy / dist) * 2;
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const floating = hearts.filter(h => !h.burst).length;
  if (floating < MAX_FLOATING && Math.random() < 0.08) {
    hearts.push(makeHeart());
  }

  hearts.forEach(h => {
    updateHeart(h);
    drawHeart(h);
  });

  hearts = hearts.filter(h => h.y > -30 && h.opacity > 0);
  requestAnimationFrame(animate);
}

// Start with some hearts already on screen
for (let i = 0; i < 25; i++) {
  hearts.push(makeHeart(undefined, Math.random() * canvas.height));
}

// Mouse / finger tracking
window.addEventListener("pointermove", e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

// Click or tap = burst of hearts
window.addEventListener("pointerdown", e => {
  for (let i = 0; i < 14; i++) {
    hearts.push(makeHeart(e.clientX, e.clientY, true));
  }
});

animate();