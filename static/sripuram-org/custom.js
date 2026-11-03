/* ------------------------------- 1. AOS (ANIMATE ON SCROLL) INITIALIZATION ------------------------------- */
// Initialize AOS safely and setup event listeners for DOM ready, window load, and resize
function safeInitAOS() {
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
      disableMutationObserver: false,
    });
    AOS.refresh();
  }
}

$(document).ready(function () {
  safeInitAOS();
});

$(window).on("load", function () {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

$(window).on("resize", function () {
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

/* ------------------------------- 2. SCROLL TO TOP BUTTON (#return-to-top) ------------------------------- */
$(window).on("scroll", function () {
  if ($(this).scrollTop() >= $(document).height() / 2) {
    $("#return-to-top").fadeIn(200);
  } else {
    $("#return-to-top").fadeOut(200);
  }
});

$(document).ready(function () {
  // Ensure return-to-top arrow image uses the dedicated icon
  $("#return-to-top img").each(function () {
    var src = $(this).attr("src");
    if (src) {
      $(this).attr(
        "src",
        src.replace("arrow.webp", "return-to-top-arrow.webp"),
      );
    }
  });

  // Smooth scroll to top on click
  $("#return-to-top").on("click", function (e) {
    e.preventDefault();
    $("body, html").animate({ scrollTop: 0 }, 500);
  });
});

/* ------------------------------- 3. DISTINGUISHED GUESTS GALLERY SLIDER (HOMEPAGE SLICK CAROUSEL) ------------------------------- */
// Helper to remove focusable descendants from aria-hidden slides & submenus
function fixSlickAriaFocus() {
  if (typeof $ === "undefined") return;
  $(".slick-slide[aria-hidden='true']").each(function () {
    $(this).attr("tabindex", "-1");
    $(this)
      .find("a, button, input, select, textarea, [tabindex]")
      .attr("tabindex", "-1");
  });
  $(".slick-slide[aria-hidden='false']").each(function () {
    $(this).removeAttr("tabindex");
    $(this).find("a, button, input, select, textarea").removeAttr("tabindex");
  });
  $("[aria-hidden='true']").each(function () {
    $(this).find("a, button, input, select, textarea").attr("tabindex", "-1");
  });
}

$(document).on(
  "init reInit afterChange setPosition breakpoint",
  ".slick-slider",
  function () {
    fixSlickAriaFocus();
  },
);

$(document).ready(function () {
  fixSlickAriaFocus();
  setTimeout(fixSlickAriaFocus, 300);
  setTimeout(fixSlickAriaFocus, 1000);

  // Initialize Gallery Slider only if the section exists on page and Slick library is available
  if ($(".gallery-slider").length && typeof $.fn.slick === "function") {
    var $imagesSlider = $(".gallery-slider .gallery-slider__images>div");
    var $thumbnailsSlider = $(".gallery-slider__thumbnails>div");
    var $caption = $(".gallery-slider .caption");

    function updateCaption(caption) {
      if (!caption) caption = "&nbsp;";
      $caption.html(caption).removeClass("hide");
    }

    $imagesSlider.slick({
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: "linear",
      fade: true,
      draggable: false,
      asNavFor: ".gallery-slider__thumbnails>div",
      prevArrow: ".gallery-slider__images .prev-arrow",
      nextArrow: ".gallery-slider__images .next-arrow",
    });

    $thumbnailsSlider.slick({
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      cssEase: "linear",
      centerMode: true,
      draggable: false,
      focusOnSelect: true,
      asNavFor: ".gallery-slider .gallery-slider__images>div",
      prevArrow: ".gallery-slider__thumbnails .prev-arrow",
      nextArrow: ".gallery-slider__thumbnails .next-arrow",
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    });

    var captionText = $(".gallery-slider__images .slick-current img").attr(
      "alt",
    );
    updateCaption(captionText);

    $imagesSlider.on("beforeChange", function (e, s, currentSlide, nextSlide) {
      $caption.addClass("hide");
      if (s && s.$slides && s.$slides[nextSlide]) {
        $(s.$slides[nextSlide])
          .find("img[data-src]")
          .each(function () {
            this.src = this.dataset.src;
            $(this).removeAttr("data-src");
          });
      }
    });

    $imagesSlider.on("afterChange", function () {
      var currentCaption = $(".gallery-slider__images .slick-current img").attr(
        "alt",
      );
      updateCaption(currentCaption);
      fixSlickAriaFocus();
    });
  }
});

/* ------------------------------- 4. PROGRESSIVE IMAGE BATCH LOADER (GALLERY SLIDER) ------------------------------- */
function processGalleryImageBatches() {
  var lazyImages = Array.from(
    document.querySelectorAll(".gallery-slider img[data-src]"),
  );
  if (!lazyImages.length) return;

  var batchSize = 6;
  var delay = 250;

  function processBatch(index) {
    if (index >= lazyImages.length) return;
    var batch = lazyImages.slice(index, index + batchSize);
    batch.forEach(function (img) {
      if (img.dataset.src) {
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
      }
    });
    setTimeout(function () {
      processBatch(index + batchSize);
    }, delay);
  }

  processBatch(0);
}

$(window).on("load", function () {
  setTimeout(processGalleryImageBatches, 300);
});