const observer = new IntersectionObserver(
  entries => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
     //if (!target.src) target.src = target.dataset.src;
     //target.play();
    } else {
      target.pause();
    }
  }),
  { rootMargin: "0px 0px 200px" }
);

document
  .querySelectorAll("video")
  .forEach(el => observer.observe(el));

