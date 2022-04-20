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