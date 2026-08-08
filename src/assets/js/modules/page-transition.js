const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (!prefersReducedMotion.matches) {
  const pageTransition = document.querySelector(".page-transition");

  function playExitTransition(destination) {
    return new Promise(resolve => {
      if (!pageTransition) {
        resolve();
        return;
      }

      pageTransition.classList.toggle(
        "page-transition--home",
        destination.pathname === "/"
      );

      pageTransition.classList.add("is-active");

      pageTransition.addEventListener(
        "transitionend",
        event => {
          if (event.target !== pageTransition) return;
          resolve();
        },
        { once: true }
      );
    });
  }

  function prefetchPage(url) {
    return fetch(url.href, {
      credentials: "same-origin",
      priority: "high"
    }).catch(() => null);
  }

  document.addEventListener("click", async event => {
    const link = event.target.closest("a");

    if (!link) return;

    const url = new URL(link.href, window.location.href);

    const isModifiedClick =
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0;

    const isSamePageHash =
      url.pathname === window.location.pathname &&
      url.search === window.location.search &&
      url.hash;

    const shouldNavigateNormally =
      isModifiedClick ||
      link.target === "_blank" ||
      link.hasAttribute("download") ||
      link.hasAttribute("data-no-transition") ||
      url.origin !== window.location.origin ||
      isSamePageHash;

    if (shouldNavigateNormally) return;

    event.preventDefault();

    prefetchPage(url);

    await playExitTransition(url);

    window.location.href = url.href;
  });

  window.addEventListener("pageshow", () => {
    pageTransition?.classList.remove("is-active");
  });
}