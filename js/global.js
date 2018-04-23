$(function() {
    if ($('#contacts').length > 0) {
        $('.js_contacts').addClass('active-item');
    }

    if ($('#about').length > 0) {
        $('.js_about').addClass('active-item');
    }

    // mob menu
    $(document).on('click', '.js_openNav', function() {
        $(this).toggleClass('header__hamburger_active');
        $('.js_nav').toggleClass('header__nav-mob_active');
        $('body').toggleClass('overflow-hidden');
        $('.js_header').toggleClass('header_border');
    })

    // dropdown menu
    $(document).on('click', '.js_dropdownBtn', function() {
        $('.js_dropdownBtn').removeClass('active-item');
        $('.js_dropdownArrow').removeClass('header__rotate-arrow');
        if($(this).next('.js_headerDropdown').hasClass('header__dropdown_opened')) {
            $('.js_headerDropdown').removeClass('header__dropdown_opened');
        }
        else {
            $('.js_headerDropdown').removeClass('header__dropdown_opened');
            $(this).next('.js_headerDropdown').addClass('header__dropdown_opened');
            $(this).addClass('active-item');
            $(this).find('.js_dropdownArrow').addClass('header__rotate-arrow');
        }
    });

    $(document).on('mouseleave', '.js_headerDropdown', function() {
        if ($(window).width() > 1140) {
            $(this).removeClass('header__dropdown_opened');
            $('.js_dropdownBtn').removeClass('active-item');
            $('.js_dropdownArrow').removeClass('header__rotate-arrow');
        }
    });

    // text truncate
    if ($(window).width() < 1140) {
        $('.text-block p').dotdotdot({
            ellipsis: "\u2026 ",
            height: 60
       });
    }

    // hide-show custom cursor on header elements
    $(document).on('mouseenter', '.js_cursorPointer', function() {
        $(this).css('cursor', 'pointer');
        $(this).find('*').css('cursor', 'pointer');
        $('#cursor').css('display', 'none');
    })

    $(document).on('mouseleave', '.js_cursorPointer', function() {
        $(this).css('cursor', 'none');
        $(this).find('*').css('cursor', 'none');
        $('#cursor').css('display', 'block');
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

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 5);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.js_header').addClass('header__nav-up');
    } 
    else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('.js_header').removeClass('header__nav-up');
        }
    }

    if($(window).scrollTop() > delta) {
    	$('.js_header').addClass('header_border');
    }
    else {
    	$('.js_header').removeClass('header_border');
    }
    
    lastScrollTop = st;
}
// function getButtonPos() {
//     var hideText = $('.js_hideText');
//     var hideTextPos = (($(window).width() - 1440) / 2) + 'px';
//     hideText.css('right', hideTextPos);
// }

// if($(window).width() < 1140) {
//     var blockContainer = $('.block__container');
//     blockContainer.each(function() {
//         var blockContainerParent = $(this).parents('.container_row');
//         $(this).find('.block').clone(blockContainerParent);
//     });
// }

$(window).scroll(function(event){
    didScroll = true;

    if($('.js_hideText').length > 0 && $('.js_hideText').hasClass('js_activeFlex')) {
        var btnClose = $('.js_hideText');
        var main = $('.main__picture');
        var mainPos = main.offset();
        var btnCloseOffset = btnClose.offset();
        var btnCloseBot = btnCloseOffset.top + btnClose.height();

        // var top = $(document).scrollTop(),
        //     pip = mainPos.top,
        //     height = btnClose.height();
        // if (top > btnCloseBot && top < pip - height) {
        //   btnClose.addClass('close-text_fixed').removeAttr("style");
        //   }
        // else if (top > pip - height) {
        //   btnClose.removeClass('close-text_fixed').css({
        //       'position':'absolute',
        //       'bottom':'0'
        //   });
        // }
        //   else {
        //     btnClose.removeClass('close-text_fixed');
        //  }

        // if (mainPos.top - $(this).scrollTop() > 144) {
        //     if($(window).width() > 1440) {
        //         getButtonPos();
        //         btnClose.css({
        //             position: 'fixed',
        //             top: '144px'
        //         })
        //     }
        //     if($(window).width() < 1440) {
        //         btnClose.css({
        //             position: 'fixed',
        //             top: '60px'
        //         })
        //     }
        // }
        // else if (mainPos.top - 50 <= btnCloseBot) {
        //     btnClose.css({
        //         position: 'absolute',
        //         top: (mainPos.top - 238) + 'px',
        //         right: 0
        //     });
        // }
        // if ($('.js_header').hasClass('header__nav-up') && mainPos.top - $(this).scrollTop() > 144) {
        //     $('.js_hideText').css({
        //         top: '10px'
        //     });
        // }
        var scrolledFromTop = $(this).scrollTop();
        if($(this).scrollTop() < (mainPos.top - 225)) {
            if($('.header').hasClass('header__nav-up')) {
                btnClose.css('top', (scrolledFromTop - 100) + 'px');
            }
            else {
                btnClose.css('top', scrolledFromTop + 'px');
            }
        }
        else {
            btnClose.css('top', (mainPos.top - 225) + 'px')
        }

        
    }
});
