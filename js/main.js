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

document.onmousemove = function(event) {
	var coordsX = event.pageX;
	var sliders = document.getElementsByClassName('js_tagsSlider');

	for (var i = 0; i < sliders.length; i++) {
		sliders[i].style.marginLeft = '-' + coordsX / 2 + 'px'
	}
}