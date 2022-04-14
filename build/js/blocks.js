function fixedHeaderfix() {
    let headerHeight = document.querySelector('.page-header').clientHeight;
    document.body.style.paddingTop = headerHeight + 'px';
}
document.addEventListener("DOMContentLoaded", function(){
    fixedHeaderfix();
});
window.addEventListener('resize', function(event) {
    fixedHeaderfix();
}, true);
//# sourceMappingURL=../sourcemaps/blocks.js.map