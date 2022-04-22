document.addEventListener("DOMContentLoaded", function(){
    let searchLine = document.querySelectorAll('.search-line__input');
    searchLine.forEach(function(line) {
        if (window.innerWidth < 1025 && line.dataset.placeholderMobile) {
            line.setAttribute('placeholder', line.dataset.placeholderMobile);
        }
    });
});