$(function() {
    var block = document.querySelectorAll('.js_block');
    var cursorId = document.getElementById('cursor');


	if ($(window).width() < 1140) {
		$('.js_tagsSlider').slick({
			infinite: false,
			variableWidth: true,
			swipeToSlide: true,
			arrows: false
		})
	}

    function appendEyes() {
        var eye = document.querySelector('.cursor__eye');
        if(eye == undefined) {
            var eye = document.createElement('span');
            eye.className = 'cursor__eye';
            cursorId.appendChild(eye);
            var eye2 = eye.cloneNode(true);
            cursorId.appendChild(eye2);
        }
    }

    function getReadTime(_this) {
        var readTime = _this.getAttribute('data-time');
        var readTimeSpan = document.createElement('span');
        readTimeSpan.className = 'cursor__text'
    }

    for (var i = 0; i < block.length; i++) {
        block[i].addEventListener('mouseenter', function(event) {
            appendEyes();
            cursorId.classList.add('cursor_active')
            
        });
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