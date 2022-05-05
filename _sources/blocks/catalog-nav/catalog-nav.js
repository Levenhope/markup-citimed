//catalog-nav
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        if (e.target.closest('.catalog-nav__group-title') < 1) return;
        let menu = e.target.closest('.catalog-nav__group');
        menu.classList.toggle('is-open');
    })
});