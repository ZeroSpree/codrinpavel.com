const root = document.documentElement;
const toggles = document.querySelectorAll(".theme-toggle");

function updateToggles() {
  const isDark = root.dataset.theme === "dark";

  toggles.forEach(toggle => {
    toggle.setAttribute(
      "aria-label",
      `Switch to ${isDark ? "light" : "dark"} mode`
    );

    toggle.setAttribute("aria-pressed", String(isDark));
  });
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