//accorion
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let item = e.target.closest('.accordion__item-heading');
        if (item < 1) return;
        item.closest('.accordion__item').classList.toggle('is-open');
    })
});