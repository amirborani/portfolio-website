/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        document
            .getElementById("loader")
            .classList.add("hide");

    }, 1200);

});



/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".navbar nav");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

    });

}


document.querySelectorAll(".navbar nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav.classList.remove("open");

    });

});



/* =========================================================
   CUSTOM CURSOR
========================================================= */

const cursor = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let cursorX = mouseX;
let cursorY = mouseY;


window.addEventListener("mousemove", (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


function animateCursor() {

    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;

    if (cursor) {

        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

    }

    if (cursorDot) {

        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";

    }

    requestAnimationFrame(animateCursor);

}

animateCursor();



/* =========================================================
   CURSOR HOVER
========================================================= */

document.querySelectorAll(
    "a, button, .project-card, .skill-card"
).forEach(element => {

    element.addEventListener("mouseenter", () => {

        document.body.classList.add("cursor-hover");

    });

    element.addEventListener("mouseleave", () => {

        document.body.classList.remove("cursor-hover");

    });

});



/* =========================================================
   MOUSE PARALLAX
========================================================= */

const parallaxElements =
    document.querySelectorAll(".parallax");

let targetX = 0;
let targetY = 0;

let currentX = 0;
let currentY = 0;


window.addEventListener("mousemove", (e) => {

    targetX =
        (e.clientX / window.innerWidth - 0.5) * 2;

    targetY =
        (e.clientY / window.innerHeight - 0.5) * 2;

});


function parallaxAnimation() {

    currentX +=
        (targetX - currentX) * 0.04;

    currentY +=
        (targetY - currentY) * 0.04;


    parallaxElements.forEach(element => {

        const speed =
            parseFloat(
                element.dataset.speed || 0.2
            );

        const x =
            currentX * speed * 45;

        const y =
            currentY * speed * 30;


        element.style.transform =
            `translate3d(${x}px, ${y}px, 0)`;

    });


    requestAnimationFrame(parallaxAnimation);

}

parallaxAnimation();



/* =========================================================
   SCROLL PARALLAX
========================================================= */

const scrollLayers =
    document.querySelectorAll(
        ".hero-bg, .hero-mountains, .hero-person, .hero-animal, .hero-car"
    );


function scrollParallax() {

    const scrollY = window.scrollY;

    scrollLayers.forEach((layer, index) => {

        const speed =
            [0.08, 0.12, 0.18, 0.15, 0.10][index] || 0.1;

        layer.style.marginTop =
            `${scrollY * speed}px`;

    });

}

window.addEventListener(
    "scroll",
    scrollParallax,
    { passive: true }
);



/* =========================================================
   REVEAL ON SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(".reveal");


const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(element => {

    observer.observe(element);

});



/* =========================================================
   PROJECT CARD 3D TILT
========================================================= */

const cards =
    document.querySelectorAll(".project-card");


cards.forEach(card => {

    card.addEventListener("mousemove", (e) => {

        if (window.innerWidth < 750) return;


        const rect =
            card.getBoundingClientRect();


        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;


        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;


        const rotateX =
            ((y - centerY) / centerY) * -3;

        const rotateY =
            ((x - centerX) / centerX) * 3;


        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-8px)`;

    });


    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "";

    });

});



/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".navbar nav a");


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 200;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.style.color = "";

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.style.color =
                    "#f4d77c";

            }

        });

    },
    { passive: true }
);



/* =========================================================
   GOLD GLOW MOVEMENT
========================================================= */

const hero =
    document.querySelector(".hero");


if (hero) {

    hero.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth) * 100;

        const y =
            (e.clientY / window.innerHeight) * 100;


        hero.style.setProperty(
            "--mouse-x",
            `${x}%`
        );

        hero.style.setProperty(
            "--mouse-y",
            `${y}%`
        );

    });

}
