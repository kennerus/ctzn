$(function () {
  if ($('#contacts').length > 0) {
    $('.js_contacts').addClass('active-item');
  }

  if ($('#about').length > 0) {
    $('.js_about').addClass('active-item');
  }

  // mob menu
  $(document).on('click', '.js_openNav', function () {
    $(this).toggleClass('header__hamburger_active');
    $('.js_nav').toggleClass('header__nav-mob_active');
    $('body').toggleClass('overflow-hidden');
    $('.js_header').toggleClass('header_border');
  })

  // dropdown menu
  $(document).on('click', '.js_dropdownBtn', function () {
    $('.js_dropdownBtn').removeClass('active-item');
    $('.js_dropdownArrow').removeClass('header__rotate-arrow');
    if ($(this).next('.js_headerDropdown').hasClass('header__dropdown_opened')) {
      $('.js_headerDropdown').removeClass('header__dropdown_opened');
    }
    else {
      $('.js_headerDropdown').removeClass('header__dropdown_opened');
      $(this).next('.js_headerDropdown').addClass('header__dropdown_opened');
      $(this).addClass('active-item');
      $(this).find('.js_dropdownArrow').addClass('header__rotate-arrow');
    }
  });

  $(document).on('mouseleave', '.js_headerDropdown', function () {
    if ($(window).width() > 1140) {
      $(this).removeClass('header__dropdown_opened');
      $('.js_dropdownBtn').removeClass('active-item');
      $('.js_dropdownArrow').removeClass('header__rotate-arrow');
    }
  });

  // text truncate
  if ($(window).width() < 1440) {
    $('.text-block p').dotdotdot({
      ellipsis: "\u2026 ",
      height: 100
    });
  }

  // hide-show custom cursor on header elements
  $(document).on('mouseenter', '.js_cursorPointer', function () {
    $(this).css('cursor', 'pointer');
    $(this).find('*').css('cursor', 'pointer');
    $('#cursor').css('display', 'none');
  })

  $(document).on('mouseleave', '.js_cursorPointer', function () {
    $(this).css('cursor', 'none');
    $(this).find('*').css('cursor', 'none');
    $('#cursor').css('display', 'flex');
  })
})

// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.js_header').outerHeight();
var xMousePos = 0;
var yMousePos = 0;
var lastScrolledLeft = 0;
var lastScrolledTop = 0;

setInterval(function () {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 5);

function hasScrolled() {
  var st = $(this).scrollTop();

  // Make sure they scroll more than delta
  if (Math.abs(lastScrollTop - st) <= delta)
    return;

  // If they scrolled down and are past the navbar, add class .nav-up.
  // This is necessary so you never see what is "behind" the navbar.
  if (st > lastScrollTop && st > navbarHeight) {
    // Scroll Down
    $('.js_header').addClass('header__nav-up');
  }
  else {
    // Scroll Up
    if (st + $(window).height() < $(document).height()) {
      $('.js_header').removeClass('header__nav-up');
    }
  }

  if ($(window).scrollTop() > delta) {
    $('.js_header').addClass('header_border');
  }
  else {
    $('.js_header').removeClass('header_border');
  }

  lastScrollTop = st;
}

$(window).scroll(function (event) {
  didScroll = true;

  if ($('.js_hideText').length > 0 && $('.js_hideText').hasClass('js_activeFlex')) {
    var btnClose = $('.js_hideText');
    var main = $('.js_stopScrollCross');
    var mainPos = main.offset();
    var btnCloseOffset = btnClose.offset();
    var btnCloseBot = btnCloseOffset.top + btnClose.height();
    //положение крестика при скролле
    if ($(window).width() > 1140) {
      if (mainPos.top - $(this).scrollTop() > 50 && $(this).scrollTop() > 125) {
        btnClose.css({
          top: '10px',
          position: 'fixed',
        })
      }
      else if (mainPos.top - 50 <= btnCloseBot) {
        btnClose.css({
          position: 'absolute',
          top: (mainPos.top - 185) + 'px'
        });
      }
    }
    if ($(window).width() <= 1140) {
      if (mainPos.top - $(this).scrollTop() > 100 && $(this).scrollTop() > 80) {
        btnClose.css({
          top: '10px',
          position: 'fixed',
        })
      }
      else if (mainPos.top - 50 <= btnCloseBot) {
        btnClose.css({
          position: 'absolute',
          top: (mainPos.top - 125) + 'px'
        });
      }
    }
    //положение крестика когда доскроллил до верха
    if ($(this).scrollTop() < 125 && $(window).width() > 1140) {
      $('.js_hideText').css({
        position: 'absolute',
        top: 'auto'
      });
    }
    if ($(this).scrollTop() < 80 && $(window).width() <= 1140) {
      $('.js_hideText').css({
        position: 'absolute',
        top: 'auto'
      });
    }

  }
});

// сохранение дом дерева при загрузке страницы, чтобы можно было
// менять разметку при ресайзе
var virtualDOM = $('#root').html();

$(function () {
  var flag = true;
  var blocksFlag = true;
  var blocks = $('.js_tabletBlock');
  var root = $('#root');

  // вынимает блоки из контейнеров для сетки на планшетах
  function reconstructDOM() {
    var root = $('#root');
    var block = $('.js_removeTablet .js_tabletBlock');
    var main = $('.main');
    var blocksArr = [];
    main.append('<div class="container container_tablet"></div>');

    block.each(function () {
      $(this).appendTo('.container_tablet');
      if (!$(this).hasClass('block_biggest')) {
        blocksArr.push($(this));
      }
    });

    $('.js_removeTablet').remove();

    for (var i = 0; i < blocksArr.length; i++) {
      if (i % 2 === 0 && $(window).width() > 750) {
        blocksArr[i].css({
          marginRight: '50px',
        })
      } else {
        blocksArr[i].css({
          marginRight: '0',
        })
      }
    }
  }

  if ($(window).width() <= 1140) {
    flag = false;
    reconstructDOM();
    var virtualDOMTablet = root.html();
  }


  $(window).resize(function () {
    if (root.html() !== virtualDOM && $(window).width() > 1140 && flag) {
      blocksFlag = true;
      flag = false;
      $('#root').html(virtualDOM);
    }
    if ($(window).width() <= 1140 && !flag && root.html() !== virtualDOMTablet) {
      blocksFlag = true;
      flag = true;
      if (virtualDOMTablet) {
        $('#root').html(virtualDOMTablet);
      }
      if (virtualDOMTablet === undefined) {
        root.html(virtualDOM);
        reconstructDOM();
        var virtualDOMTablet = root.html();
      }
    }
  })
});