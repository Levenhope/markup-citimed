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
        if (!document.body.classList.contains('is-fixed')) {
            currentScroll = window.pageYOffset;
        } else {
            window.scrollTo({ top: currentScroll});
        }
        let menu = e.target.closest('.page-header');
        document.body.classList.toggle('is-fixed');
        menu.classList.toggle('is-menu-open');
    });
});
window.addEventListener('resize', function(event) {
    fixedHeaderfix();
});