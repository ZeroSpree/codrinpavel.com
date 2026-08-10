const header = document.querySelector(".header");
const themedElements = document.querySelectorAll("[data-header-theme]");

let observer;

function setHeaderTheme(theme) {
  if(theme) {
    header.classList.forEach(className => {
      if (className.startsWith("header--")) {
        header.classList.remove(className);
      }
    });

    header.classList.add(`header--${theme}`);
  }
}

function createHeaderThemeObserver() {
  observer?.disconnect();

  const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || 0;
  const headerMidY = headerHeight / 2;

  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        setHeaderTheme(entry.target.dataset.headerTheme);
      });
    },
    {
      rootMargin: `-${headerMidY}px 0px -${window.innerHeight - headerMidY}px 0px`,
      threshold: 0
    }
  );

  themedElements.forEach(element => observer.observe(element));
}

createHeaderThemeObserver();
window.addEventListener("resize", createHeaderThemeObserver);