window.onload = function () {
  document.getElementById("popupOverlay").style.display = "flex";
};

function closePopup() {
  document.getElementById("popupOverlay").style.display = "none";
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