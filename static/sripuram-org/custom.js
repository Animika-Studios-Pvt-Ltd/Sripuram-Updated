/* --------------------------------- 1. NAVBAR & SIDE DRAWER NAVIGATION --------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  // Helper function to sync tabindex for aria-hidden containers (SmartMenus & Side Drawer)
  function syncAriaHiddenFocusableElements() {
    // 1. SmartMenus submenus
    if (typeof $ !== "undefined") {
      $(
        ".sm ul[aria-hidden='true'], .sm-blue ul[aria-hidden='true'], ul[role='group'][aria-hidden='true']",
      ).each(function () {
        $(this)
          .find("a, button, input, select, textarea, [tabindex]")
          .attr("tabindex", "-1");
      });
      $(
        ".sm ul[aria-hidden='false'], .sm-blue ul[aria-hidden='false'], ul[role='group'][aria-hidden='false']",
      ).each(function () {
        $(this)
          .find("a, button, input, select, textarea")
          .removeAttr("tabindex");
      });
    } else {
      document
        .querySelectorAll("ul[aria-hidden='true']")
        .forEach(function (ul) {
          ul.querySelectorAll(
            "a, button, input, select, textarea, [tabindex]",
          ).forEach(function (el) {
            el.setAttribute("tabindex", "-1");
          });
        });
    }

    // 2. Side Drawer sublists
    document.querySelectorAll(".sn-sub-list").forEach(function (subList) {
      var isOpen = subList.classList.contains("sn-open");
      subList.setAttribute("aria-hidden", isOpen ? "false" : "true");
      subList
        .querySelectorAll("a, button, input, select, textarea")
        .forEach(function (el) {
          if (isOpen) {
            el.removeAttribute("tabindex");
          } else {
            el.setAttribute("tabindex", "-1");
          }
        });
    });
  }

  // Initialize SmartMenus on horizontal header
  if (typeof $ !== "undefined" && $.fn.smartmenus) {
    var $mainMenu = $("#main-menu");
    $mainMenu.smartmenus();

    // Event handlers when submenus are shown or hidden by SmartMenus
    $(document).on("show.smapi", function (e, menu) {
      if (menu) {
        $(menu).attr("aria-hidden", "false");
        $(menu)
          .find("a, button, input, select, textarea")
          .removeAttr("tabindex");
      }
    });

    $(document).on("hide.smapi", function (e, menu) {
      if (menu) {
        $(menu).attr("aria-hidden", "true");
        $(menu)
          .find("a, button, input, select, textarea")
          .attr("tabindex", "-1");
      }
    });
  }

  // Hold dropdown open when "Sripuram" header item is clicked
  var sripuramParent = document.querySelector(".sn-mega-menu-parent");
  if (sripuramParent) {
    var sripuramLink = sripuramParent.querySelector("a");
    if (sripuramLink) {
      sripuramLink.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        sripuramParent.classList.toggle("sn-mega-menu-locked");
      });
    }
  }

  // Close dropdown if clicked elsewhere on the page
  document.addEventListener("click", function (e) {
    if (sripuramParent && !sripuramParent.contains(e.target)) {
      sripuramParent.classList.remove("sn-mega-menu-locked");
    }
  });

  // Close dropdown when scrolling the page
  window.addEventListener(
    "scroll",
    function () {
      if (
        sripuramParent &&
        sripuramParent.classList.contains("sn-mega-menu-locked")
      ) {
        sripuramParent.classList.remove("sn-mega-menu-locked");
      }
    },
    { passive: true },
  );

  var openBtn = document.getElementById("sn-open-btn");
  var closeBtn = document.getElementById("sn-close-btn");
  var drawer = document.getElementById("sn-drawer");
  var backdrop = document.getElementById("sn-backdrop");
  var accordions = document.querySelectorAll(".sn-accordion-btn");

  function openDrawer() {
    document.body.classList.add("sn-open");
    if (openBtn) openBtn.setAttribute("aria-expanded", "true");
  }

  function closeDrawer() {
    document.body.classList.remove("sn-open");
    if (openBtn) openBtn.setAttribute("aria-expanded", "false");
  }

  if (openBtn && closeBtn && drawer && backdrop) {
    openBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      openDrawer();
    });
    closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);

    // Close drawer if user clicks anywhere outside of the drawer and open button
    document.addEventListener("click", function (e) {
      if (document.body.classList.contains("sn-open")) {
        if (!drawer.contains(e.target) && !openBtn.contains(e.target)) {
          closeDrawer();
        }
      }
    });

    // Close drawer if user scrolls the page
    window.addEventListener(
      "scroll",
      function () {
        if (document.body.classList.contains("sn-open")) {
          closeDrawer();
        }
      },
      { passive: true },
    );
  }

  // Accordion Logic & Tabindex Accessibility Helper
  function syncSubListAccessibility(subList, isOpen) {
    if (!subList) return;
    subList.setAttribute("aria-hidden", isOpen ? "false" : "true");
    var focusables = subList.querySelectorAll(
      "a, button, input, select, textarea",
    );
    focusables.forEach(function (el) {
      if (isOpen) {
        el.removeAttribute("tabindex");
      } else {
        el.setAttribute("tabindex", "-1");
      }
    });
  }

  // Initial pass on side drawer sublists and SmartMenus
  syncAriaHiddenFocusableElements();
  setTimeout(syncAriaHiddenFocusableElements, 100);
  setTimeout(syncAriaHiddenFocusableElements, 500);

  accordions.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var isExpanded = this.getAttribute("aria-expanded") === "true";
      var subList = this.nextElementSibling;

      // Close all others first
      accordions.forEach(function (otherBtn) {
        if (otherBtn !== btn && otherBtn.nextElementSibling) {
          otherBtn.setAttribute("aria-expanded", "false");
          otherBtn.nextElementSibling.classList.remove("sn-open");
          syncSubListAccessibility(otherBtn.nextElementSibling, false);
        }
      });

      // Toggle current
      this.setAttribute("aria-expanded", !isExpanded);
      if (!isExpanded && subList) {
        subList.classList.add("sn-open");
        syncSubListAccessibility(subList, true);
      } else if (subList) {
        subList.classList.remove("sn-open");
        syncSubListAccessibility(subList, false);
      }
    });
  });
});

/* --------------------------------- 2. AOS (ANIMATE ON SCROLL) INITIALIZATION --------------------------------- */
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

