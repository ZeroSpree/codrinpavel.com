const items = document.querySelectorAll(".words-carousel p");

if (items.length) {
  const fade = 500;
  const hold = 2500;
  const stagger = 75;

  let current = 0;
  let timeout;

  items.forEach(item => {
    item.style.userSelect = "none";
    item.style.pointerEvents = "none";
  });

  function animateItem(item) {
    const words = item.querySelectorAll("[data-reveal]");

    const staggerDuration = (words.length - 1) * stagger;
    const visibleDuration = fade + hold + fade + staggerDuration;

    item.style.userSelect = "text";
    item.style.pointerEvents = "auto";

    words.forEach((word, index) => {
      word.animate(
        [
          {
            opacity: 0,
            transform: "translateY(100%)",
          },
          {
            opacity: 1,
            transform: "translateY(0)",
          },
        ],
        {
          duration: fade,
          delay: index * stagger,
          easing: "cubic-bezier(.22, 1, .36, 1)",
          fill: "both",
        }
      );
    });

    setTimeout(() => {
      words.forEach((word, index) => {
        word.animate(
          [
            {
              opacity: 1,
              transform: "translateY(0)",
            },
            {
              opacity: 0,
              transform: "translateY(100%)",
            },
          ],
          {
            duration: fade,
            delay: index * stagger,
            easing: "cubic-bezier(.64, 0, .78, 0)",
            fill: "forwards",
          }
        );
      });
    }, fade + hold);

    timeout = setTimeout(() => {
      item.style.userSelect = "none";
      item.style.pointerEvents = "none";

      current = (current + 1) % items.length;
      animateItem(items[current]);
    }, visibleDuration);
  }

  animateItem(items[current]);
}