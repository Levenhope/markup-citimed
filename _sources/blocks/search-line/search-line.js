document.addEventListener("DOMContentLoaded", function(){
    let searchLine = document.querySelectorAll('.search-line__input');
    function toggleResult(line) {
        if (line.value.length > 2) {
            line.closest('.search-line').classList.add('show-result');
        } else {
            line.closest('.search-line').classList.remove('show-result');
        }
    }
    searchLine.forEach(function(line) {
        if (window.innerWidth < 1025 && line.dataset.placeholderMobile) {
            line.setAttribute('placeholder', line.dataset.placeholderMobile);
        }
        if (line.dataset.instant) {
            line.addEventListener('input', function() {
                toggleResult(line);
            });
        }
    });
});