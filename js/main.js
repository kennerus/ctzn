$(function() {
	if ($(window).width() < 1440) {
		$('.js_tagsSlider').slick({
			infinite: false,
			variableWidth: true,
			swipeToSlide: true,
			arrows: false
		})
	}
})