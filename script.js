javascript
// ========================================
// ComandoLusitano Portfolio
// JavaScript
// ========================================


// ---------- Navbar ao fazer scroll ----------

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(8, 8, 12, 0.95)";
    } else {
        navbar.style.background = "rgba(8, 8, 12, 0.75)";
    }

});


// ---------- Animação das secções ----------

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


sections.forEach((section) => {

    section.style.opacity = "0";
    section.style.transform = "translateY(25px)";
    section.style.transition = "opacity 0.7s ease, transform 0.7s ease";

    observer.observe(section);

});


// ---------- Smooth scroll ----------

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

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


// ---------- Ano automático no footer ----------

const footerText = document.querySelector("footer p");

if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        `© ${currentYear} ComandoLusitano. Todos os direitos reservados.`;

}