//page-header
function fixedHeaderfix() {
    let headerHeight = document.querySelector('.page-header').clientHeight;
    document.body.style.paddingTop = headerHeight + 'px';
}
document.addEventListener("DOMContentLoaded", function(){
    fixedHeaderfix();
    document.addEventListener('click', function(e) {
        //mobile menu
        if (e.target.closest('.page-header__toggle') < 1) return;
        let menu = e.target.closest('.page-header');
        menu.classList.toggle('is-menu-open');
        fixPage();
    });
    window.addEventListener('resize', function(event) {
        fixedHeaderfix();
    });
});