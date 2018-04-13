$(function() {
	$('.js_tagsSlider').slick({
		infinite: false,
		variableWidth: true,
		swipeToSlide: true,
		responsive: [
			{
				breakpoint: 1440,
				settings: {
					arrows: false
				}
			}
		]
	})
})