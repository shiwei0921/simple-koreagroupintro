let cards = [];
let flippedCards = [];
let matchedCards = 0;

const symbols = [
    "images/johnny.jpg",
    "images/haechan.jpg",
    "images/dongyoung.jpg",
    "images/qiankun.jpg",
    "images/taeil.png",
    "images/yuta.jpg",
    "images/chaiya.jpg",
    "images/taeyoung.jpg"
];

function createCards() {
    return [...symbols, ...symbols].sort(() => 0.5 - Math.random());
}

function startGame() {
    cards = createCards();
    flippedCards = [];
    matchedCards = 0;
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = '';
    cards.forEach((symbol, index) => {
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.index = index;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    const index = card.dataset.index;
    if (flippedCards.length < 2 && !card.classList.contains("flipped") && !card.classList.contains("hidden")) {
        card.innerHTML = `<img src="${cards[index]}" alt="Card Image" />`;
        card.classList.add("flipped");
        flippedCards.push(card);
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.innerHTML === card2.innerHTML) {
        matchedCards += 2;
        setTimeout(() => {
            card1.classList.add("hidden");
            card2.classList.add("hidden");
            flippedCards = [];
            if (matchedCards === cards.length) {
                alert("You win!");
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove("flipped");
            card2.classList.remove("flipped");
            card1.innerHTML = '';
            card2.innerHTML = '';
            flippedCards = [];
        }, 1000);
    }
}

window.onload = startGame;

