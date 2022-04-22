//cards-block
$(function() {
    let options = {
        infinite: false,
        dots: true,
        mobileFirst: true,
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