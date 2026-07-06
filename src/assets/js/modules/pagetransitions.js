document.addEventListener("click", (event) => {
  const link = event.target.closest("a");

  if (!link) return;
  if (event.defaultPrevented) return;
  if (event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (link.target && link.target !== "_self") return;
  if (link.hasAttribute("download")) return;

  const url = new URL(link.href, window.location.href);

  if (url.origin !== window.location.origin) return;
  if (url.protocol !== "http:" && url.protocol !== "https:") return;
  if (url.hash && url.pathname === location.pathname && url.search === location.search) return;

  event.preventDefault();

  const doc = document.querySelector("html");

  if (!doc) {
    window.location.href = url.href;
    return;
  }

  const nav = document.querySelector(".header__nav");

  if (nav) {
    const navLinks = nav.querySelectorAll("a");

    navLinks.forEach((navLink) => {
      navLink.classList.remove("color-faint");
  navLink.removeAttribute("aria-current");

      const navUrl = new URL(navLink.href, window.location.href);

      if (url.pathname.indexOf(navUrl.pathname) === 0) {
        navLink.classList.add("color-faint");
      }
    });
  }

  doc.classList.add("is-leaving");

  setTimeout(() => {
    window.location.href = url.href;
  }, 450);
});