import lenis from "./lenis";

const buttons = document.querySelectorAll(".header [aria-controls]");

function toggleMenu(button, isOpen) {
  const targetId = button.getAttribute("aria-controls");
  const menu = document.getElementById(targetId);

  if (!menu) return;

  const openClass = `${targetId}-open`;
  const currentlyOpen = button.getAttribute("aria-expanded") === "true";

  isOpen ??= !currentlyOpen;

  document.body.classList.toggle(openClass, isOpen);

  menu.inert = !isOpen;
  button.setAttribute("aria-expanded", isOpen);

  const hasOpenMenu = [...buttons].some(
    button => button.getAttribute("aria-expanded") === "true"
  );

  hasOpenMenu ? lenis.stop() : lenis.start();
  // todo should probably focus a sr-only headline
  //isOpen ? menu.querySelector("a, button")?.focus() : button.focus();
}

buttons.forEach(button => {
  button.addEventListener("click", () => toggleMenu(button));
});

document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;

  buttons.forEach(button => {
    if (button.getAttribute("aria-expanded") === "true") {
      toggleMenu(button, false);
    }
  });
});