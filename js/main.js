document.getElementById("year").textContent = new Date().getFullYear();

// Hobby carousel
const slides = [...document.querySelectorAll(".slide")];
const dots = [...document.querySelectorAll(".dot")];
let current = 0;
let timer;

function showSlide(index) {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle("active", i === current));
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function autoSlide() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 5000);
}

dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    autoSlide();
  });
});

if (slides.length) {
  autoSlide();
}

// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}
