//global

//height fix for mobiles
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', function() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//fix for fonts on different OS
document.documentElement.setAttribute('data-useragent', navigator.userAgent);

document.addEventListener("DOMContentLoaded", function(){
    //Инициализация плагина для версии для слабовидящих
    new isvek.Bvi();
});




