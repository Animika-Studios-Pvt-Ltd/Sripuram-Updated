AOS.init();
($(window).scroll(function () {
  $(this).scrollTop() >= 50
    ? $("#return-to-top").fadeIn(200)
    : $("#return-to-top").fadeOut(200);
}),
  $("#return-to-top").click(function () {
    $("body,html").animate(
      {
        scrollTop: 0,
      },
      500,
    );
  }),
  $(document).ready(function () {
    $(".filter-button").click(function () {
      var e = $(this).attr("data-filter");
      "all" == e
        ? $(".filter").show("10000")
        : ($(".filter")
            .not("." + e)
            .hide("8000"),
          $(".filter")
            .filter("." + e)
            .show("10000"));
    });
  }),
  $(document).ready(function () {
    $("#thumbSlider .thumb").on("click", function () {
      ($(this).addClass("active"), $(this).siblings().removeClass("active"));
    });
  }),
  $(document).ready(function () {
    ($(".collapse.in").prev(".panel-heading").addClass("active"),
      $("#accordion, #bs-collapse")
        .on("show.bs.collapse", function (e) {
          $(e.target).prev(".panel-heading").addClass("active");
        })
        .on("hide.bs.collapse", function (e) {
          $(e.target).prev(".panel-heading").removeClass("active");
        }));
  }),
  $(".client-section").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    loop: 0,
    autoplay: !0,
    speed: 1500,
    autoplaySpeed: 5e3,
    arrows: !0,
    nextArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-right"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
    prevArrow:
      '<div class="slick-custom-arrow slick-custom-arrow-left"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: 0,
        },
      },
      {
        breakpoint: 699,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }));
$(".cwd-volumes-slider").slick({
  slidesToShow: 4,
  slidesToScroll: 1,
  loop: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  arrows: true,
  nextArrow:
    '<div class="slick-custom-arrow slick-custom-arrow-right"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
  prevArrow:
    '<div class="slick-custom-arrow slick-custom-arrow-left"><img src="/static/sripuram-org/arrow.webp" alt="Arrow" class="img-fluid"></div>',
  responsive: [
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});

var $cell = $(".card");
($cell.find(".js-expander").click(function () {
  var e = $(this).closest(".card");
  e.hasClass("is-collapsed")
    ? ($cell
        .not(e)
        .removeClass("is-expanded")
        .addClass("is-collapsed")
        .addClass("is-inactive"),
      e.removeClass("is-collapsed").addClass("is-expanded"),
      $cell.not(e).hasClass("is-inactive") ||
        $cell.not(e).addClass("is-inactive"))
    : (e.removeClass("is-expanded").addClass("is-collapsed"),
      $cell.not(e).removeClass("is-inactive"));
}),
  $cell.find(".js-collapser").click(function () {
    var e = $(this).closest(".card");
    (e.removeClass("is-expanded").addClass("is-collapsed"),
      $cell.not(e).removeClass("is-inactive"));
  }));

var $imagesSlider = $(".gallery-slider .gallery-slider__images>div"),
  $thumbnailsSlider = $(".gallery-slider__thumbnails>div");
($imagesSlider.slick({
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  cssEase: "linear",
  fade: !0,
  draggable: !1,
  asNavFor: ".gallery-slider__thumbnails>div",
  prevArrow: ".gallery-slider__images .prev-arrow",
  nextArrow: ".gallery-slider__images .next-arrow",
}),
  $thumbnailsSlider.slick({
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    cssEase: "linear",
    centerMode: !0,
    draggable: !1,
    focusOnSelect: !0,
    asNavFor: ".gallery-slider .gallery-slider__images>div",
    prevArrow: ".gallery-slider__thumbnails .prev-arrow",
    nextArrow: ".gallery-slider__thumbnails .next-arrow",
    responsive: [
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 350,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }));

var $caption = $(".gallery-slider .caption"),
  captionText = $(".gallery-slider__images .slick-current img").attr("alt");
function updateCaption(e) {
  ("" === e && (e = "&nbsp;"), $caption.html(e), $caption.removeClass("hide"));
}
(updateCaption(captionText),
  $imagesSlider.on("beforeChange", function (e, s, l, i) {
    $caption.addClass("hide");
  }),
  $imagesSlider.on("afterChange", function (e, s, l, i) {
    updateCaption(
      (captionText = $(".gallery-slider__images .slick-current img").attr(
        "alt",
      )),
    );
  }),
  $(".read-more").click(function () {
    ($(this).prev().slideToggle(),
      "View All" == $(this).text()
        ? $(this).text("View Less")
        : $(this).text("View All"));
  }));

// Dynamic Calendar Assets Injection
(function () {
  if (
    document.getElementById("niceZoomIn") ||
    document.querySelector(".client-section")
  ) {
    let basePath = "";
    const customScript = document.querySelector('script[src*="custom.js"]');
    if (customScript) {
      const src = customScript.getAttribute("src");
      const idx = src.indexOf("static/sripuram-org/custom.js");
      if (idx !== -1) {
        basePath = src.substring(0, idx);
      }
    }

    // Inject calender.css if not already present
    if (!document.querySelector('link[href*="calender.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = basePath + "static/sripuram-org/calender.css";
      document.head.appendChild(link);
    }

    // Inject calender.js if not already present
    if (!document.querySelector('script[src*="calender.js"]')) {
      const script = document.createElement("script");
      script.src = basePath + "static/sripuram-org/calender.js";
      document.body.appendChild(script);
    }
  }
})();