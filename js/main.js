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

const GALLERIES = {
  yuqing: {
    kicker: "AI 使用 · 智能化机器人",
    title: "使用 AI 进行舆情收集与对策",
    slides: [
      { src: "assets/ai/yuqing-map.png", caption: "舆情处理", alt: "舆情处理流程图：收集、确认信息、制定策略、复盘预防" }
    ]
  },
  review: {
    kicker: "AI 使用 · 数据分析",
    title: "活动数据复盘优化",
    slides: [
      { src: "assets/ai/yuqing-map.png", caption: "1. 舆情分析", alt: "舆情分析流程图" },
      { src: "assets/ai/review-data.png", caption: "2. 原来数据", alt: "DC社区活动中奖者重复情况分析" },
      { src: "assets/ai/review-improve.png", caption: "3. 改善方式", alt: "社区数据优化方案思维导图" }
    ]
  }
};

const workViewer = document.getElementById("work-viewer");
const workImg = document.getElementById("work-viewer-img");
const workKicker = document.getElementById("work-viewer-kicker");
const workTitle = document.getElementById("work-viewer-title");
const workCaption = document.getElementById("work-viewer-caption");
const workDots = document.getElementById("work-viewer-dots");
const workStage = workViewer?.querySelector(".work-viewer-stage");
const workPrev = workViewer?.querySelector(".work-viewer-nav.prev");
const workNext = workViewer?.querySelector(".work-viewer-nav.next");
const workClose = workViewer?.querySelector(".work-viewer-close");

let activeGallery = null;
let slideIndex = 0;

function renderSlide() {
  if (!activeGallery) return;
  const slide = activeGallery.slides[slideIndex];
  workImg.src = slide.src;
  workImg.alt = slide.alt;
  workCaption.textContent = slide.caption;
  workDots.querySelectorAll("button").forEach((btn, i) => {
    btn.classList.toggle("active", i === slideIndex);
  });
}

function openGallery(key) {
  const gallery = GALLERIES[key];
  if (!gallery || !workViewer) return;
  activeGallery = gallery;
  slideIndex = 0;
  workKicker.textContent = gallery.kicker;
  workTitle.textContent = gallery.title;
  workStage.classList.toggle("is-single", gallery.slides.length < 2);
  workDots.innerHTML = "";
  gallery.slides.forEach((_, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.setAttribute("aria-label", `第 ${i + 1} 张`);
    btn.addEventListener("click", () => {
      slideIndex = i;
      renderSlide();
    });
    workDots.appendChild(btn);
  });
  renderSlide();
  workViewer.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (!workViewer) return;
  workViewer.hidden = true;
  document.body.style.overflow = "";
  if (location.hash.startsWith("#work-")) {
    history.replaceState(null, "", "#skills");
  }
}

function shiftSlide(delta) {
  if (!activeGallery || activeGallery.slides.length < 2) return;
  const total = activeGallery.slides.length;
  slideIndex = (slideIndex + delta + total) % total;
  renderSlide();
}

document.querySelectorAll("[data-gallery]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const key = link.dataset.gallery;
    history.replaceState(null, "", link.getAttribute("href"));
    openGallery(key);
  });
});

workPrev?.addEventListener("click", () => shiftSlide(-1));
workNext?.addEventListener("click", () => shiftSlide(1));
workClose?.addEventListener("click", closeGallery);
workViewer?.addEventListener("click", (event) => {
  if (event.target === workViewer) closeGallery();
});
document.addEventListener("keydown", (event) => {
  if (workViewer?.hidden) return;
  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowLeft") shiftSlide(-1);
  if (event.key === "ArrowRight") shiftSlide(1);
});

const hashKey = location.hash === "#work-yuqing" ? "yuqing" : location.hash === "#work-review" ? "review" : null;
if (hashKey) openGallery(hashKey);

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

const pageDrifts = new Map();
const pageVisibility = new Map();

document.querySelectorAll(".page").forEach((page, pageIndex) => {
  if (page.classList.contains("page-icy")) return;

  const drift = document.createElement("div");
  drift.className = "page-drift";
  drift.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 3; i += 1) {
    const cloud = document.createElement("span");
    cloud.className = "drift-cloud";
    cloud.style.setProperty("--left", `${8 + i * 28}%`);
    cloud.style.setProperty("--delay", `${i * 3 + (pageIndex % 3)}s`);
    cloud.style.setProperty("--duration", `${14 + i * 3}s`);
    cloud.style.setProperty("--size", `${46 + i * 12}px`);
    drift.appendChild(cloud);
  }

  for (let i = 0; i < 2; i += 1) {
    const img = document.createElement("img");
    img.className = "drift-cinna";
    img.src = CINNA_GIFS[(pageIndex * 2 + i) % CINNA_GIFS.length];
    img.alt = "";
    img.style.setProperty("--left", `${16 + i * 38}%`);
    img.style.setProperty("--delay", `${i * 4 + 1 + (pageIndex % 4)}s`);
    img.style.setProperty("--duration", `${16 + i * 4}s`);
    img.style.setProperty("--size", "52px");
    drift.appendChild(img);
  }

  document.body.appendChild(drift);
  pageDrifts.set(page, drift);
  pageVisibility.set(page, 0);
});

function syncActiveDrift() {
  let bestPage = null;
  let bestRatio = 0;

  pageVisibility.forEach((ratio, page) => {
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestPage = page;
    }
  });

  pageDrifts.forEach((drift, page) => {
    drift.classList.toggle("is-active", page === bestPage && bestRatio > 0.08);
  });
}

if (pageDrifts.size > 0) {
  const driftObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        pageVisibility.set(entry.target, entry.intersectionRatio);
      });
      syncActiveDrift();
    },
    { threshold: [0, 0.08, 0.15, 0.25, 0.4, 0.55, 0.7, 0.85, 1] }
  );

  pageDrifts.forEach((_, page) => driftObserver.observe(page));
  syncActiveDrift();
}
