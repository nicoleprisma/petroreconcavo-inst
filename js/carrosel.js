var swiper = new Swiper(".swiper-ativos", {
  spaceBetween: 25,
  slidesPerView: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".swiper-iniciativas", {
  spaceBetween: 25,
  slidesPerView: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

if (window.matchMedia("(max-width: 992px)").matches) {
  var swiper = new Swiper(".swiper-sondas", {
    spaceBetween: 25,
    slidesPerView: "auto",

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

$(document).ready(function () {
  if (window.matchMedia("(max-width: 992px)").matches) {
    $(".box-noticias").slick({
      slidesToShow: 2,
      slidesToScroll: 1,
      infinite: false,
      arrows: false,
      dots: true,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    });
  }
});
