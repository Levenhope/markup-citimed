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