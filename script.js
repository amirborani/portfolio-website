document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const revealItems = document.querySelectorAll(".reveal");
  const currentYear = document.getElementById("currentYear");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Current year in the footer
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  function closeMenu() {
    if (!menuToggle || !mainNav) return;
    mainNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    mainNav.querySelector(".nav-cta")?.addEventListener("click", closeMenu);

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    document.addEventListener("click", event => {
      if (
        mainNav.classList.contains("is-open") &&
        !mainNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Smooth navigation
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start"
      });

      if (window.location.hash !== targetId) {
        history.pushState(null, "", targetId);
      }
    });
  });

  // Reveal content when it enters the screen
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: "0px 0px 30px 0px"
    });

    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Highlight the navigation item for the current section
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (!visible.length) return;

      const currentId = visible[0].target.id;

      navLinks.forEach(link => {
        const active = link.getAttribute("href") === `#${currentId}`;
        link.classList.toggle("active", active);

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }, {
      rootMargin: "-18% 0px -55% 0px",
      threshold: [0, 0.1, 0.25, 0.5]
    });

    sections.forEach(section => sectionObserver.observe(section));
  }

  // Gentle parallax movement for scenic section backgrounds
  const backgrounds = document.querySelectorAll(".section-background");
  let scrollPending = false;

  function updateParallax() {
    const viewportHeight = window.innerHeight;

    backgrounds.forEach(background => {
      const section = background.closest("section");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > viewportHeight) return;

      const distance = (rect.top + rect.height / 2 - viewportHeight / 2);
      const offset = Math.max(-38, Math.min(38, distance * -0.045));

      background.style.setProperty(
        "--parallax-y",
        reduceMotion ? "0px" : `${offset}px`
      );
    });

    scrollPending = false;
  }

  if (!reduceMotion) {
    window.addEventListener("scroll", () => {
      if (!scrollPending) {
        window.requestAnimationFrame(updateParallax);
        scrollPending = true;
      }
    }, { passive: true });

    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  // Keep page scrolling enabled
  document.documentElement.style.overflowY = "auto";
  document.body.style.overflowY = "visible";
});
