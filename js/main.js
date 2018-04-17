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

// set our custom cursor position
function setDefaultCursor(cursorId, coordX, coordY) {
	cursorId = document.getElementById(cursorId);
	cursorId.style.top = coordY + 'px';
	cursorId.style.left = coordX + 'px';
}


// get current cursor position
function getCursorPosition(event, cursorId){
    xMousePos = event.pageX;
    yMousePos = event.pageY - $(document).scrollTop();
    window.status = "x = " + xMousePos + " y = " + yMousePos;
    setDefaultCursor(cursorId, xMousePos, yMousePos);  
}

$(window).scroll(function(event){
    didScroll = true;
});

function moveSlider(event, sliderId, multiplier) {
    var coordsX = event.pageX;
    sliderId = document.getElementById(sliderId);
    if(document.body.clientWidth >= 1140 && sliderId) {
        sliderId.style.marginLeft = '-' + coordsX / multiplier + 'px'
    }
}

document.onmousemove = function(event) {
    moveSlider(event, 'type', 2);
    moveSlider(event, 'company', 1);
    getCursorPosition(event, 'cursor');
}