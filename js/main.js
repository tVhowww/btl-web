
let openMenu = true
let openSubNav = true

function handelMobileNav() {
    //handle Responsive Mobile
    $('.open-menu').click(() => {
        if (openMenu) {
            $('.nav-mobile').css({
                'left': '0%', 
                'visibility': 'visible'
            })
        } else {
            $('.nav-mobile').css({
                'left': '-100%',
                'visibility': 'hidden'
            })
        }
        openMenu = !openMenu
    })

    $('.nav-mobile__item--has-prod').click(() => {
        if (openSubNav) {
            $('.nav__prod--mobile').addClass('sub-nav__mobile')
            openSubNav = true
        } else {
            $('.nav__prod--mobile').removeClass('sub-nav__mobile')
        }
        openSubNav = !openSubNav
    })
}

// Scrolltop


function scrollTopPhone() {
    $('.scroll-top').click(() => {
        $('html, body').scrollTop(0);
    })
}

// Main
$(document).ready(function() {

    // scroll top
    $(window).scroll(() => {
        let posScroll = $('html, body').scrollTop();
        if (posScroll > 700) {
            $('.scroll-top').css({
                'visibility': 'visible'
            })
        } else {
            $('.scroll-top').css({
                'visibility': 'hidden'
            })
        }
        scrollTopPhone()
    })
    
    // tooltip
    $('[data-bs-toggle="tooltip"]').tooltip();   

    // Responsive nav mobile
    handelMobileNav()
})