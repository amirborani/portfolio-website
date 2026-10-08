```javascript
document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     YEAR
     ===================================================== */

  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =====================================================
     SCROLL PROGRESS
     ===================================================== */

  const progress = document.querySelector(".progress");

  function updateProgress() {

    const scrollTop = window.scrollY;

    const documentHeight =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const percentage =
      documentHeight > 0
        ? (scrollTop / documentHeight) * 100
        : 0;

    if (progress) {
      progress.style.width = `${percentage}%`;
    }
  }

  window.addEventListener("scroll", updateProgress);

  updateProgress();


  /* =====================================================
     REVEAL ANIMATION
     ===================================================== */

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }

      });

    },
    {
      threshold: 0.12
    }
  );

  reveals.forEach((element) => {
    revealObserver.observe(element);
  });


  /* =====================================================
     ACTIVE NAVIGATION
     ===================================================== */

  const sections =
    document.querySelectorAll("section[id]");

  const navLinks =
    document.querySelectorAll("nav a");

  const sectionObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            navLinks.forEach((link) => {
              link.classList.remove("active");
            });

            const activeLink =
              document.querySelector(
                `nav a[href="#${entry.target.id}"]`
              );

            if (activeLink) {
              activeLink.classList.add("active");
            }

          }

        });

      },
      {
        threshold: 0.45
      }
    );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });


  /* =====================================================
     SMOOTH SCROLL
     ===================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

      link.addEventListener("click", (event) => {

        const targetId =
          link.getAttribute("href");

        const target =
          document.querySelector(targetId);

        if (target) {

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }

      });

    });


  /* =====================================================
     HERO MOUSE PARALLAX
     ===================================================== */

  const hero =
    document.getElementById("home");

  const heroBackground =
    document.querySelector(".hero-bg");

  if (hero && heroBackground) {

    hero.addEventListener("mousemove", (event) => {

      const x =
        (event.clientX / window.innerWidth - 0.5) * 18;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      heroBackground.style.transform =
        `scale(1.08) translate(${x}px, ${y}px)`;

    });


    hero.addEventListener("mouseleave", () => {

      heroBackground.style.transform =
        "scale(1.08) translate(0, 0)";

    });

  }


  /* =====================================================
     THEME BUTTON
     ===================================================== */

  const themeButton =
    document.getElementById("themeBtn");

  if (themeButton) {

    themeButton.addEventListener("click", () => {

      document.body.classList.toggle("bright");

      if (
        document.body.classList.contains("bright")
      ) {

        themeButton.textContent = "☾";

      } else {

        themeButton.textContent = "☼";

      }

    });

  }


  /* =====================================================
     IMAGE FALLBACK
     ===================================================== */

  const profileImage =
    document.querySelector(
      '.portrait-frame img'
    );

  if (profileImage) {

    profileImage.addEventListener(
      "error",
      () => {

        profileImage.style.display = "none";

        const frame =
          profileImage.parentElement;

        if (frame) {

          frame.classList.add(
            "image-missing"
          );

          frame.innerHTML =
            `
              <div style="
                display:flex;
                width:100%;
                height:100%;
                align-items:center;
                justify-content:center;
                text-align:center;
                padding:30px;
                color:rgba(255,255,255,.6);
                font-size:13px;
              ">
                Add your photo here:<br>
                images/profile.png
              </div>
            `;

        }

      }
    );

  }

});
```
