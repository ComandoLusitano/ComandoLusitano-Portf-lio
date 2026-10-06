// ========================================
// ComandoLusitano Portfolio
// JavaScript
// ========================================


// ---------- Navbar ao fazer scroll ----------

const navbar = document.querySelector(".navbar");

if (navbar) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {

            navbar.style.background =
                "rgba(8, 8, 12, 0.95)";

        } else {

            navbar.style.background =
                "rgba(8, 8, 12, 0.75)";

        }

    });

}


// ---------- Animação das secções ----------

const sections =
    document.querySelectorAll("section");

if (sections.length > 0) {

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },

            {
                threshold: 0.1
            }

        );


    sections.forEach((section) => {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(25px)";

        section.style.transition =
            "opacity 0.7s ease, transform 0.7s ease";

        observer.observe(section);

    });

}


// ---------- Smooth scroll ----------

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                if (targetId === "#") {
                    return;
                }


                const target =
                    document.querySelector(targetId);


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });


// ---------- Abrir / Fechar projeto ----------

function toggleProject(button) {

    const projectCard =
        button.closest(".project-card");

    const projectDetails =
        projectCard.querySelector(
            ".project-details"
        );


    if (
        projectDetails.style.display ===
        "block"
    ) {

        projectDetails.style.display =
            "none";

        button.textContent =
            "Ver projeto →";

    } else {

        projectDetails.style.display =
            "block";

        button.textContent =
            "Fechar ↑";

    }

}


// ---------- Ano automático no footer ----------

const footerText =
    document.querySelector("footer p");


if (footerText) {

    const currentYear =
        new Date().getFullYear();


    footerText.innerHTML =
        `© ${currentYear} ComandoLusitano. Todos os direitos reservados.`;

}