//cart-compact
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.cart-compact__link');
        let modal = e.target.closest('.cart-compact__dropdown');
        let cartCompact = document.querySelector('.cart-compact');
        if (!cartCompact) return;
        let isOpen = cartCompact.classList.contains('is-open');
        if (!isOpen && !!item) {
            cartCompact.classList.add('is-open');
        } else if (!!isOpen && !modal) {
            cartCompact.classList.remove('is-open');
        }
    })
});