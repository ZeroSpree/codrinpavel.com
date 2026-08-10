import lenis, { onLenisFrame } from "./lenis";

const elements = document.querySelectorAll(".squish, .case-study figure");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (elements.length && !reducedMotion.matches) {
  const maxVelocity = 20;
  const minScale = 0.97;
  const easing = 0.12;
  const threshold = 0.0001;

  let currentScale = 1;
  let renderedScale = 1;

  onLenisFrame(() => {
    const intensity = Math.min(Math.abs(lenis.velocity) / maxVelocity, 1);
    const targetScale = 1 - intensity * (1 - minScale);

    currentScale += (targetScale - currentScale) * easing;

    if (Math.abs(targetScale - currentScale) < threshold) currentScale = targetScale;
    if (Math.abs(currentScale - renderedScale) < threshold) return;

    renderedScale = currentScale;

    elements.forEach(element => {
      element.style.setProperty("--scroll-scale", currentScale);
    });
  });
}
