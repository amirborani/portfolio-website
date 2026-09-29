/* =========================================
   AMIR BORANI PORTFOLIO
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Amir Borani Portfolio Loaded");

    /* =====================================
       SMOOTH NAVIGATION
    ===================================== */

    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================
       SCROLL REVEAL
    ===================================== */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    sections.forEach(section => {
        observer.observe(section);
    });


    /* =====================================
       CURRENT YEAR
    ===================================== */

    const year = new Date().getFullYear();

    const footer = document.querySelector("footer");

    if (footer) {

        const yearText = footer.querySelector("p");

        if (yearText) {
            yearText.textContent =
                `© ${year} Amir Borani. All Rights Reserved.`;
        }

    }

});
