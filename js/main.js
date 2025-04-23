function debounce(callback, delay) {
  let timer;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
      timer = null;
    }, delay);
  };
}

$(".titulosCentral").each(function () {
  $("#resultsTitle").append($(this));
});

document.addEventListener("DOMContentLoaded", function () {
  const isMobile = () => window.innerWidth <= 1200;
  const accordionItems = document.querySelectorAll(".mobile-accordion-item");


  function closeAccordionItem(button, content) {
    button.setAttribute("aria-expanded", "false");
    content.style.height = `${content.scrollHeight}px`;

    requestAnimationFrame(() => {
      content.style.height = "0px";
      content.classList.remove("show");
    });
  }

  function openAccordionItem(button, content) {
    content.classList.add("show");
    button.setAttribute("aria-expanded", "true");
    content.style.height = `${content.scrollHeight}px`;
  }

  function handleAccordionClick(e, item) {
    if (!isMobile()) return;

    e.preventDefault();
    e.stopPropagation();

    const button = item.querySelector(".mobile-accordion-button");
    const content = item.querySelector(".mobile-accordion-content");
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        const otherButton = otherItem.querySelector(".mobile-accordion-button");
        const otherContent = otherItem.querySelector(
          ".mobile-accordion-content"
        );
        if (otherButton.getAttribute("aria-expanded") === "true") {
          closeAccordionItem(otherButton, otherContent);
        }
      }
    });

    if (isExpanded) {
      closeAccordionItem(button, content);
    } else {
      openAccordionItem(button, content);
    }
  }

  function setupMobileAccordion() {
    accordionItems.forEach((item) => {
      const button = item.querySelector(".mobile-accordion-button");

      if (isMobile()) {
        button.removeAttribute("data-bs-toggle");
      } else {
        button.setAttribute("data-bs-toggle", "dropdown");
      }

      const newButton = button.cloneNode(true);
      button.parentNode.replaceChild(newButton, button);

      newButton.addEventListener("click", (e) => handleAccordionClick(e, item));
    });
  }

  setupMobileAccordion();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(setupMobileAccordion, 250);
  });
});

const firstElements = document.querySelectorAll("[data-anima]");
if (firstElements) {
  firstElements.forEach((item) => {
    let delay = item.getAttribute("data-anima-delay");
    setTimeout(
      () => {
        item.classList.add("active");
      },
      delay ? 500 + +delay : 500
    );
  });
}

const line = document.querySelector(".timeline-line");
const dots = document.querySelectorAll(".timeline-item");

window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY + window.innerHeight / 2;
  const timelineTop = document.querySelector(".timeline").offsetTop;

  const height = scrollTop - timelineTop;
  line.style.height = height + "px";

  dots.forEach((dot) => {
    const dotTop = dot.getBoundingClientRect().top + window.scrollY;
    if (scrollTop >= dotTop) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
});

const myCarousel = document.getElementById("BannerCarrousel");
if (myCarousel) {
  myCarousel.addEventListener("slide.bs.carousel", (event) => {
    document
      .querySelectorAll("[data-anima]")
      .forEach((e) => e.classList.remove("active"));
    const elements = event.relatedTarget.querySelectorAll("[data-anima]");
    elements.forEach((item) => {
      let delay = item.getAttribute("data-anima-delay");
      setTimeout(
        () => {
          item.classList.add("active");
        },
        delay ? 500 + +delay : 500
      );
    });
  });
}

// opens and closes the search box.
$(".open-searchbox, .close-searchbox").click(function () {
  $(".searchbox").toggleClass("active");
  $("body").toggleClass("open-menu");
});

// manages the status of the mobile menu.

$(".btn-open-menu").click(function () {
  $(".canais-menu").toggleClass("active");
  $(".header").toggleClass("open-menu");
  $("body").toggleClass("open-menu");
});

$(".button-mapa-site").click((e) => {
  $(".button-mapa-site").toggleClass("active");
});

// Animações para aparecer o elemento
AOS.init({
  once: true,
});

window.addEventListener(
  "scroll",
  debounce(() => {
    AOS.refresh();
  }, 200)
);

// Tooltip

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

//

document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".item[id]");
  const sidebarItems = document.querySelectorAll(".sidebar li");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          sidebarItems.forEach((item) => {
            item.classList.remove("active");

            if (item.dataset.target === id) {
              item.classList.add("active");
            }
          });
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 1,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
});

//

// Contraste

function accessApplyTheme(theme) {
  localStorage.setItem("access_theme", theme);

  if (theme == "dark") {
    $("body").attr("data-theme", "dark");
  } else {
    $("body").attr("data-theme", "light");
  }
}

var access_theme = "light";

if (localStorage.getItem("access_theme")) {
  access_theme = localStorage.getItem("access_theme");
  accessApplyTheme(access_theme);
}

$("#contrast-toggle").on("click", function (e) {
  if (access_theme == "light") {
    access_theme = "dark";
  } else {
    access_theme = "light";
  }
  accessApplyTheme(access_theme);
});

if (window.counterUp) {
  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 1500,
          delay: 5,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  const el = document.querySelectorAll(".counter");

  if (el) {
    el.forEach((item) => {
      IO.observe(item);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const imagens = document.querySelectorAll(".imagens img");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const targetImageId = this.getAttribute("data-image");

      imagens.forEach((img) => {
        img.classList.toggle(
          "active",
          img.getAttribute("data-image-id") === targetImageId
        );
      });
    });
  });
});

const itensEndereco = document.querySelectorAll(".item-endereco");
const iframes = document.querySelectorAll(".mapas iframe");

itensEndereco.forEach((item) => {
  item.addEventListener("click", () => {
    itensEndereco.forEach((i) => i.classList.remove("active"));
    iframes.forEach((f) => f.classList.remove("active"));

    item.classList.add("active");
    const mapId = item.getAttribute("data-map");
    document.getElementById(mapId).classList.add("active");
  });
});
