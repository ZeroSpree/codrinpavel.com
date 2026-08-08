const supportsCursor = matchMedia(
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
).matches;

const cursor = document.querySelector(".cursor");

if (supportsCursor && cursor) {
  const cursorTitle = cursor.querySelector(".cursor__title");
  const cursorImages = cursor.querySelector(".cursor__images");
  const imageTriggers = document.querySelectorAll("[data-cursor-image]");

  imageTriggers.forEach(trigger => {
    const image = document.getElementById(trigger.dataset.cursorImage);

    if (!image || !cursorImages) return;

    image.classList.remove("hidden");
    cursorImages.append(image);
  });

  const imageObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const trigger = entry.target;
      const image = document.getElementById(trigger.dataset.cursorImage);
      const lazyImage = image?.querySelector("img[data-src]");

      if (lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.removeAttribute("data-src");
      }

      imageObserver.unobserve(trigger);
    });
  });

  imageTriggers.forEach(trigger => {
    imageObserver.observe(trigger);
  });

  const cursorEase = 0.1;

  let pointerX = 0;
  let pointerY = 0;
  let cursorX = 0;
  let cursorY = 0;
  let pointerInitialized = false;

  let activeTrigger = null;
  let activeImage = null;
  let typewriterTimeout = null;
  let updateFrame = null;

  function typeCursorTitle(text) {
    clearTimeout(typewriterTimeout);

    cursorTitle.textContent = "";

    let index = 0;

    function typeCharacter() {
      cursorTitle.textContent = text.slice(0, ++index);

      if (index < text.length) {
        typewriterTimeout = setTimeout(typeCharacter, 32);
      }
    }

    if (text) typeCharacter();
  }

  function hideCursor() {
    if (!activeTrigger && !cursor.hasAttribute("data-visible")) return;

    activeTrigger = null;

    clearTimeout(typewriterTimeout);

    cursorTitle.textContent = "";
    cursorTitle.style.removeProperty("color");

    activeImage?.removeAttribute("data-active");
    activeImage = null;

    cursor.removeAttribute("data-visible");
    cursor.removeAttribute("data-mode");
  }

  function showCursorTitle(trigger) {
    activeImage?.removeAttribute("data-active");
    activeImage = null;

    cursor.dataset.mode = "title";

    cursorTitle.style.color =
      `var(--color-${trigger.dataset.cursorColor})` || "";

    typeCursorTitle(trigger.dataset.cursor ?? "");
  }

  function showCursorImage(trigger) {
    clearTimeout(typewriterTimeout);

    cursorTitle.textContent = "";
    cursorTitle.style.removeProperty("color");

    activeImage?.removeAttribute("data-active");

    activeImage = document.getElementById(trigger.dataset.cursorImage);

    if (!activeImage || !cursor.contains(activeImage)) {
      activeImage = null;
      hideCursor();
      return;
    }

    cursor.dataset.mode = "image";
    activeImage.dataset.active = "";
  }

  function updateCursor() {
    updateFrame = null;

    cursorX += (pointerX - cursorX) * cursorEase;
    cursorY += (pointerY - cursorY) * cursorEase;

    cursor.style.transform =
      `translate3d(${cursorX + 20}px, ${cursorY}px, 0)`;

    const element = document.elementFromPoint(pointerX, pointerY);

    const trigger =
      element?.closest("[data-cursor], [data-cursor-image]") ?? null;

    if (!trigger) {
      hideCursor();
    } else {
      cursor.dataset.visible = "";

      if (trigger !== activeTrigger) {
        activeTrigger = trigger;

        if (trigger.hasAttribute("data-cursor-image")) {
          showCursorImage(trigger);
        } else {
          showCursorTitle(trigger);
        }
      }
    }

    const isMoving =
      Math.abs(pointerX - cursorX) > 0.1 ||
      Math.abs(pointerY - cursorY) > 0.1;

    if (isMoving) requestCursorUpdate();
  }

  function requestCursorUpdate() {
    if (updateFrame !== null) return;

    updateFrame = requestAnimationFrame(updateCursor);
  }

  document.addEventListener("pointermove", event => {
    pointerX = event.clientX;
    pointerY = event.clientY;

    if (!pointerInitialized) {
      cursorX = pointerX;
      cursorY = pointerY;
      pointerInitialized = true;
    }

    requestCursorUpdate();
  });

  document.addEventListener("scroll", requestCursorUpdate, {
    passive: true,
    capture: true
  });

  document.documentElement.addEventListener("pointerleave", hideCursor);
  window.addEventListener("blur", hideCursor);
}