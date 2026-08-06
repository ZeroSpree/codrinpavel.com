import lenis, { onLenisFrame } from "./lenis";

const selectors = [
  ".squish",
  ".case-study figure",
];

const elements = document.querySelectorAll(selectors.join(","));
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);

if (elements.length && !reducedMotion.matches) {
  const maxVelocity = 20;
  const minScale = 0.97;
  const easing = 0.12;
  const threshold = 0.0001;

  let currentScale = 1;
  let renderedScale = 1;

  onLenisFrame(() => {
    const intensity = Math.min(
      Math.abs(lenis.velocity) / maxVelocity,
      1
    );

    const targetScale =
      1 - intensity * (1 - minScale);

    currentScale +=
      (targetScale - currentScale) * easing;

    if (Math.abs(targetScale - currentScale) < threshold) {
      currentScale = targetScale;
    }

    if (Math.abs(currentScale - renderedScale) < threshold) {
      return;
    }

    renderedScale = currentScale;

    elements.forEach(element => {
      element.style.setProperty(
        "--scroll-scale",
        currentScale
      );
    });
  });
}

/*
import lenis from "./lenis";

const main = document.querySelector("main");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const maxVelocity = 20;
  const minScale = 0.97;
  const easing = 0.12;

  let currentScale = 1;
  let targetScale = 1;
  let frame = null;

  function render() {
    currentScale += (targetScale - currentScale) * easing;

    if (Math.abs(targetScale - currentScale) < 0.0001) {
      currentScale = targetScale;
      frame = null;
    } else {
      frame = requestAnimationFrame(render);
    }

    main.style.setProperty("--scroll-scale", currentScale.toFixed(4));
  }

  lenis.on("scroll", ({ velocity }) => {
    const intensity = Math.min(
      Math.abs(velocity) / maxVelocity,
      1
    );

    targetScale = 1 - intensity * (1 - minScale);

    if (frame === null) {
      frame = requestAnimationFrame(render);
    }
  });
}*/