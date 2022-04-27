//alphabet
document.addEventListener("DOMContentLoaded", function(){
    let alphabets = document.querySelectorAll('.alphabet');
    alphabets.forEach(function(alphabet){
        let items = Array.prototype.slice.call(alphabet.querySelectorAll('.alphabet__item'));
        let sortedItems = items.sort(function(a, b){
            if(a.innerText<b.innerText) return -1;
            if(a.innerText>b.innerText) return 1;
            return 0;
        });
        alphabet.innerHTML = '';
        let sectionLetter = null;
        sortedItems.forEach(function (sortedItem, index) {
            let currentLetter = sortedItem.innerText[0].toUpperCase();
            if (currentLetter !== sectionLetter) {
                alphabet.insertAdjacentHTML("beforeend", "<div class='alphabet__section'><div class='alphabet__letter'>" + currentLetter+ "</div><div class='alphabet__list'></div></div>");
                sectionLetter = currentLetter;
            }
            alphabet.lastChild.lastChild.append(sortedItem);
        });
    });
});