$(function() {
	$(document).on('click', '.js_slideText', function() {
		$('.hidden').removeClass('hidden').css('max-height', '9999px').addClass('js_activeText');
		$('.hidden_flex').removeClass('hidden_flex').css('max-height', '9999px').addClass('js_activeFlex');
		$('.js_hideText').css('display', 'flex');
		$(this).hide(0).addClass('hidden_flex');
		$('.js_container').addClass('container_row').removeClass('container_wrap');
		if($(window).width() > 1440) {
			getButtonPos();
		}
	});

	$(document).on('click', '.js_hideText', function() {
		$('.js_slideText').show(0).removeClass('hidden_flex').css('display', 'flex');
		$('.js_hideText').css('display', 'none');
		$('.js_activeText').css('max-height', '0').removeClass('js_activeText').addClass('hidden');
		$('.js_activeFlex').css('max-height', '0').removeClass('js_activeFlex').addClass('hidden_flex');
		$('.js_container').removeClass('container_row').addClass('container_wrap');
	});
	
	$(window).resize(function(event) {
		if($(window).width() > 1440) {
			getButtonPos();
		}
	});
})