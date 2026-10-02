/* =========================================================
   AMIR BORANI
   CINEMATIC PORTFOLIO
========================================================= */

"use strict";


/* =========================================================
   DOM ELEMENTS
========================================================= */

const loader = document.getElementById("loader");
const header = document.querySelector(".site-header");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const navLinks = document.querySelectorAll(".nav-link");
const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right"
);
const sections = document.querySelectorAll("section[id]");
const scrollProgress = document.getElementById("scrollProgress");
const heroBackground = document.querySelector(".hero-background");
const yearElement = document.getElementById("year");


/* =========================================================
   PAGE LOADER
========================================================= */

window.addEventListener("load", () => {

    window.setTimeout(() => {
        loader.classList.add("hidden");
    }, 700);

});


/* =========================================================
   CURRENT YEAR
========================================================= */

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}


/* =========================================================
   MOBILE NAVIGATION
========================================================= */

function toggleMenu() {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );

}


if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMenu
    );
}


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );

    });

});


/* =========================================================
   HEADER ON SCROLL
========================================================= */

function updateHeader() {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

function updateScrollProgress() {

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    if (documentHeight <= 0) {
        return;
    }

    const progress =
        (window.scrollY / documentHeight) * 100;

    scrollProgress.style.width = `${progress}%`;

}


window.addEventListener(
    "scroll",
    updateScrollProgress,
    { passive: true }
);


/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

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
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sectionObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) {
                return;
            }

            const currentId =
                entry.target.getAttribute("id");

            navLinks.forEach((link) => {

                const target =
                    link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    target === `#${currentId}`
                );

            });

        });

    },
    {
        threshold: 0.35
    }
);


sections.forEach((section) => {

    sectionObserver.observe(section);

});


/* =========================================================
   CINEMATIC HERO PARALLAX
========================================================= */

function updateHeroParallax() {

    if (!heroBackground) {
        return;
    }

    const heroHeight =
        window.innerHeight;

    if (window.scrollY > heroHeight) {
        return;
    }

    const movement =
        window.scrollY * 0.08;

    heroBackground.style.transform =
        `scale(1.05) translateY(${movement}px)`;

}


window.addEventListener(
    "scroll",
    updateHeroParallax,
    { passive: true }
);


/* =========================================================
   SMOOTH ANCHOR NAVIGATION
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerOffset = 70;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================================
   MOUSE MOVEMENT — DESKTOP CINEMATIC EFFECT
========================================================= */

const isTouchDevice =
    window.matchMedia(
        "(pointer: coarse)"
    ).matches;


if (!isTouchDevice) {

    document.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (event.clientX / window.innerWidth - 0.5);

            const y =
                (event.clientY / window.innerHeight - 0.5);

            const mountains =
                document.querySelectorAll(
                    ".hero-mountain"
                );

            mountains.forEach(
                (mountain, index) => {

                    const amount =
                        (index + 1) * 5;

                    mountain.style.transform =
                        `translate(
                            ${x * amount}px,
                            ${y * amount}px
                        )`;

                }
            );

        }
    );

}


/* =========================================================
   CONTACT LINK SAFETY
========================================================= */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach((link) => {

    link.setAttribute(
        "rel",
        "noopener noreferrer"
    );

});


/* =========================================================
   RESIZE HANDLING
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 760) {

            navigation.classList.remove(
                "open"
            );

            document.body.classList.remove(
                "menu-open"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

updateHeader();
updateScrollProgress();
updateHeroParallax();
