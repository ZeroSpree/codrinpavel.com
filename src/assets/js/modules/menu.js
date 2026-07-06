import lenis from "./lenis";

const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

const BODY_CLASS = "menu-open";
const MENU_CLASS = "is-open";

export function openMenu() {
  if (!menuButton || !menu) return;

  menu.classList.add(MENU_CLASS);
  menu.inert = false;

  menuButton.setAttribute("aria-expanded", "true");
  document.body.classList.add(BODY_CLASS);

  lenis.stop();

  const firstFocusable = menu.querySelector("a");
  firstFocusable?.focus();
}

export function closeMenu({ restoreFocus = true } = {}) {
  if (!menuButton || !menu) return;
  if (!menu.classList.contains(MENU_CLASS)) return;

  menu.classList.remove(MENU_CLASS);
  menu.inert = true;

  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove(BODY_CLASS);

  lenis.start();

  if (restoreFocus) {
    menuButton.focus();
  }
}

function toggleMenu() {
  if (!menu) return;

  menu.classList.contains(MENU_CLASS)
    ? closeMenu()
    : openMenu();
}

menuButton?.addEventListener("click", toggleMenu);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menu?.classList.contains(MENU_CLASS)) {
    closeMenu();
  }
});