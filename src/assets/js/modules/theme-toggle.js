const root = document.documentElement;
const toggles = document.querySelectorAll(".theme-toggle");
const favicon = document.querySelector('link[rel="icon"]');

function updateToggles() {
  const isDark = root.dataset.theme === "dark";

  toggles.forEach(toggle => {
    toggle.setAttribute(
      "aria-label",
      `Switch to ${isDark ? "light" : "dark"} mode`
    );

    toggle.setAttribute("aria-pressed", String(isDark));
  });

  if (favicon) {
    favicon.href = favicon.href.replace(
      /favicon(?:-dark)?\.svg$/,
      isDark ? "favicon-dark.svg" : "favicon.svg"
    );
  }
}

toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    const theme = root.dataset.theme === "dark" ? "light" : "dark";

    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    updateToggles();
  });
});

updateToggles();