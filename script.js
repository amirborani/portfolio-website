/* =========================================================
   AMIR BORANI — PORTFOLIO ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       SMOOTH NAVIGATION
    ====================================================== */

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    links.forEach(link => {

        link.addEventListener("click", event => {

            const id =
                link.getAttribute("href");

            if (!id || id === "#") {
                return;
            }

            const target =
                document.querySelector(id);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       REVEAL ANIMATION
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
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

        revealObserver.observe(element);

    });


    /* =====================================================
       MOUSE PARALLAX
    ====================================================== */

    const isMobile =
        window.matchMedia(
            "(max-width: 800px)"
        ).matches;

    if (!isMobile) {

        const home =
            document.querySelector("#home");

        const sun =
            document.querySelector(".sun");

        const mountains =
            document.querySelectorAll(
                ".mountain"
            );

        const profile =
            document.querySelector(".profile-card");

        if (home) {

            home.addEventListener(
                "mousemove",
                event => {

                    const x =
                        event.clientX /
                        window.innerWidth -
                        0.5;

                    const y =
                        event.clientY /
                        window.innerHeight -
                        0.5;

                    if (sun) {

                        sun.style.transform =
                            `translate(
                                ${x * 25}px,
                                ${y * 25}px
                            )`;

                    }

                    mountains.forEach(
                        (mountain, index) => {

                            const power =
                                (index + 1) * 8;

                            mountain.style.transform =
                                `translateX(
                                    ${x * power}px
                                )`;

                        }
                    );

                    if (profile) {

                        profile.style.transform =
                            `translate(
                                ${x * -10}px,
                                ${y * -10}px
                            )`;

                    }

                }
            );

        }

    }


    /* =====================================================
       CARD TILT
    ====================================================== */

    if (!isMobile) {

        const cards =
            document.querySelectorAll(
                ".project-card, .skill-card, .social-card"
            );

        cards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left;

                    const y =
                        event.clientY -
                        rect.top;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 8;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -8;

                    card.style.transform =
                        `perspective(700px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-8px)`;

                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }


    /* =====================================================
       ACTIVE NAV
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            ".nav-links a"
        );

    const activeObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const current =
                        entry.target.id;

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                        if (
                            link.getAttribute("href") ===
                            `#${current}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                threshold: 0.45
            }
        );

    sections.forEach(section => {

        activeObserver.observe(section);

    });


    /* =====================================================
       NAV ACTIVE STYLE
    ====================================================== */

    const style =
        document.createElement("style");

    style.innerHTML = `

        .nav-links a.active {
            color: #ffd166;
            text-shadow:
                0 0 15px rgba(255,209,102,.6);
        }

    `;

    document.head.appendChild(style);


    /* =====================================================
       CONSOLE
    ====================================================== */

    console.log(
        "AMIR BORANI — Cinematic Portfolio Loaded"
    );

});
