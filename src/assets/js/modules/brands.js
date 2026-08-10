import lenis from "./lenis";

const brands = document.querySelector(".brands");

if (brands) {
  const items = [...brands.querySelectorAll("li[data-brand-id]")];
  const imagesByBrandId = new Map(
    [...brands.querySelectorAll("figure[data-brand-id]")].map(image => [
      image.dataset.brandId,
      image,
    ])
  );

  let activeItem = null;
  let activeImage = null;

  function updateItems() {
    const viewportCenter = window.innerHeight / 2;

    let nextActiveItem = null;
    let smallestDistance = Infinity;

    items.forEach(item => {
      const rect = item.getBoundingClientRect();
      const itemCenter = rect.top + rect.height / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nextActiveItem = item;
      }
    });

    if (nextActiveItem === activeItem) return;

    activeItem?.classList.remove("is-active");
    activeImage?.classList.remove("is-active");

    activeItem = nextActiveItem;
    activeImage = imagesByBrandId.get(activeItem?.dataset.brandId) ?? null;

    activeItem?.classList.add("is-active");
    activeImage?.classList.add("is-active");
  }

  lenis.on("scroll", updateItems);
  window.addEventListener("resize", updateItems);

  updateItems();
}