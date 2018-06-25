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
  truncate();

  // hide-show custom cursor on header elements
  $(document).on('mouseenter', '.js_cursorPointer', function () {
    $(this).css('cursor', 'pointer');
    $(this).find('*').css('cursor', 'pointer');
    $('#cursor').css('display', 'none');
  });

  $(document).on('mouseleave', '.js_cursorPointer', function () {
    $(this).css('cursor', 'none');
    $(this).find('*').css('cursor', 'none');
    $('#cursor').css('display', 'flex');
  })
});

// truncate
function truncate() {
  if ($(window).width() > 576) {
    $('.text-block p a').dotdotdot({
      ellipsis: "\u2026",
      height: 100,
    });
  } else {
    $('.text-block p a').dotdotdot({
      ellipsis: "\u2026",
      height: 80,
    });
  }
}

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
          position: 'fixed'
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

// делаем текстовые блоки нужной высоты, отталкиваясь от эталонной картинки
var smallImgContainer, smallImgHeight, textBlocks, siblings, maxSiblingTitleHeight;
var siblingsTitleHeight = [];

function changeTextBlockHeight() {
  smallImgContainer = document.querySelector('.js_etalon');
  smallImgHeight = smallImgContainer.clientHeight - smallImgContainer.querySelector('div').clientHeight;

  if ($(window).width() <= 1140 && $(window).width() > 750) {
    $('.text-block').each(function () {
      if (!$(this).hasClass('js_changeHeight')) {
        $(this).addClass('js_changeHeight');
      }
    });
  }

  if ($(window).width() > 750) {
    var textBlocks = $('.js_changeHeight');
    textBlocks.css({
      height: smallImgHeight
    });
  }
}

// меняем размер шрифта в зависимости от ширины блока
var textBlock = $('.text-block');
var textBlockTitle = $('.text-block h2');
var textBlockText = $('.text-block p');
var textBlockWidth = textBlock.outerWidth();
var titleFontSize = (textBlockWidth - 60) / 3;

function variousTextBlockFontSize() {
  textBlock = $('.text-block');
  textBlockTitle = $('.text-block h2');
  textBlockText = $('.text-block p');
  textBlockWidth = textBlock.outerWidth();
  titleFontSize = (textBlockWidth - 60) / 3;

  if (textBlockWidth > 475) {
    textBlock.css({
      height: '427px'
    });

    textBlockTitle.css({
      fontSize: titleFontSize + 'px'
    });

    textBlockText.css({
      fontSize: '26px',
      lineHeight: '1.54'
    })
  } else if (textBlockWidth > 400 && textBlockWidth <= 475) {
    textBlockTitle.css({
      fontSize: titleFontSize + 'px'
    });

    textBlockText.css({
      fontSize: '22px'
    })
  } else if (textBlockWidth > 350 && textBlockWidth <= 400) {
    if ($(window).width() < 750) {
      textBlock.css({
        height: 'auto'
      });
    }
    textBlockTitle.css({
      fontSize: titleFontSize + 'px'
    });

    textBlockText.css({
      fontSize: '18px',
      lineHeight: '1.67'
    });
  } else if (textBlockWidth > 300 && textBlockWidth <= 350) {
    if ($(window).width() < 750) {
      textBlock.css({
        height: 'auto'
      });
    }
    textBlockTitle.css({
      fontSize: titleFontSize + 'px'
    });

    textBlockText.css({
      fontSize: '16px',
      lineHeight: '1.63'
    });
  } else if (textBlockWidth > 280 && textBlockWidth <= 300) {
    textBlock.css({
      height: '210px'
    });

    textBlockTitle.css({
      fontSize: titleFontSize+ 'px'
    });

    textBlockText.css({
      fontSize: '14px',
      lineHeight: '1.71'
    });
  } else if (textBlockWidth === 280) {
    textBlock.css({
      height: '196px'
    });

    textBlockTitle.css({
      fontSize: titleFontSize+ 'px'
    });

    textBlockText.css({
      fontSize: '14px',
      lineHeight: '1.71'
    });
  }
}

// сохранение дом дерева при загрузке страницы, чтобы можно было
// менять разметку при ресайзе
var virtualDOM = $('#root').html();

$(function () {
  var flag = true;
  var blocksFlag = true;
  var blocks = $('.js_tabletBlock');
  var root = $('#root');
  var textBlockContainers = $('.block__container_project');

  variousTextBlockFontSize();

  // подгоняем отступ для цветного блока, который находятся рядом с обычными
  textBlockContainers.each(function () {
    textBlocks = $(this).find('.text-block');
    siblings = $(this).siblings('.block');
    maxSiblingTitleHeight = $(siblings[0]).find('div').outerHeight();

    if ($(window).width() > 750) {
      for (var i = 0; i < siblings.length; i++) {
        siblingsTitleHeight.push($(siblings[i]).find('div').outerHeight());
      }

      for (i = 0; i < siblingsTitleHeight.length; i++) {
        if (siblingsTitleHeight[i] > maxSiblingTitleHeight) {
          maxSiblingTitleHeight = siblingsTitleHeight;
        }
      }

      for (i = 0; i < textBlocks.length; i++) {
        $(textBlocks[i]).css('marginBottom', maxSiblingTitleHeight + 'px');
      }
    }
  });

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
          marginRight: '50px'
        })
      } else {
        blocksArr[i].css({
          marginRight: '0'
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

    truncate();
    changeTextBlockHeight();
    variousTextBlockFontSize();

    // подгоняем отступ для цветного блока, который находятся рядом с обычными
    textBlockContainers = $('.block__container_project');
    textBlockContainers.each(function () {
      textBlocks = $(this).find('.text-block');
      siblings = $(this).siblings('.block');
      siblingsTitleHeight = [];
      maxSiblingTitleHeight = siblings[0].querySelector('div').clientHeight;

      if ($(window).width() > 750) {
        for (var i = 0; i < siblings.length; i++) {
          siblingsTitleHeight.push($(siblings[i]).find('div').outerHeight());
        }

        for (i = 0; i < siblingsTitleHeight.length; i++) {
          if (siblingsTitleHeight[i] > maxSiblingTitleHeight) {
            maxSiblingTitleHeight = siblingsTitleHeight;
          }
        }

        for (i = 0; i < textBlocks.length; i++) {
          $(textBlocks[i]).css('marginBottom', maxSiblingTitleHeight + 'px');
        }
      }
    });


  });
});

window.addEventListener('load', function () {
  changeTextBlockHeight();
});