/* --------------------------------- 3. DISTINGUISHED GUESTS GALLERY SLIDER (HOMEPAGE SLICK CAROUSEL) --------------------------------- */
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
  if ($(".distinguished-guests-slider").length && typeof $.fn.slick === "function") {
    var $imagesSlider = $(".distinguished-guests-images > div");
    var $thumbnailsSlider = $(".distinguished-guests-thumbnails > div");
    var $caption = $(".distinguished-guests-slider .caption");

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
      asNavFor: ".distinguished-guests-thumbnails > div",
      prevArrow: ".distinguished-guests-images .distinguished-guests-prev-arrow",
      nextArrow: ".distinguished-guests-images .distinguished-guests-next-arrow",
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
      asNavFor: ".distinguished-guests-images > div",
      prevArrow: ".distinguished-guests-thumbnails .distinguished-guests-prev-arrow",
      nextArrow: ".distinguished-guests-thumbnails .distinguished-guests-next-arrow",
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

    var captionText = $(".distinguished-guests-images .slick-current img").attr(
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
      var currentCaption = $(".distinguished-guests-images .slick-current img").attr(
        "alt",
      );
      updateCaption(currentCaption);
      fixSlickAriaFocus();
    });
  }
});

/* --------------------------------- 4. PROGRESSIVE IMAGE BATCH LOADER (GALLERY SLIDER) --------------------------------- */
function processGalleryImageBatches() {
  var lazyImages = Array.from(
    document.querySelectorAll(".distinguished-guests-slider img[data-src]"),
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

/* --------------------------------- 5. SCROLL TO TOP BUTTON (#return-to-top) --------------------------------- */
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

/* --------------------------------- 6. HOMEPAGE POPUP MODAL (#popupOverlay) --------------------------------- */
window.addEventListener("load", function () {
  var popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "flex";
  }
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

function closePopup() {
  var popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "none";
  }
}
window.closePopup = closePopup;