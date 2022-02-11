const table = document.querySelector(".table");
const cards = table.children;

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function shuffleArray(array) {
  for (let j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}

function compareElementValue(tuple) {
  const firstElement = tuple[0].dataset.number;
  const secondElement = tuple[1].dataset.number;
  console.log(firstElement === secondElement);
  return firstElement === secondElement;
}

function init(number) {
  const numbers = Array.apply(null, Array(number)).map((_, index) => index + 1);
  const doubleNumbers = numbers.concat(numbers);
  const shuffledNumbers = shuffleArray(doubleNumbers);

  for (let i = 0; i < shuffledNumbers.length; i++) {
    const number = shuffledNumbers[i];
    const card = document.createElement("div");
    const cardNumber = document.createElement("span");
    cardNumber.innerText = number;
    card.classList.add("card");
    card.appendChild(cardNumber);
    card.dataset.number = number;
    table.appendChild(card);
  }
}

init(8);

function game(cards) {
  let openedCards = [];
  let done = 0;

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];

    const cardClick = card.addEventListener("click", () => {
      if (card.target in openedCards) {
        return;
      }

      if (done === 7) {
        document.querySelector(".result").innerText = "You win!";
        document.querySelector(".play-more").classList.add("visible");
      }

      if (openedCards.length < 2) {
        openedCards.push(card);
        openedCards.forEach((card) => card.classList.add("opened"));
      } else if (openedCards.length === 2) {
        if (compareElementValue(openedCards)) {
          done++;
          openedCards.forEach((card) => {
            card.classList.add("done");
            card.removeEventListener(cardClick, () => {
              openedCards = [];
              return;
            });
          });
        }
        openedCards.forEach((card) => card.classList.remove("opened"));
        openedCards = [];
        openedCards.push(card);
        openedCards.forEach((card) => card.classList.add("opened"));
      }
    });
  }
}

game(cards);
