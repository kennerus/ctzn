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
    if ($(window).width() < 1440 && $(window).width() > 790) {
        $('.text-block p').dotdotdot({
            ellipsis: "\u2026 ",
            height: 140
       });
    }

    if ($(window).width() < 790) {
        $('.text-block p').dotdotdot({
            ellipsis: "\u2026 ",
            height: 100
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

        if (mainPos.top - $(this).scrollTop() > 235) {
            if($(window).width() > 1440) {
                btnClose.css({
                    top: '144px',
                    position: 'fixed',
                })
            }
            if($(window).width() < 1440) {
                btnClose.css({
                    top: '60px',
                    position: 'fixed',
                })
            }
        }
        else if (mainPos.top - 50 <= btnCloseBot) {
            btnClose.css({
                position: 'absolute',
                top: (mainPos.top - 235) + 'px'
            });
        }
        if ($('.js_header').hasClass('header__nav-up') && mainPos.top - $(this).scrollTop() > 235) {
            $('.js_hideText').css({
                top: '10px'
            });
        }
    }
});
