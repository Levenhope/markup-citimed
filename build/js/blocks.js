//cards-block
$(function() {
    let options = {
        infinite: false,
        dots: true,
        mobileFirst: true,
        prevArrow: $('.cards-block__slider-arrow_prev'),
        nextArrow: $('.cards-block__slider-arrow_next'),
        appendDots: $('.cards-block__slider-pages'),
        responsive: [{
            breakpoint: 1025,
            settings: "unslick"

        }, {

            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }

        }, {

            breakpoint: 300,
            settings: {
                slidesToShow: 1
            }

        }
        ]
    };
    let $slider = $('.cards-block__list');
    if (window.innerWidth < 1025) {
        $slider.slick(options);
    }
    $(window).on('resize', function() {
       if (!$slider.is('.slick-initialized') && (window.innerWidth < 1025)) {
           $slider.slick(options);
       }
    });
});
//page-footer
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        if (e.target.closest('.footer-menu__toggle') < 1) return;
        let menu = e.target.closest('.footer-menu');
        if (!menu.classList.contains('is-open')) {
            e.preventDefault();
            menu.classList.add('is-open');
        }
    })
});
//accorion
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.accordion__item-heading');
        if (item < 1) return;
        item.closest('.accordion__item').classList.toggle('is-open');
    })
});
//page-header
function fixedHeaderfix() {
    let headerHeight = document.querySelector('.page-header').clientHeight;
    document.body.style.paddingTop = headerHeight + 'px';
}
document.addEventListener("DOMContentLoaded", function(){
    let currentScroll = 0;
    fixedHeaderfix();
    document.addEventListener('click', function(e) {
        if (e.target.closest('.page-header__toggle') < 1) return;
        let menu = e.target.closest('.page-header');
        menu.classList.toggle('is-menu-open');
        if (!document.body.classList.contains('is-fixed')) {
            currentScroll = window.pageYOffset;
            document.body.classList.add('is-fixed');
        } else {
            document.body.classList.remove('is-fixed');
            window.scroll(0, currentScroll);
        }
    });
});
window.addEventListener('resize', function(event) {
    fixedHeaderfix();
});
document.addEventListener("DOMContentLoaded", function(){
    let searchLine = document.querySelectorAll('.search-line__input');
    searchLine.forEach(function(line) {
        if (window.innerWidth < 1025 && line.dataset.placeholderMobile) {
            line.setAttribute('placeholder', line.dataset.placeholderMobile);
        }
    });
});
//top-menu
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let parentMenu = e.target.closest('.top-menu__menu-item.is-parent');
        let submenuItem = e.target.closest('.top-menu__submenu-item');
        if (parentMenu && !submenuItem  && window.innerWidth < 1025 ) {
            e.preventDefault();
            parentMenu.closest('.top-menu').classList.toggle('hide-inactive');
            parentMenu.classList.toggle('is-open');
        }
    })
});
//# sourceMappingURL=../sourcemaps/blocks.js.map