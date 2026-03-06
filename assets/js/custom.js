document.addEventListener("DOMContentLoaded", function () {
  /* =========================================
     TABS DE LAS CARDS DE PROYECTOS
  ========================================= */
  const cards = document.querySelectorAll(".project-tab-card");

  cards.forEach((card) => {
    const buttons = card.querySelectorAll(".project-card-buttons button");
    const sections = card.querySelectorAll(".project-card-section");

    buttons.forEach((button) => {
      button.addEventListener("click", function () {
        const targetSection = button.getAttribute("data-section");
        const target = card.querySelector(targetSection);

        if (!target) return;

        sections.forEach((section) => {
          section.classList.remove("is-active");
        });

        buttons.forEach((btn) => {
          btn.classList.remove("is-active");
        });

        target.classList.add("is-active");
        button.classList.add("is-active");

        if (targetSection.includes("#project")) {
          card.classList.remove("is-active");
        } else {
          card.classList.add("is-active");
        }
      });
    });
  });

  /* =========================================
     REVEAL ON SCROLL
  ========================================= */
  const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  /* =========================================
     HEADER DINAMICO
  ========================================= */
  const header = document.getElementById("header");

  function updateHeaderState() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState);

  /* =========================================
     NAV ACTIVO SEGUN SECCION
  ========================================= */
  const navLinks = document.querySelectorAll('#header .nav-min a[href^="#"]');
  const sections = [];

  navLinks.forEach((link) => {
    const id = link.getAttribute("href");
    const section = document.querySelector(id);

    if (section) {
      sections.push({
        id,
        link,
        section
      });
    }
  });

  function updateActiveNav() {
    const scrollPosition = window.scrollY + 140;

    let current = null;

    sections.forEach((item) => {
      const top = item.section.offsetTop;
      const height = item.section.offsetHeight;

      if (scrollPosition >= top && scrollPosition < top + height) {
        current = item;
      }
    });

    navLinks.forEach((link) => link.classList.remove("is-current"));

    if (current) {
      current.link.classList.add("is-current");
    }
  }

  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav);
});