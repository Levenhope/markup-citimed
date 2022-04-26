//accorion
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.accordion__item-heading');
        if (item < 1) return;
        item.closest('.accordion__item').classList.toggle('is-open');
    })
});
//cards-block
$(function() {
    $('.cards-block').each(function() {
        let $context = $(this);
        let $slider = $('.cards-block__list', $context);
        let options = {
            infinite: false,
            dots: true,
            mobileFirst: true,
            prevArrow: $('.cards-block__slider-arrow.button_prev', $context),
            nextArrow: $('.cards-block__slider-arrow.button_next', $context),
            appendDots: $('.cards-block__slider-pages', $context),
            responsive: [{
                breakpoint: 1025,
                settings: "unslick"

            }, {

                breakpoint: 769,
                settings: {
                    slidesToShow: 3,
                }

            }, {

                breakpoint: 525,
                settings: {
                    slidesToShow: 2
                }

            }, {

                breakpoint: 300,
                settings: {
                    slidesToShow: 1
                }

            }
            ]
        };
        function sliderGridFix() {
            let parentWidth = $('.cards-block__content', $context).width();
            let sliderListWidth = window.innerWidth>1024?parentWidth:parentWidth-45;
            $slider.width(sliderListWidth);
        }
        $slider.on('init', function() {
            sliderGridFix();
        });

        if (window.innerWidth < 1025) {
            $slider.slick(options);
        }
        window.addEventListener('resize', function(event) {
            if (!$slider.is('.slick-initialized') && (window.innerWidth < 1025)) {
                $slider.slick(options);
            }
        });
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
//steps
$(function() {
    function initSteps($slider, $context, options) {
        $slider.on("init afterChange", function(event, slick, currentSlide){
            $(".steps__current-number", $context).text(parseInt(slick.currentSlide + 1));
            $(".steps__total-number", $context).text(slick.slideCount);
        });
        $slider.slick(options);
    }
    $('.steps').each(function() {
        let $context = $(this);
        let $slider = $('.steps__list', $context);
        let options = {
            infinite: false,
            dots: false,
            mobileFirst: true,
            prevArrow: $('.steps__slider-arrow.button_prev', $context),
            nextArrow: $('.steps__slider-arrow.button_next', $context),
            responsive: [{
                breakpoint: 769,
                settings: "unslick"

            }, {

                breakpoint: 483,
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
        if (window.innerWidth < 1025) {
            initSteps($slider, $context, options);
        }
        $(window).on('resize', function() {
            if (!$slider.is('.slick-initialized') && (window.innerWidth < 1025)) {
                initSteps($slider, $context, options);
            }
        });
    });
});
//specials
$(function() {
    $('.specials__tab').each(function() {
        let $context = $(this);
        let $slider = $('.specials__list', $context);
        let options = {
            infinite: false,
            dots: true,
            mobileFirst: true,
            prevArrow: $('.specials__slider-arrow.button_prev', $context),
            nextArrow: $('.specials__slider-arrow.button_next', $context),
            appendDots: $('.specials__slider-pages', $context),
            responsive: [{
                breakpoint: 1025,
                settings: {
                    slidesToShow: 3,
                }
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
        function sliderGridFix() {
            let parentWidth = $slider.closest('.specials__content').width();
            let sliderListWidth = window.innerWidth>1024?parentWidth:parentWidth-65;
            $slider.width(sliderListWidth);
        }

        $slider.on('init', function() {
            sliderGridFix();
        });
        $slider.slick(options);

        window.addEventListener('resize', function(event) {
            sliderGridFix();
        });

        window.addEventListener('tabActivation', function(event) {
            $slider.slick('setPosition')
        });
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
//types-block

//tabs-links
const tabsEvent = new Event('tabActivation');
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let tabLink = e.target.closest('.tabs-links a');
        let tabsHolder = e.target.closest('.tabs-holder');
        if (!(tabLink && tabsHolder)) return;
        let targetTab = tabsHolder.querySelector(tabLink.dataset.target);
        tabsHolder.querySelector('.tab.is-active').classList.remove('is-active');
        tabLink.closest('.tabs-links').querySelector('a.is-active').classList.remove('is-active');
        tabLink.classList.add('is-active');
        targetTab.classList.add('is-active');
        window.dispatchEvent(tabsEvent);
    })
});
//# sourceMappingURL=../sourcemaps/blocks.js.map