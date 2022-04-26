//tabs-links
const tabsEvent = new Event('tabActivation');
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let tabLink = e.target.closest('.tabs-links a');
        let tabsHolder = e.target.closest('.tabs-holder');
        if (!(tabLink && tabsHolder)) return;
        let targetTab = tabsHolder.querySelector(tabLink.dataset.target);
        tabsHolder.querySelector('.tab.is-active').classList.remove('is-active');
        tabLink.closest('.tabs-links').querySelector('a.is-active').classList.remove('is-active');
        tabLink.classList.add('is-active');
        targetTab.classList.add('is-active');
        window.dispatchEvent(tabsEvent);
    })
});