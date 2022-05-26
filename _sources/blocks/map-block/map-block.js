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
                balloonOffset: [0, -40],
                hideIconOnBalloonOpen: false,
                balloonCloseButton: true,
                balloonPanelMaxMapArea: 0
            }
        );
        this.collection.add(placemark);

        placemark.events.add('click', function(e) {
            e.preventDefault();
            if (window.innerWidth < 769) {
                //$.fancybox.open(placemark.properties.get('balloonContent'))
                const fancybox = Fancybox.show([
                    {
                        src: "<div class='modal-content'>"+placemark.properties.get('balloonContent')+"</div>",
                        type: "html",
                    },
                ]);
            }
        });

        element.addEventListener('click', function () {
            if (element.classList.contains('is-active')) {
                placemark.balloon.close();
                self.map.setZoom([7]);
                self.map.setBounds(self.collection.getBounds(), {checkZoomRange:true, zoomMargin:100});
                element.classList.remove('is-active');
            } else {
                self.context.querySelectorAll('.map-block__place').forEach(function(placeItem) {
                    placeItem.classList.remove('is-active');
                });
                element.classList.add('is-active');
                self.map.setCenter([parseFloat(mark.coords[0]), parseFloat(mark.coords[1])]);
                self.map.setZoom([17]);
                placemark.balloon.open();
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

        this.context.addEventListener('balloon.open', function(event) {
            console.log(event)
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
