

/* World Leaders at Sripuram Carousel */
$('.gallery-slider__images').on('afterChange', function (event, slick, currentSlide) {
  $('.slick-slide').each(function () {
    if ($(this).attr('aria-hidden') === 'true') {
      $(this).find('a, button, input, textarea, select')
        .attr('tabindex', '-1');
    }
  });
});