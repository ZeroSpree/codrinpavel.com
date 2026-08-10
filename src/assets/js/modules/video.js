const observer = new IntersectionObserver(
  entries => entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting) {
      if (!target.src) target.src = target.dataset.src;
      target.play().catch(() => { });
    } else {
      target.pause();
    }
  }),
  {
    rootMargin: "0px 0px 200px 0px",
  }
);

document
  .querySelectorAll("video")
  .forEach(video => observer.observe(video));