document.getElementById("year").textContent = new Date().getFullYear();

const toast = document.getElementById("toast");
let toastTimer;

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.appendChild(input);
    input.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(input);
    return ok;
  }
}

document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    const message = btn.dataset.toast || "已复制";
    const ok = await copyText(text);

    if (ok) {
      showToast(message);
      btn.classList.add("copied");
      setTimeout(() => btn.classList.remove("copied"), 1500);
    } else {
      showToast("复制失败，请手动复制");
    }
  });
});

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");

if (menuBtn && nav) {
  menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => nav.classList.remove("open"));
  });
}

document.querySelectorAll("[data-slider]").forEach((slider) => {
  const track = slider.querySelector(".slider-track");
  const slides = [...slider.querySelectorAll(".slider-slide")];
  const prev = slider.querySelector(".slider-btn.prev");
  const next = slider.querySelector(".slider-btn.next");
  const dotsWrap = slider.querySelector(".slider-dots");
  if (!track || slides.length === 0) return;

  const dots = slides.map((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `第 ${i + 1} 张`);
    btn.addEventListener("click", () => {
      track.scrollTo({ left: slides[i].offsetLeft, behavior: "smooth" });
    });
    dotsWrap.appendChild(btn);
    return btn;
  });

  function currentIndex() {
    const x = track.scrollLeft;
    let best = 0;
    let dist = Infinity;
    slides.forEach((slide, i) => {
      const d = Math.abs(slide.offsetLeft - x);
      if (d < dist) {
        dist = d;
        best = i;
      }
    });
    return best;
  }

  function go(delta) {
    const i = Math.min(slides.length - 1, Math.max(0, currentIndex() + delta));
    track.scrollTo({ left: slides[i].offsetLeft, behavior: "smooth" });
  }

  function syncDots() {
    const i = currentIndex();
    dots.forEach((dot, idx) => dot.classList.toggle("active", idx === i));
  }

  prev.addEventListener("click", () => go(-1));
  next.addEventListener("click", () => go(1));
  track.addEventListener("scroll", () => requestAnimationFrame(syncDots), { passive: true });
  track.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  });
  syncDots();
});

const CINNA_GIFS = Array.from({ length: 8 }, (_, i) =>
  `assets/sanrio/cinna-${String(i + 1).padStart(2, "0")}.gif`
);

document.querySelectorAll(".page").forEach((page, pageIndex) => {
  const drift = document.createElement("div");
  drift.className = "page-drift";
  drift.setAttribute("aria-hidden", "true");

  const cloudCount = page.classList.contains("page-icy") ? 2 : 3;
  const cinnaCount = page.classList.contains("page-icy") ? 1 : 2;

  for (let i = 0; i < cloudCount; i += 1) {
    const cloud = document.createElement("span");
    cloud.className = "drift-cloud";
    cloud.style.setProperty("--left", `${8 + pageIndex * 5 + i * 26}%`);
    cloud.style.setProperty("--delay", `${i * 5 + pageIndex * 1.5}s`);
    cloud.style.setProperty("--duration", `${20 + i * 6}s`);
    cloud.style.setProperty("--size", `${40 + i * 12}px`);
    drift.appendChild(cloud);
  }

  for (let i = 0; i < cinnaCount; i += 1) {
    const img = document.createElement("img");
    img.className = "drift-cinna";
    img.src = CINNA_GIFS[(pageIndex * 2 + i) % CINNA_GIFS.length];
    img.alt = "";
    img.style.setProperty("--left", `${18 + i * 38 + pageIndex * 3}%`);
    img.style.setProperty("--delay", `${4 + i * 7 + pageIndex * 2}s`);
    img.style.setProperty("--duration", `${24 + i * 5}s`);
    img.style.setProperty("--size", page.classList.contains("page-icy") ? "40px" : "46px");
    drift.appendChild(img);
  }

  page.insertBefore(drift, page.firstChild);
});
