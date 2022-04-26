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
        if (window.innerWidth < 1025) {
            $slider.slick(options);
        }
        $(window).on('resize', function() {
            if (!$slider.is('.slick-initialized') && (window.innerWidth < 1025)) {
                $slider.slick(options);
            }
        });
    });
});