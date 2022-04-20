//global
let vh = window.innerHeight * 0.01;

// Затем устанавливаем значение свойства --vh
// для корневого элемента
document.documentElement.style.setProperty('--vh', `${vh}px`);

// слушаем событие resize
window.addEventListener('resize', function() {
    // получаем текущее значение высоты
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});

document.addEventListener("DOMContentLoaded", function(){
    //Инициализация плагина для версии для слабовидящих
    new isvek.Bvi();
    //

});




