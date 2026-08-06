const words = document.querySelector(".words");

if (words) {
  const button = words.querySelector(".words__next");
  const quotes = [...words.querySelectorAll(".words__quote figure")];

  let activeIndex = 0;

  function showNextQuote() {
    quotes[activeIndex]?.classList.remove("is-active");
    activeIndex = (activeIndex + 1) % quotes.length;
    quotes[activeIndex]?.classList.add("is-active");
  }

  words.addEventListener("click", event => {
    if (event.target.closest("a, button, input, textarea, select")) return;

    const selection = window.getSelection();

    if (selection && !selection.isCollapsed) return;

    showNextQuote();
  });

  button?.addEventListener("click", showNextQuote);
  quotes[activeIndex]?.classList.add("is-active");
}