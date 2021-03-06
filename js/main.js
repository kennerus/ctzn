$(function () {
  var block = document.querySelectorAll('.js_block');
  var cursorId = document.getElementById('cursor');
  var cursorType = 'point';

  // set our custom cursor position
  function setDefaultCursor(coordX, coordY, cursor) {
    if ($(window).width() > 1140) {
      cursorId.style.top = coordY + 'px';
      cursorId.style.left = coordX + 'px';
    }
    if (cursor === 'eye') {
      $('.cursor').addClass('cursor_active');
      $('.cursor__eye').css('display', 'block');
      $('.cursor__text').css('display', 'block');
    }
    else {
      $('.cursor__eye').css({
        display: 'none',
        transform: '0'
      });
      $('.cursor__text').css('display', 'none');
      $('.cursor').removeClass('cursor_active');
    }
  }

  // get current cursor position
  function getCursorPosition(event) {
    xMousePos = event.pageX;
    yMousePos = event.pageY - $(document).scrollTop();
    // window.status = "x = " + xMousePos + " y = " + yMousePos;
    setDefaultCursor(xMousePos, yMousePos, cursorType);
  }

  function moveEyes(event, _this) {
    var title = _this.querySelector('h2');
  }

  function calculateWidth(currentId, blockSelector) {
    if (document.getElementById(currentId)) {
      var current = document.getElementById(currentId);
      var parent = current.parentElement;
      var blocks = current.querySelectorAll(blockSelector);
      var blocksWidth = 0;
      for (var i = 0; i < blocks.length; i++) {
        blocksWidth += blocks[i].offsetWidth;
      }
      current.style.width = blocksWidth + 'px';
      return blocksWidth;
    }
  }

  if ($(window).width() > 1140) {
    calculateWidth('type', 'div');
    calculateWidth('company', 'div');
  }

  document.querySelector('#cont').onmousemove = function (event) {
    if ($(window).width() > 1140) {
      var moveX = event.clientX - this.getBoundingClientRect().left;
      moveSlider(event, 'type', 1, moveX);
      moveSlider(event, 'company', 1, moveX);
    }
  };

  $('.desc__tags a').hover(
    function (event) {
      $(this).css({
        color: '#fff',
        backgroundColor: '#000',
        opacity: '1'
      })

    },
    function (event) {
      $(this).css({
        color: '#000',
        backgroundColor: '#fff',
        opacity: '0.8'
      });
      if (event.relatedTarget === $('.cursor')[0] && event.delegateTarget === $(this)[0]) {
        $(this).css({
          color: '#fff',
          backgroundColor: '#000',
          opacity: '1'
        })
      }
    }
  );

  function moveSlider(event, sliderId, multiplier, moveX) {
    if (document.getElementById(sliderId)) {
      sliderId = document.getElementById(sliderId);
      var sliderWidth = sliderId.offsetWidth;
      var container = document.querySelector('.desc__tags');
      var containerWidth = container.offsetWidth;
      var mouseMove = (moveX / containerWidth) * 100;
      var sliderOffset = ((sliderWidth - containerWidth) / 100) * mouseMove;
      var sliderParent = sliderId.parentNode;
      var sliderParentWidth = sliderParent.offsetWidth;

      if (document.body.clientWidth >= 1140 && sliderId && sliderWidth > sliderParentWidth) {
        sliderId.style.marginLeft = '-' + sliderOffset + 'px';
      }
    }
  }

  $('.main').mousemove(function (event) {
    var parent = event.target.offsetParent;
    var title = $(event.target).closest('.js_block');

    if (parent.classList.contains('js_block') || title.hasClass('js_block')) {
      cursorType = 'eye';
      $('.cursor').css('transition', '0.2s');
      $('body').attr('data-time', $(parent).attr('data-time'));
      var dataTime = $('body').attr('data-time');
      $('.cursor__text').html(dataTime + ' мин.');

      setTimeout(
        function () {
          $('.cursor').css('transition', 'none');
        },
        200)
    }
    else {
      cursorType = 'point';
      $('.cursor').css('transition', '0.2s');

      setTimeout(
        function () {
          $('.cursor').css('transition', 'none');
        },
        200)
    }
  });
  $(".js_block").mousemove(function (event) {
    var eye = $(".cursor__eye");
    var title = $(this).find('h2 span');
    if (eye.length > 0) {
      var eyePos = eye.offset();
      var x = (eyePos.left) + (eye.width() / 2);
      var y = (eyePos.top) + (eye.height() / 2);
    }
    var titleWidth = title.width();
    var titleHeight = title.height();
    title = title.offset();
    var titleX = title.left + titleWidth / 2;
    var titleY = title.top + titleHeight / 2;
    var rad = Math.atan2(titleX - x, titleY - y);
    // нельзя менять математическую формулу! \/
    var rot = (rad * (180 / Math.PI) * -1) + 180;
    eye.css({
      'transform': 'rotate(' + rot + 'deg)'
    });
  });


  document.onmousemove = function (event) {
    getCursorPosition(event);
  }
});
