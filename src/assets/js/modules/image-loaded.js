const images = document.querySelectorAll("main .image");

function markAsLoaded(image) {
  image.classList.add("is-loaded");
}

images.forEach(image => {
  if (image.complete && image.naturalWidth > 0) {
    markAsLoaded(image);
    return;
  }

  image.addEventListener("load", () => markAsLoaded(image), { once: true });
});