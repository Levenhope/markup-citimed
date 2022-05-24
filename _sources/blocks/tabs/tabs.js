//tabs-links
const tabsEvent = new Event('tabActivation');
document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener('click', function(e) {
        let tabLink = e.target.closest('.tabs-link');
        let tabsHolder = e.target.closest('.tabs-holder');
        if (!(tabLink && tabsHolder)) return;
        let targetTab = tabsHolder.querySelector(tabLink.dataset.target);
        let activeTabs = tabsHolder.querySelectorAll('.tab.is-active');
        activeTabs.forEach(function(activeTab) {
            activeTab.classList.remove('is-active');
        });
        tabsHolder.querySelectorAll('.tabs-link.is-active').forEach(function(activeLink) {
            activeLink.classList.remove('is-active');
        });
        tabLink.classList.add('is-active');
        targetTab.classList.add('is-active');
        tabsHolder.dataset.active = tabLink.dataset.target;
        window.dispatchEvent(tabsEvent);
    })
});