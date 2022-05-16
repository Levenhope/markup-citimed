//specials
$(function() {
    $('.specials__tab').each(function() {
        let $context = $(this);
        let $slider = $('.specials__list', $context);
        let isCompact = $slider.attr('data-compact');
        let mobileWidth = window.innerWidth < 601;
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
        let compactOptions = {
            infinite: false,
            dots: true,
            mobileFirst: true,
            prevArrow: $('.specials__slider-arrow.button_prev', $context),
            nextArrow: $('.specials__slider-arrow.button_next', $context),
            appendDots: $('.specials__slider-pages', $context),
            responsive: [{
                breakpoint: 600,
                settings: 'unslick'

            }, {
                breakpoint: 300,
                settings: {
                    slidesToShow: 1
                }
            }
            ]
        };
        function sliderGridFix() {
            mobileWidth = window.innerWidth < 601;
            let parentWidth = $slider.closest('.specials__content').width();
            let compactTemplate = $slider.closest('.specials_compact').length > 0;
            let sliderListWidth = (!compactTemplate&&window.innerWidth<1025)||mobileWidth?parentWidth-65:parentWidth+30;
            $slider.width(sliderListWidth);
        }
        $slider.on('init', function() {
            sliderGridFix();
        });
        if (isCompact) {
            if (mobileWidth) {
                $slider.slick(compactOptions);
            }
            window.addEventListener('resize', function(event) {
                if (!$slider.is('.slick-initialized') && mobileWidth) {
                    $slider.slick(compactOptions);
                } else {
                    sliderGridFix();
                }
            });
        } else {
            $slider.on('init', function() {
                sliderGridFix();
            });

            $slider.slick(options);

            window.addEventListener('resize', function(event) {
                sliderGridFix();
            });

            window.addEventListener('tabActivation', function(event) {
                if ($slider.is('.slick-initialized')) {
                    $slider.slick('setPosition');
                }
            });
        }
    });
});