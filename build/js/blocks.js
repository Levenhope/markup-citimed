//accorion
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.accordion__item-heading');
        if (item < 1) return;
        item.closest('.accordion__item').classList.toggle('is-open');
    })
});
//alphabet
document.addEventListener("DOMContentLoaded", function(){
    let alphabets = document.querySelectorAll('.alphabet');
    alphabets.forEach(function(alphabet){
        let items = Array.prototype.slice.call(alphabet.querySelectorAll('.alphabet__item'));
        let sortedItems = items.sort(function(a, b){
            if(a.textContent<b.textContent) return -1;
            if(a.textContent>b.textContent) return 1;
            return 0;
        });
        alphabet.innerHTML = '';
        let sectionLetter = null;
        sortedItems.forEach(function (sortedItem, index) {
            let currentLetter = sortedItem.innerText[0].toUpperCase();
            if (currentLetter !== sectionLetter) {
                alphabet.insertAdjacentHTML("beforeend", "<div class='alphabet__section'><div class='alphabet__letter'>" + currentLetter+ "</div><div class='alphabet__list'></div></div>");
                sectionLetter = currentLetter;
            }
            alphabet.lastChild.lastChild.append(sortedItem);
        });
    });
});
//cards-block
$(function() {
    $('.cards-block').each(function() {
        let $context = $(this);
        let $slider = $('.cards-block__list', $context);
        let isCompact = $slider.attr('data-compact');
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
            let sliderListWidth = window.innerWidth>1024?'auto':parentWidth-45;
            $slider.width(sliderListWidth);
        }
        if (!isCompact) {
            $slider.on('init', function() {
                sliderGridFix();
            });

            if (window.innerWidth < 1025) {
                $slider.slick(options);
            }
            window.addEventListener('resize', function(event) {
                if (!$slider.is('.slick-initialized') && (window.innerWidth < 1025)) {
                    $slider.slick(options);
                } else {
                    sliderGridFix();
                }
            });
        }
    });
});
//catalog-nav
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        if (e.target.closest('.catalog-nav__group-title') < 1) return;
        let menu = e.target.closest('.catalog-nav__group');
        menu.classList.toggle('is-open');
    })
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
//map-block
class MapBlock {
    constructor(context) {
        this.context = context;
        this.map = null;
        this.collection = null;

        this.init = this.init.bind(this);
        this.createMap = this.createMap.bind(this);
        this.defaultPlacemarking = this.defaultPlacemarking.bind(this);
        this.initBlockAPI = this.initBlockAPI.bind(this);
        this.initToggle = this.initToggle.bind(this);
        this.setPlacemark = this.setPlacemark.bind(this);
        this.initShowMoreBtn = this.initShowMoreBtn.bind(this);
    }
    init() {
        this.createMap();
        this.defaultPlacemarking(this.context.querySelectorAll('.map-block__place'));
        this.initBlockAPI();
        this.initToggle();
        this.initShowMoreBtn();
    }
    initToggle() {
        let self = this;
        self.context.dataset.activeTab = this.context.querySelector('input[name="map-switch"]:checked').value;
        this.context.querySelectorAll('input[name="map-switch"]').forEach(function(switcher) {
            switcher.addEventListener('change', function(){
                self.context.dataset.activeTab = self.context.querySelector('input[name="map-switch"]:checked').value;
            });
        })
    }
    initShowMoreBtn() {
        let self = this;
        let showMoreBtn = this.context.querySelector('.map-block__more-button');
        showMoreBtn.addEventListener('click', function(){
            self.context.classList.add('is-show-all');
        });
    }
    createMap(){
        this.map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 7,
            controls: ['smallMapDefaultSet']
        });
        this.map.behaviors.disable('scrollZoom');
        this.collection = new ymaps.GeoObjectCollection();
    }
    defaultPlacemarking(marks) {
        let self = this;
        marks.forEach(function(mark) {
            let coordsArray = mark.dataset.coords.split(',')
            self.setPlacemark({
                placeInfo: mark.innerHTML,
                coords: coordsArray,
                coordsRaw: mark.dataset.coords,
                color: mark.dataset.color,
            });
        });

        this.map.geoObjects.add(this.collection);
        this.map.setBounds(this.collection.getBounds(), {checkZoomRange:true, zoomMargin:100});
    }
    setPlacemark(mark) {
        let self = this;
        let element = this.context.querySelector('.map-block__place[data-coords="'+mark.coordsRaw+'"]');
        let placemark = new ymaps.Placemark(
            [parseFloat(mark.coords[0]), parseFloat(mark.coords[1])],
            {
                balloonContent: mark.placeInfo,
            },
            {
                iconColor: mark.color,
                balloonOffset: [90, -15],
                hideIconOnBalloonOpen: false,
                balloonCloseButton: false,
            }
        );
        this.collection.add(placemark);

        element.addEventListener('click', function () {
            self.context.querySelectorAll('.map-block__place').forEach(function(placeItem) {
                placeItem.classList.remove('is-active');
            });
            element.classList.add('is-active');
            if (!placemark.balloon.isOpen()) {
                placemark.balloon.open();
            } else {
                placemark.balloon.close();
            }
            return false;
        });
    }
    initBlockAPI() {
        let self = this;
        this.context.addEventListener('resize.block', function(event) {
            setTimeout(function() {
                if (self.map !== undefined) self.map.container.fitToViewport(true);
            }, 200);
            event.stopPropagation();
        });

        this.context.addEventListener('setPlacemark.block', function(event, mark) {
            self.setPlacemark(mark);
            event.stopPropagation();
        });

        this.context.addEventListener('setCenter.block', function(event, center, zoom) {
            self.map.setCenter(center, zoom, {
                duration: 600
            });
            event.stopPropagation();
        });

        this.context.addEventListener('destroy.block', function(event) {
            if (self.map !== undefined) self.map.destroy();
            event.stopPropagation();
        });
    }
}
document.addEventListener("DOMContentLoaded", function(){
    document.querySelectorAll('.map-block').forEach(function(context) {
        let mapBlock = new MapBlock(context);
        ymaps.ready(mapBlock.init);
    });
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
//specials
$(function() {
    $('.specials__tab').each(function() {
        let $context = $(this);
        let $slider = $('.specials__list', $context);
        let isCompact = $slider.attr('data-compact');
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
            let parentWidth = $slider.closest('.specials__content').width();
            let compactTemplate = $slider.closest('.specials_compact');
            let sliderListWidth = (window.innerWidth>1024)||compactTemplate?parentWidth+30:parentWidth-65;
            $slider.width(sliderListWidth);
        }
        $slider.on('init', function() {
            sliderGridFix();
        });
        if (isCompact) {
            if (window.innerWidth < 601) {
                $slider.slick(compactOptions);
            }
            window.addEventListener('resize', function(event) {
                if (!$slider.is('.slick-initialized') && (window.innerWidth < 601)) {
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
//tabs-links
const tabsEvent = new Event('tabActivation');
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let tabLink = e.target.closest('.tabs-link');
        let tabsHolder = e.target.closest('.tabs-holder');
        if (!(tabLink && tabsHolder)) return;
        let targetTab = tabsHolder.querySelector(tabLink.dataset.target);
        let activeTabs = tabsHolder.querySelectorAll('.tab.is-active');
        activeTabs.forEach(function(activeTab) {
            activeTab.classList.remove('is-active');
        });
        tabsHolder.querySelectorAll('.tabs-link.is-active').forEach(function(activeLink) {
            activeLink.classList.remove('is-active');
        });
        tabLink.classList.add('is-active');
        targetTab.classList.add('is-active');
        window.dispatchEvent(tabsEvent);
    })
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
//# sourceMappingURL=../sourcemaps/blocks.js.map
