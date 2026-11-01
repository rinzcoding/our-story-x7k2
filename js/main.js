const MS_DAY = 1000 * 60 * 60 * 24;

// Fill in her nickname everywhere
document.getElementById("nickname").textContent = CONFIG.nickname;

// How many full months since June 8
function monthsTogether(now) {
  const s = CONFIG.startDate;
  let months = (now.getFullYear() - s.getFullYear()) * 12 + (now.getMonth() - s.getMonth());
  if (now.getDate() < s.getDate()) months--;
  return months;
}

// The next date that falls on the 8th
function nextMonthsary(now) {
  const day = CONFIG.startDate.getDate();
  let next = new Date(now.getFullYear(), now.getMonth(), day);
  if (next <= now) next = new Date(now.getFullYear(), now.getMonth() + 1, day);
  return next;
}

function pad(n) { return String(n).padStart(2, "0"); }

function updateCountdown() {
  const now = new Date();

  // --- Days together ---
  const diff = now - CONFIG.startDate;
  const days = Math.floor(diff / MS_DAY);
  const hours = Math.floor((diff % MS_DAY) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("days-together").textContent = days;
  document.getElementById("time-together").textContent = `+ ${hours} hours and ${mins} minutes`;
  document.getElementById("months-together").textContent = `${monthsTogether(now)} months of loving you 💕`;

  // --- Countdown to next monthsary ---
  const isMonthsaryToday = now.getDate() === CONFIG.startDate.getDate();
  document.getElementById("next-label").textContent =
    isMonthsaryToday ? "Happy Monthsary today! 🎉 Next one in" : "Next monthsary in";

  const left = nextMonthsary(now) - now;
  document.getElementById("cd-days").textContent  = Math.floor(left / MS_DAY);
  document.getElementById("cd-hours").textContent = pad(Math.floor((left % MS_DAY) / 3600000));
  document.getElementById("cd-mins").textContent  = pad(Math.floor((left % 3600000) / 60000));
  document.getElementById("cd-secs").textContent  = pad(Math.floor((left % 60000) / 1000));
}

updateCountdown();
setInterval(updateCountdown, 1000);

function renderTimeline() {
  const section = document.getElementById("timeline");
  section.innerHTML = `<h2 class="section-title">Our Journey 💜</h2><div class="timeline"></div>`;
  const wrap = section.querySelector(".timeline");

  TIMELINE.forEach(item => {
    const el = document.createElement("div");
    el.className = "tl-item" + (item.upcoming ? " upcoming" : "");
    el.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-card">
        <span class="tl-date">${item.date}</span>
        <h3>${item.title}</h3>
        ${item.image ? `<img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'">` : ""}
        <p>${item.text}</p>
      </div>`;
    wrap.appendChild(el);
  });

  // Cards fade in as you scroll down
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
  }, { threshold: 0.2 });
  document.querySelectorAll(".tl-item").forEach(el => observer.observe(el));
}

renderTimeline();

// ---------- Gallery ----------
function renderGallery() {
  const section = document.getElementById("gallery");
  section.innerHTML = `<h2 class="section-title">Our Memories 📸</h2><div class="gallery-grid"></div>`;
  const grid = section.querySelector(".gallery-grid");

  GALLERY.forEach((item, i) => {
    const card = document.createElement("figure");
    card.className = "memory-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.caption}" loading="lazy"
           onerror="this.closest('.memory-card').style.display='none'">
      <figcaption><strong>${item.caption}</strong><small>${item.date}</small></figcaption>`;
    card.addEventListener("click", () => openLightbox(i));
    grid.appendChild(card);
  });
}

// ---------- Pop-up preview (lightbox) ----------
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `
  <button class="lb-close" aria-label="Close">✕</button>
  <button class="lb-nav lb-prev" aria-label="Previous">‹</button>
  <figure class="lb-content"><img alt=""><figcaption></figcaption></figure>
  <button class="lb-nav lb-next" aria-label="Next">›</button>`;
document.body.appendChild(lightbox);

let current = 0;

function showLightbox(i) {
  current = (i + GALLERY.length) % GALLERY.length; // loops around
  const item = GALLERY[current];
  const img = lightbox.querySelector("img");
  img.src = item.image;
  img.alt = item.caption;
  lightbox.querySelector("figcaption").textContent = `${item.caption} • ${item.date}`;
}

function openLightbox(i) {
  showLightbox(i);
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden"; // stop the page scrolling behind
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

lightbox.querySelector(".lb-close").addEventListener("click", closeLightbox);
lightbox.querySelector(".lb-prev").addEventListener("click", () => showLightbox(current - 1));
lightbox.querySelector(".lb-next").addEventListener("click", () => showLightbox(current + 1));
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showLightbox(current - 1);
  if (e.key === "ArrowRight") showLightbox(current + 1);
});

renderGallery();

// ---------- Reasons flip cards ----------
function renderReasons() {
  const section = document.getElementById("reasons");
  section.innerHTML = `
    <h2 class="section-title">Reasons Why I Love You 💜</h2>
    <p class="section-sub">Tap a card to flip it</p>
    <div class="reasons-grid"></div>`;
  const grid = section.querySelector(".reasons-grid");

  REASONS.forEach((r, i) => {
    const card = document.createElement("div");
    card.className = "flip-card";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="flip-inner">
        <div class="flip-face flip-front">
          <span class="flip-num">#${i + 1}</span>
          <span class="flip-emoji">${r.emoji}</span>
          <h3>${r.title}</h3>
        </div>
        <div class="flip-face flip-back">
          <p>${r.message}</p>
        </div>
      </div>`;

    const flip = () => card.classList.toggle("flipped");
    card.addEventListener("click", flip);
    card.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); flip(); }
    });
    grid.appendChild(card);
  });
}

renderReasons();

// ---------- Surprise letter ----------
function renderLetter() {
  const section = document.getElementById("letter");
  section.innerHTML = `
    <h2 class="section-title">One Last Surprise 🎁</h2>
    <div class="surprise-wrap">
      <button class="surprise-btn" id="open-letter">${LETTER.buttonText}</button>
    </div>`;

  const modal = document.createElement("div");
  modal.className = "letter-modal";
  modal.innerHTML = `
    <div class="letter-paper">
      <button class="letter-close" aria-label="Close">✕</button>
      <h3>${LETTER.greeting}</h3>
      ${LETTER.paragraphs.map((p, i) =>
        `<p style="animation-delay:${0.5 + i * 0.9}s">${p}</p>`).join("")}
      <p class="letter-closing" style="animation-delay:${0.5 + LETTER.paragraphs.length * 0.9}s">
        ${LETTER.closing}<br><strong>${LETTER.signature}</strong>
      </p>
    </div>`;
  document.body.appendChild(modal);

  const paper = modal.querySelector(".letter-paper");

  function openLetter() {
    modal.classList.add("open");
    paper.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }
  function closeLetter() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.getElementById("open-letter").addEventListener("click", openLetter);
  modal.querySelector(".letter-close").addEventListener("click", closeLetter);
  modal.addEventListener("click", e => { if (e.target === modal) closeLetter(); });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.classList.contains("open")) closeLetter();
  });
}

renderLetter();

// ---------- Background music ----------
const music = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-btn");
music.volume = 0.5;

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play()
      .then(() => {
        musicBtn.classList.add("playing");
        musicBtn.textContent = "🔊";
      })
      .catch(err => console.warn("Music couldn't play. Is audio/our-song.mp3 there?", err));
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  }
});