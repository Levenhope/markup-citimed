//global
let currentScroll = 0; //height fix for mobiles

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', function () {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}); //fix for fonts on different OS

document.documentElement.setAttribute('data-useragent', navigator.userAgent);
document.addEventListener("DOMContentLoaded", function () {
  //Инициализация плагина для версии для слабовидящих
  new isvek.Bvi(); //Класс для содержимого попапов

  if (window.parent !== window) {
    document.documentElement.classList.add('inside-iframe');
  }
});

function fixPage() {
  if (!document.body.classList.contains('is-fixed')) {
    currentScroll = window.pageYOffset;
    document.body.classList.add('is-fixed');
  } else {
    document.body.classList.remove('is-fixed');
    window.scroll(0, currentScroll);
  }
}

document.addEventListener('click', function (e) {
  let anchor = e.target.closest('a[href^="#"]');
  if (!anchor) return;
  e.preventDefault();
  let linkTarget = document.querySelector(anchor.getAttribute('href'));
  $('html, body').animate({
    scrollTop: linkTarget.offsetTop - 140
  }, 500);
});
//# sourceMappingURL=../sourcemaps/global.js.map