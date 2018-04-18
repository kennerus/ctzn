$(function() {
	function getButtonPos() {
		var hideText = $('.js_hideText');
		var hideTextPos = (($(window).width() - 1440) / 2) + 'px';
		hideText.css('right', hideTextPos);
	}
	$(document).on('click', '.js_slideText', function() {
		$('.hidden').show(0).removeClass('hidden').addClass('js_activeText');
		$('.hidden_flex').show(0).css('display', 'flex').removeClass('hidden_flex').addClass('js_activeFlex');
		$(this).addClass('hidden_flex');
		$('.js_container').addClass('container_row').removeClass('container_column');
		if($(window).width() > 1440) {
			getButtonPos();
		}
	});

	$(document).on('click', '.js_hideText', function() {
		$('.js_slideText').show(0).removeClass('hidden_flex').css('display', 'flex');
		$('.js_activeText').hide(0).removeClass('js_activeText').addClass('hidden');
		$('.js_activeFlex').hide(0).removeClass('js_activeFlex').addClass('hidden_flex');
		$('.js_container').removeClass('container_row').addClass('container_column');
	});

	$(window).scroll(function(event) {
		var btnClose = $('.js_hideText');
		var mainPos = $('.main__picture').offset();
		// var btnClosePos = btnClose.offset();
		// var btnClosePosBot = btnClosePos.top + btnClose.height();
		console.log($(window).scrollTop())
		console.log(mainPos.top)
		if(mainPos.top <= $(window).scrollTop()) {
			btnClose.css({
				position: 'absolute',
				top: $(window).scrollTop() + 'px'
			});
		}
		else {
			getButtonPos();
		}
	});
})