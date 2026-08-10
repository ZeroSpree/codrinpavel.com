import lenis from "./lenis";

const rootStyles = getComputedStyle(document.documentElement);
const links = [...document.querySelectorAll("a[data-scroll-to]")];

const items = links
  .map(link => ({
    link,
    image: document.getElementById(link.dataset.scrollTo),
  }))
  .filter(item => item.image);

let headerHeight;
let progressRange;

function updateMeasurements() {
  headerHeight = parseFloat(
    rootStyles.getPropertyValue("--header-height")
  );

  progressRange = Math.max(1, window.innerHeight - headerHeight);
}

function updateClientProgress() {
  items.forEach(({ link, image }) => {
    const rect = image.getBoundingClientRect();
    const distance = Math.abs(rect.top - headerHeight);
    const progress = Math.max(0, 1 - distance / progressRange);

    link.style.setProperty("--progress", `${progress * 100}%`);
    link.classList.toggle("is-past", rect.top < headerHeight);
  });
}

function scrollToTarget(event) {
  const target = document.getElementById(
    event.currentTarget.dataset.scrollTo
  );

  if (target) {
    lenis.scrollTo(target);
  }
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