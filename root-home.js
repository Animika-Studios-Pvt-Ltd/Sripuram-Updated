window.addEventListener("load", function () {
  const popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "flex";
  }
  if (typeof AOS !== "undefined") {
    AOS.refresh();
  }
});

function closePopup() {
  const popup = document.getElementById("popupOverlay");
  if (popup) {
    popup.style.display = "none";
  }
}

/* World Leaders at Sripuram Carousel */
$('.gallery-slider__images').on('afterChange', function (event, slick, currentSlide) {
  $('.slick-slide').each(function () {
    if ($(this).attr('aria-hidden') === 'true') {
      $(this).find('a, button, input, textarea, select')
        .attr('tabindex', '-1');
    }
  });
});