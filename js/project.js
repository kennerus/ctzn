$(function() {
	$(document).on('click', '.js_slideText', function() {
		$('.hidden').show(0).removeClass('hidden').addClass('js_activeText');
		$('.hidden_flex').show(0).css('display', 'flex').removeClass('hidden_flex').addClass('js_activeFlex');
		$(this).addClass('hidden_flex');
		$('.js_container').addClass('container_row').removeClass('container_column');
	});

	$(document).on('click', '.js_hideText', function() {
		$('.js_slideText').show(0).removeClass('hidden_flex').css('display', 'flex');
		$('.js_activeText').hide(0).removeClass('js_activeText').addClass('hidden');
		$('.js_activeFlex').hide(0).removeClass('js_activeFlex').addClass('hidden_flex');
		$('.js_container').removeClass('container_row').addClass('container_column');
	})
})