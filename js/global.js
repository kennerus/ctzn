$(function() {
	$(document).on('click', '.js_openNav', function() {
		$(this).toggleClass('header__hamburger_active');
		$('.js_nav').toggleClass('header__nav-mob_active');
        $('body').toggleClass('overflow-hidden');
        $('.js_header').toggleClass('header_border');
	})

    $(document).on('click', '.js_dropdownBtn', function() {
        if($(this).next('.js_headerDropdown').hasClass('header__dropdown_opened')) {
            $('.js_headerDropdown').removeClass('header__dropdown_opened');
        }
        else {
            $('.js_headerDropdown').removeClass('header__dropdown_opened');
            $(this).next('.js_headerDropdown').addClass('header__dropdown_opened');
        }

        if ($(window).width() < 1140) {
            $(this).find('.js_dropdownArrow').toggleClass('header__rotate-arrow');
        }
    });

    if ($(window).width() < 1140) {
        $('.text-block p').dotdotdot({
            ellipsis: "\u2026 ",
            height: 60
       });
    }

    // $(document).on('mouseleave', '.js_headerDropdown', function() {
    //     if ($(window).width() > 1140) {
    //         $(this).removeClass('header__dropdown_opened');
    //     }
    // });

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
}, 250);

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

$(window).scroll(function(event){
    didScroll = true;
});
