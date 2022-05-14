//cart-compact
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.cart-compact__link');
        if (item < 1) return;
        item.closest('.cart-compact').classList.toggle('is-open');
    })
});