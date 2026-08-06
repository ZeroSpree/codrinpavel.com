import Lenis from "lenis";

const lenis = new Lenis({
  wrapper: window,
  content: document.documentElement,
  orientation: "vertical",
  autoRaf: false,
  lerp: 0.08,
});

const info = document.querySelector("#info");

const infoLenis = info
  ? new Lenis({
      wrapper: info,
      content: info,
      orientation: "vertical",
      autoRaf: false,
      lerp: 0.07,
    })
  : null;

const frameCallbacks = new Set();

function raf(time) {
  lenis.raf(time);
  infoLenis?.raf(time);

  frameCallbacks.forEach(callback => callback(time));

  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

export function onLenisFrame(callback) {
  frameCallbacks.add(callback);

  return () => {
    frameCallbacks.delete(callback);
  };
}

export default lenis;