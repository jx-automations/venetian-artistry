/*
  main.js — shared site behavior: mobile nav, scroll-reveal, footer year,
  "In the Studio" video gallery (lazy-load, play/pause on visibility,
  reduced-motion guard, lightbox), and contact form validation.
  No dependencies, no build step — plain ES6+.
*/

document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initScrollReveal();
  initFooterYear();
  initStudioGallery();
  initContactForm();
  markCurrentNavLink();
});

/* ---------------------------------------------------------------- */
/* Mobile nav toggle                                                  */
/* ---------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const closeBtn = document.querySelector(".nav-mobile-close");
  const menu = document.querySelector(".nav-mobile");
  if (!toggle || !menu) return;

  const open = () => {
    menu.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    menu.classList.remove("open");
    document.body.style.overflow = "";
  };

  toggle.addEventListener("click", open);
  closeBtn && closeBtn.addEventListener("click", close);
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", close));
}

/* ---------------------------------------------------------------- */
/* Scroll-reveal: subtle fade/slide-up via IntersectionObserver       */
/* ---------------------------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ---------------------------------------------------------------- */
/* Footer year                                                        */
/* ---------------------------------------------------------------- */
function initFooterYear() {
  const el = document.querySelector("[data-current-year]");
  if (el) el.textContent = new Date().getFullYear();
}

/* ---------------------------------------------------------------- */
/* Highlight current page in nav                                      */
/* ---------------------------------------------------------------- */
function markCurrentNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-desktop a, .nav-mobile a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path) a.setAttribute("aria-current", "page");
  });
}

/* ---------------------------------------------------------------- */
/* "In the Studio" video gallery                                      */
/* - Poster image shown until playback (never a black box)            */
/* - Lazy-loads video src only once a card nears the viewport          */
/* - Plays muted/looped when visible, pauses when scrolled out         */
/* - Respects prefers-reduced-motion: no autoplay JS runs at all       */
/* - Click/tap opens a lightbox with a sound-on toggle                 */
/* ---------------------------------------------------------------- */
function initStudioGallery() {
  const cards = document.querySelectorAll(".studio-card");
  if (!cards.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Lazy-load + autoplay-on-visibility (skipped entirely under reduced motion —
  // users just see the poster image, no video element is ever populated).
  if (!reduceMotion && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const card = entry.target;
          const video = card.querySelector("video");
          if (!video) return;

          if (entry.isIntersecting) {
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
              video.load();
            }
            video.play().catch(() => {
              /* autoplay can be blocked by the browser — poster stays visible */
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5, rootMargin: "200px 0px" }
    );
    cards.forEach((card) => io.observe(card));
  }

  // Lightbox: click/tap any card to open a larger, sound-toggleable view.
  const lightbox = document.querySelector(".lightbox");
  if (!lightbox) return;
  const lightboxVideo = lightbox.querySelector("video");
  const soundBtn = lightbox.querySelector(".lightbox-sound");
  const closeBtn = lightbox.querySelector(".lightbox-close");

  const openLightbox = (src, poster) => {
    lightboxVideo.src = src;
    lightboxVideo.poster = poster;
    lightboxVideo.muted = true;
    lightboxVideo.loop = true;
    lightboxVideo.play().catch(() => {});
    lightbox.classList.add("open");
    updateSoundLabel();
  };
  const closeLightbox = () => {
    lightbox.classList.remove("open");
    lightboxVideo.pause();
    lightboxVideo.removeAttribute("src");
    lightboxVideo.load();
  };
  const updateSoundLabel = () => {
    soundBtn.setAttribute("aria-pressed", String(!lightboxVideo.muted));
    soundBtn.innerHTML = lightboxVideo.muted
      ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4z"/><line x1="19" y1="9" x2="15" y2="15" stroke="currentColor" stroke-width="2"/><line x1="15" y1="9" x2="19" y2="15" stroke="currentColor" stroke-width="2"/></svg>'
      : '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M4 9v6h4l5 5V4L8 9H4zm11.5 3a4.5 4.5 0 0 0-2.5-4v8a4.5 4.5 0 0 0 2.5-4z"/></svg>';
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const video = card.querySelector("video");
      const src = video.dataset.src || video.src;
      const poster = video.getAttribute("poster");
      openLightbox(src, poster);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  soundBtn.addEventListener("click", () => {
    lightboxVideo.muted = !lightboxVideo.muted;
    updateSoundLabel();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
  });
}

/* ---------------------------------------------------------------- */
/* Contact form: front-end only validation + success state            */
/* ---------------------------------------------------------------- */
function initContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;

  const successPanel = document.querySelector(".form-success");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll("[data-required]").forEach((field) => {
      const wrapper = field.closest(".form-field");
      const isEmpty = !field.value.trim();
      const isBadEmail = field.type === "email" && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      const invalid = isEmpty || isBadEmail;
      wrapper.classList.toggle("invalid", invalid);
      if (invalid) valid = false;
    });

    if (!valid) return;

    form.style.display = "none";
    if (successPanel) successPanel.classList.add("visible");
  });

  // Live character count for the message field, if present.
  const message = form.querySelector("#message");
  const counter = form.querySelector("[data-char-count]");
  if (message && counter) {
    const max = message.getAttribute("maxlength") || 500;
    const update = () => (counter.textContent = `${message.value.length} / ${max}`);
    message.addEventListener("input", update);
    update();
  }
}
