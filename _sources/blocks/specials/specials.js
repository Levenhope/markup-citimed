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