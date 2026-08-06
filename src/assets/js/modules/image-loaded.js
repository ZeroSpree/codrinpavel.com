const images = document.querySelectorAll("img");

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