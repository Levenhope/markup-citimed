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
//top-menu
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let parentMenu = e.target.closest('.top-menu__menu-item.is-parent');
        if (parentMenu < 1 || window.innerWidth > 1023) return;
        e.preventDefault();
        parentMenu.closest('.top-menu').classList.toggle('hide-inactive');
        parentMenu.classList.toggle('is-open');
    })
});
//# sourceMappingURL=../sourcemaps/blocks.js.map