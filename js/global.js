$(function() {
	$(document).on('click', '.js_openNav', function() {
		$(this).toggleClass('header__hamburger_active');
		$('.js_nav').toggleClass('header__nav-mob_active');
	})
})

var flag = true;
$(document).scroll(function() {
	if($(document).scrollTop() >= 300 && flag) {
		flag = false;
		$('.js_header').addClass('header_border');
	}

	if($(document).scrollTop() < 300 && flag == false) {
		flag = true;
		$('.js_header').removeClass('header_border');
	}
})