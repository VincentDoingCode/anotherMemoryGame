const cards = document.querySelectorAll('.memory-card');
var clicks = document.getElementById("click");
let clickNum = 0;
let hasFlippedCard = false;
let locked = false;
let firstCard;
let secondCard;
clicks.innerHTML=clickNum;

function flipCard() {
  clicks.innerHTML=clickNum
  if (locked) return;
  if (this === firstCard) return;
  
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;
    clickNum++;
    clicks.innerHTML=clickNum;
    return;
  }

  // second click
  secondCard = this;
  clickNum++;
  clicks.innerHTML=clickNum;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  locked = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, locked] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function reset(){
  document.location.reload();

}

(function randomBoard() {
  cards.forEach(card => {
    let position = Math.floor(Math.random() * 12);
    card.style.order = position;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));
