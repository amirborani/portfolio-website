document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CURRENT YEAR
    ========================= */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =========================
       NAVBAR SCROLL EFFECT
    ========================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(5, 12, 9, 0.72)";

        } else {

            navbar.style.background =
                "rgba(5, 12, 9, 0.25)";

        }

    });


    /* =========================
       SMOOTH NAVIGATION
    ========================= */

    const navigationLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    navigationLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================
       REVEAL ANIMATION
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-card, .skill, .profile-card"
        );

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        observer.observe(element);

    });


    /* =========================
       MOUSE PARALLAX
    ========================= */

    const background =
        document.querySelector(
            ".background-image"
        );

    document.addEventListener(
        "mousemove",
        event => {

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) * 10;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) * 10;

            if (background) {

                background.style.transform =
                    `scale(1.08)
                     translate(${x}px, ${y}px)`;

            }

        }
    );

});
