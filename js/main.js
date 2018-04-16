$(function() {
	if ($(window).width() < 1140) {
		$('.js_tagsSlider').slick({
			infinite: false,
			variableWidth: true,
			swipeToSlide: true,
			arrows: false
		})
	}
})

function moveSlider(event, sliderId, multiplier) {
	var coordsX = event.pageX;
	sliderId = document.getElementById(sliderId);
	if(document.body.clientWidth >= 1140) {
		sliderId.style.marginLeft = '-' + coordsX / multiplier + 'px'
	}
}

document.onmousemove = function(event) {
	moveSlider(event, 'type', 2);
	moveSlider(event, 'company', 1);
}