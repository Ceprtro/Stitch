
const slides = [...document.querySelectorAll(".slide")];
const counter = document.getElementById("pageCounter");
const sky = document.getElementById("sky");
const sparkles = document.getElementById("sparkles");

let currentSlide = 0;
let currentPhoto = 0;
let letterTimer = null;

const photos = [
  {
    src: "photos/photos1.jpg",
    caption: "A moment to remember 💙"
  },
  {
    src: "photos/photos2.jpg",
    caption: "You make me smile 🥰"
  },
  {
    src: "photos/photos3.jpg",
    caption: "One of my favorite memories 🌸"
  },
  {
    src: "photos/photos4.jpg",
    caption: "More beautiful moments ahead ✨"
  }
];

const letter =
  "Happy Birthday to my best girl ever! 🎂💙\n\n" +
  "Thank you for all the effort and everything you do for me. " +
  "I'm so happy that I got to know you, and if there's anyone who's truly lucky, it's definitely me. " +
  "I'm such a lucky idiot to have you in my life. 🥹❤️ " +
  "I wish for you to study hard, graduate, become successful, and get rich someday. " +
  "I hope you'll achieve all your dreams and get everything your heart desires.\n\n" +
  "You deserve all the happiness and success in the world. " +
  "I'm being truly honest and genuine with you. " +
  "I'll do my very best and give everything I can to make things work for the both of us. " +
  "I want us to grow together, support each other, and achieve our dreams side by side. " +
  "Enjoy your special day, my baby girl! I hope your birthday is filled with happiness, love, and beautiful memories. " +
  "Always remember that you are special to me, and I'm so grateful to have you in my life. " +
   "Happy Birthday, my baby girl! I Miss you so much. 💙🎉💖";

function goToSlide(index) {
  if (index < 0 || index >= slides.length) return;

  currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
  });

  counter.textContent =
    String(index + 1).padStart(2, "0") +
    " / " +
    String(slides.length).padStart(2, "0");

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Every new slide gets its own burst of sparkles.
  createBurst(12);

  if (index === 2) {
    renderPhoto();
  }
}

function openGift() {
  const gift = document.getElementById("giftEmoji");
  const message = document.getElementById("giftMessage");

  gift.textContent = "💝";
  gift.style.animation = "popIn .6s ease";

  message.classList.add("visible");
  createBurst(30);

  const button = document.querySelector(".gift-button");
  button.style.boxShadow = "0 0 45px #ffadd6aa";

  setTimeout(() => {
    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 250);
}

// Photo slideshow controls

function renderPhoto() {
  const img = document.getElementById("featuredPhoto");
  const caption = document.getElementById("photoCaption");
  const dots = document.getElementById("photoDots");

  img.classList.remove("changing");
  void img.offsetWidth;

  img.src = photos[currentPhoto].src;
  img.alt = photos[currentPhoto].caption;
  img.classList.add("changing");

  caption.textContent = photos[currentPhoto].caption;

  dots.innerHTML = "";

  photos.forEach((photo, i) => {
    const dot = document.createElement("button");

    dot.className =
      "photo-dot" + (i === currentPhoto ? " active" : "");

    dot.setAttribute("aria-label", `Show picture ${i + 1}`);

    dot.addEventListener("click", () => {
      currentPhoto = i;
      renderPhoto();
      createBurst(8);
    });

    dots.appendChild(dot);
  });
}

function changePhoto(direction) {
  currentPhoto =
    (currentPhoto + direction + photos.length) % photos.length;

  renderPhoto();
  createBurst(10);
}

// Letter reveal with typing effect

function revealLetter() {
  const card = document.getElementById("letterCard");
  const text = document.getElementById("letterText");
  const button = document.querySelector(".letter-button");

  clearInterval(letterTimer);

  card.classList.remove("visible");
  void card.offsetWidth;
  card.classList.add("visible");

  button.textContent = "💖";
  text.textContent = "";

  createBurst(20);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    text.textContent = letter;
    return;
  }

  let index = 0;

  letterTimer = setInterval(() => {
    text.textContent += letter.charAt(index);
    index++;

    if (index >= letter.length) {
      clearInterval(letterTimer);
    }
  }, 25);

  setTimeout(() => {
    card.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 200);
}

// Final celebration

function celebrate() {
  const message = document.getElementById("celebrationMessage");

  message.classList.remove("visible");
  void message.offsetWidth;
  message.classList.add("visible");

  createBurst(55);
  createFloatingHearts(25);

  setTimeout(() => {
    message.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, 200);
}

// Create floating hearts and stars

function createFloatingHearts(amount = 5) {
  const decorations = [
    "💙", "💗", "💕", "✨", "⭐", "🌸", "🫧"
  ];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");

    item.className = "sky-item";
    item.textContent =
      decorations[Math.floor(Math.random() * decorations.length)];

    item.style.setProperty("--x", Math.random() * 100 + "%");
    item.style.setProperty("--size", 14 + Math.random() * 24 + "px");
    item.style.setProperty("--duration", 4 + Math.random() * 5 + "s");

    sky.appendChild(item);

    setTimeout(() => item.remove(), 9500);
  }
}

function createBurst(amount = 20) {
  const decorations = ["✨", "💙", "💗", "⭐", "💕", "🌸"];

  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");

    item.className = "sparkle";
    item.textContent =
      decorations[Math.floor(Math.random() * decorations.length)];

    item.style.setProperty("--x", Math.random() * 100 + "%");
    item.style.setProperty("--y", 15 + Math.random() * 70 + "%");
    item.style.setProperty("--size", 14 + Math.random() * 23 + "px");
    item.style.setProperty("--dx", (Math.random() - 0.5) * 180 + "px");
    item.style.setProperty("--dy", (Math.random() - 0.5) * 180 + "px");

    sparkles.appendChild(item);

    setTimeout(() => item.remove(), 1400);
  }
}

// Replay the whole experience

function restartShow() {
  clearInterval(letterTimer);

  currentPhoto = 0;

  document.getElementById("giftEmoji").textContent = "🎁";
  document.getElementById("giftMessage").classList.remove("visible");
  document.querySelector(".gift-button").style.boxShadow = "";

  document.querySelector(".letter-button").textContent = "💌";
  document.getElementById("letterCard").classList.remove("visible");
  document.getElementById("letterText").textContent = "";

  document.getElementById("celebrationMessage")
    .classList.remove("visible");

  goToSlide(0);
  createBurst(30);
}

// Initial decorations
createFloatingHearts(20);

// Continue the floating effects without overwhelming the page.
setInterval(() => {
  if (!document.hidden) {
    createFloatingHearts(2);
  }
}, 1800);

// Allow left/right arrow keys to browse the slides.
document.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") {
    goToSlide((currentSlide + 1) % slides.length);
  }

  if (event.key === "ArrowLeft") {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }
});

// Set the initial photo and slide indicator.
renderPhoto();
goToSlide(0);
