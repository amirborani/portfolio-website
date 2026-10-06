document.addEventListener("DOMContentLoaded", () => {

    document.body.classList.add("loading");

    const loader = document.querySelector(".page-loader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            loader.classList.add("hide");
            document.body.classList.remove("loading");

        }, 700);

    });


    /* =========================
       YEAR
    ========================= */

    const year = new Date().getFullYear();

    document.querySelectorAll(".copyright").forEach(el => {

        el.innerHTML =
            `© ${year} AMIR BORANI · DREAM · CREATE · INSPIRE`;

    });


    /* =========================
       CURSOR LIGHT
    ========================= */

    const cursor = document.querySelector(".cursor-glow");

    window.addEventListener("mousemove", e => {

        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;

    });


    /* =========================
       PARALLAX
    ========================= */

    const scenes = document.querySelectorAll(".scene-image");

    window.addEventListener("scroll", () => {

        const scrollY = window.scrollY;

        scenes.forEach(scene => {

            const section = scene.closest(".scene-section");

            if (!section) return;

            const rect = section.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {

                const movement =
                    (window.innerHeight / 2 - rect.top) * 0.035;

                scene.style.transform =
                    `scale(1.06) translateY(${movement}px)`;

            }

        });

    });


    /* =========================
       MOUSE PARALLAX
    ========================= */

    const hero = document.querySelector("#home");

    hero.addEventListener("mousemove", e => {

        const x =
            (e.clientX / window.innerWidth - .5) * 12;

        const y =
            (e.clientY / window.innerHeight - .5) * 8;

        const background =
            hero.querySelector(".scene-image");

        background.style.transform =
            `scale(1.06) translate(${x}px, ${y}px)`;

    });


    hero.addEventListener("mouseleave", () => {

        hero.querySelector(".scene-image").style.transform =
            "scale(1.06)";

    });


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll(".navbar nav a");

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        navLinks.forEach(link =>
                            link.classList.remove("active")
                        );

                        const active =
                            document.querySelector(
                                `.navbar nav a[href="#${entry.target.id}"]`
                            );

                        if (active) {
                            active.classList.add("active");
                        }

                    }

                });

            },
            {
                threshold: .35
            }
        );

    sections.forEach(section =>
        observer.observe(section)
    );


    /* =========================
       MOBILE MENU
    ========================= */

    const menuBtn =
        document.querySelector(".menu-btn");

    const nav =
        document.querySelector(".navbar nav");

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("mobile-open");

    });


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

        });

    });


    /* =========================
       CONTACT FORM
    ========================= */

    const form =
        document.querySelector(".contact-form");

    form.addEventListener("submit", e => {

        e.preventDefault();

        const button =
            form.querySelector("button");

        button.textContent =
            "MESSAGE READY ✓";

        setTimeout(() => {

            button.textContent =
                "SEND MESSAGE →";

        }, 2500);

    });

});
