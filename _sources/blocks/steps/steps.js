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