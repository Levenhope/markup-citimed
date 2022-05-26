document.addEventListener("DOMContentLoaded", function(){
    let searchLine = document.querySelectorAll('.search-line__input');
    function toggleResult(line) {
        let searchDropdown = document.querySelector('.search-dropdown');
        let dropdownInput = searchDropdown.querySelector('.search-line__input');
        if (line.value.length > 2) {
            line.closest('.search-line').classList.add('show-result');
            if (window.innerWidth < 1025) {
                searchDropdown.classList.add('is-open');
                dropdownInput.value = line.value;
                dropdownInput.focus();
                line.value = '';
            }
        } else {
            line.closest('.search-line').classList.remove('show-result');
            if (window.innerWidth < 1025) {
                searchDropdown.classList.remove('is-open');
            }
        }
    }
    document.addEventListener('click', function(e) {
        let resetBtn = e.target.closest('.search-line__button_reset');
        if (!resetBtn) return;
        let parent = resetBtn.closest('.search-line');
        parent.classList.remove('show-result');
    });
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