$(function() {
	$(document).on('click', '.js_openNav', function() {
		$(this).toggleClass('header__hamburger_active');
		$('.js_nav').toggleClass('header__nav-mob_active');
	})
})