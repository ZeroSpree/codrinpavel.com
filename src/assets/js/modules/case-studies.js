import lenis from "./lenis";

const rootStyles = getComputedStyle(document.documentElement);
const links = [...document.querySelectorAll("a[data-scroll-to]")];
const images = links
  .map(link => document.getElementById(link.dataset.scrollTo))
  .filter(Boolean);

let headerHeight;
let progressRange;

function updateMeasurements() {
  headerHeight = parseFloat(rootStyles.getPropertyValue("--header-height"));
  progressRange = Math.max(1, window.innerHeight - headerHeight);
}

function updateClientProgress() {
  images.forEach(image => {
    const rect = image.getBoundingClientRect();
    const distance = Math.abs(rect.top - headerHeight);
    const progress = Math.max(0, 1 - distance / progressRange);
    const link = document.querySelector(`a[data-scroll-to="${image.id}"]`);

    if (!link) return;

    link.style.setProperty("--progress", `${progress * 100}%`);
    link.classList.toggle("is-past", rect.top < headerHeight);
  });
}

function scrollToTarget(event) {
  const link = event.currentTarget;
  const target = document.getElementById(link.dataset.scrollTo);

  if (target) lenis.scrollTo(target);
}

links.forEach(link => {
  link.addEventListener("mouseenter", scrollToTarget);
  link.addEventListener("focus", scrollToTarget);
});

function handleResize() {
  updateMeasurements();
  updateClientProgress();
}

lenis.on("scroll", updateClientProgress);
window.addEventListener("resize", handleResize);

handleResize();