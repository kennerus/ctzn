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

    // set our custom cursor position
    function setDefaultCursor(coordX, coordY) {
        if($(window).width() > 1140) {
            cursorId.style.top = coordY + 'px';
            cursorId.style.left = coordX + 'px';
        }
    }


    // get current cursor position
    function getCursorPosition(event){
        xMousePos = event.pageX;
        yMousePos = event.pageY - $(document).scrollTop();
        // window.status = "x = " + xMousePos + " y = " + yMousePos;
        setDefaultCursor(xMousePos, yMousePos);
        return xMousePos, yMousePos;
    }

    function appendEyes() {
        var eye = document.querySelector('.cursor__eye');
        if(eye == undefined) {
            var eye = document.createElement('div');
            eye.className = 'cursor__eye';
            eye.innerHTML = '<span class="cursor__pupil"></span>';
            cursorId.appendChild(eye);
            var eye2 = eye.cloneNode(true);
            cursorId.appendChild(eye2);
        }
    }

    function getReadTime(_this) {
        var readTime = _this.getAttribute('data-time');
        var cursorText = document.querySelector('.cursor__text');
        if(cursorText == undefined) {
            var readTimeSpan = document.createElement('span');
            readTimeSpan.className = 'cursor__text';
            readTimeSpan.innerHTML = readTime + ' мин.';
            cursorId.appendChild(readTimeSpan);
        }
    }

    function removeChildrens() {
        var eyes = document.querySelectorAll('.cursor__eye');
        var readTime = document.querySelector('.cursor__text');
        cursorId.removeChild(readTime);
        for (var j = 0; j < eyes.length; j++) {
            cursorId.removeChild(eyes[j]);
        }
    }

    function moveEyes(event, _this) {
        var title = _this.querySelector('h2');
    }

    function calculateWidth(currentId, blockSelector) {
        var current = document.getElementById(currentId);
        var parent = current.parentElement;
        var blocks = current.querySelectorAll(blockSelector);
        var blocksWidth = 0;
        for(var i = 0; i < blocks.length; i++) {
            blocksWidth += blocks[i].offsetWidth;
        }
        current.style.width = blocksWidth + 'px';
        return blocksWidth;
    }

    calculateWidth('type', 'div');
    calculateWidth('company', 'div');

    document.querySelector('#cont').onmousemove = function(event) {
        var moveX = event.clientX - this.offsetLeft;
        moveSlider(event, 'type', 1, moveX);
        moveSlider(event, 'company', 1, moveX);
    }

    function moveSlider(event, sliderId, multiplier, moveX) {
        sliderId = document.getElementById(sliderId);
        var sliderWidth = sliderId.offsetWidth;
        var container = document.querySelector('.desc__tags');
        var containerWidth = container.offsetWidth;
        var mouseMove = (moveX / containerWidth) * 100;
        var sliderOffset = ((sliderWidth - containerWidth) / 100)* mouseMove;
        if(document.body.clientWidth >= 1140 && sliderId) {
            sliderId.style.marginLeft = '-' + sliderOffset + 'px';
        }
    }

    for (var i = 0; i < block.length; i++) {
        block[i].addEventListener('mouseenter', function(event) {
            cursorId.classList.add('cursor_active');
            appendEyes();
            getReadTime(this);
            var blockPosition = this.getBoundingClientRect();
            return blockPosition.left, blockPosition.top;
        });

        block[i].addEventListener('mouseleave', function (event) {
            removeChildrens();
            cursorId.classList.remove('cursor_active');
        });
    }

    $(".block").mousemove(function(event) {
        var eye = $(".cursor__eye");
        var title = $(this).find('h2 span');
        if (eye.length > 0) {
            var eyePos = eye.offset();
            var x = (eyePos.left) + (eye.width() / 2);
            var y = (eyePos.top) + (eye.height() / 2);
        }
        var titleWidth = title.width();
        var titleHeight = title.height();
        var title = title.offset();
        var titleX = title.left + titleWidth / 2;
        var titleY = title.top + titleHeight / 2;
        var rad = Math.atan2(titleX - x, titleY - y);
        // нельзя менять математическую формулу! \/
        var rot = (rad * (180 / Math.PI) * -1) + 180;
        eye.css({
          'transform': 'rotate(' + rot + 'deg)'
        });
    });

    document.onmousemove = function(event) {
        getCursorPosition(event);
    }
})
