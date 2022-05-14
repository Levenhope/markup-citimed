document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        //mobile search
        if (e.target.closest('.js-search-toggle') < 1) return;
        let header = e.target.closest('.page-header');
        let searchDropdown = header.querySelector('.search-dropdown');
        searchDropdown.classList.toggle('is-open');
        fixPage();
    });
});