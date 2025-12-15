// const sBtn = document.getElementById("start_btn");
// const rBtn = document.getElementById("reset_btn");
// const cardContainer = document.getElementById("bottom_container");
// const score = document.getElementById("score");
// const c1 = document.getElementById("cell-1");
// const c2 = document.getElementById("cell-2");
// const c3 = document.getElementById("cell-3");
// const c4 = document.getElementById("cell-4");
// const c5 = document.getElementById("cell-5");
// const c6 = document.getElementById("cell-6");

// const emojiArray = [
//     {
//         emotionTags: ["banana"],
//         image: "banana.png",
//     },
//     {
//         emotionTags: ["cake"],
//         image: "cake.png",
//     },
//     {
//         emotionTags: ["cherry"],
//         image: "cherry.png",
//     },
//     {
//         emotionTags: ["grape"],
//         image: "grape.png",
//     },
//     {
//         emotionTags: ["peach"],
//         image: "peach.png",
//     },
//     {
//         emotionTags: ["watermelon"],
//         image: "watermelon.png",
//     }
// ];

//     sBtn.addEventListener ("click", () => {
//         cardContainer.classList.add("bottom_container");
//         console.log("clicked")
//     })
//     rBtn.addEventListener ("click", () => {
//         cardContainer.classList.remove("bottom_container");
//         score.innerText = "0";
//     })


// /*-----------------------------------------------------------------------------------*/
//     // перемешиваем массив
// function shuffle(array) {
//   return array.sort(() => Math.random() - 0.5);
// }

// // выбираем три случайных
// const randomThree = shuffle([...emojiArray]).slice(0, 3);

// const pairCards = [...randomThree, ...randomThree]; // двойные значения
// const shuffledCards = shuffle(pairCards);           // перемешиваем уже все 6
// console.log(randomThree);

// let firstCard = null;
// let secondCard = null;

// const cards = document.querySelectorAll('.grid_cell');

// shuffledCards.forEach((emoji, index) => {
//   cards[index].dataset.emoji = emoji;
//   // не показываем текст сразу — пока скрыто
// });

// cards.forEach(grid_cell => {
//   grid_cell.addEventListener('click', () => {
//     // если уже две карты выбраны — игнорируем клики
//     if (secondCard) return;

//     // показываем эмодзи
//     grid_cell.innerHTML = `
//          <img 
//          class="emo-img" 
//          src="./media/emoji//${emojiArray[1].image}"
//          alt="Emoji"
//          >
//          `
//      grid_cell.style.background = "#B8D700";

//     if (!firstCard) {
//       firstCard = grid_cell;
//     } else {
//       secondCard = grid_cell;

//       // проверка совпадения
//       if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
//         // оставляем открытыми
//         firstCard = null;
//         secondCard = null;
//       } else {
//         // через короткую задержку закрыть обе
//         setTimeout(() => {
//           firstCard.textContent = '';
//           secondCard.textContent = '';
//           firstCard = null;
//           secondCard = null;
//         }, 1000); // 1 сек пауза
//       }
//     }
//   });
// });

// function restartGame() {
//   const newShuffled = shuffle([...pairCards]);
//   cards.forEach((card, i) => {
//     card.dataset.emoji = newShuffled[i];
//     card.textContent = '';
//   });
//   firstCard = null;
//   secondCard = null;
// }


// /*-----------------------------------------------------------------------------------*/
// // c1.addEventListener ("click", () => {
// //     console.log(emojiArray[1].image);
// //     c1.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[1].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c1.style.background = "#B8D700";
// // });
// // c2.addEventListener ("click", () => {
// //     console.log(emojiArray[2].image);
// //     c2.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[2].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c2.style.background = "#B8D700";
// // });
// // c3.addEventListener ("click", () => {
// //     console.log(emojiArray[2].image);
// //     c3.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[2].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c3.style.background = "#B8D700";
// // });
// // c4.addEventListener ("click", () => {
// //     console.log(emojiArray[2].image);
// //     c4.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[2].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c4.style.background = "#B8D700";
// // });
// // c5.addEventListener ("click", () => {
// //     console.log(emojiArray[2].image);
// //     c5.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[2].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c5.style.background = "#B8D700";
// // });
// // c6.addEventListener ("click", () => {
// //     console.log(emojiArray[2].image);
// //     c6.innerHTML = `
// //         <img 
// //         class="emo-img" 
// //         src="./media/emoji//${emojiArray[2].image}"
// //         alt="Emoji"
// //         >
// //         `
// //     c6.style.background = "#B8D700";
// // });

const emojiArray = [
    { emotionTags: ["banana"], image: "banana.png" },
    { emotionTags: ["cake"], image: "cake.png" },
    { emotionTags: ["cherry"], image: "cherry.png" },
    { emotionTags: ["grape"], image: "grape.png" },
    { emotionTags: ["peach"], image: "peach.png" },
    { emotionTags: ["watermelon"], image: "watermelon.png" },
];

const cells = document.querySelectorAll(".grid_cell");
const startBtn = document.getElementById("start_btn");
const resetBtn = document.getElementById("reset_btn");
const scoreEl = document.getElementById("score");
const cardContainer = document.getElementById("bottom_container");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

/* Array shuffling */
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

/* Launching the game */
function startGame() {
    score = 0;
    scoreEl.textContent = score;
    resetBoard();
    cardContainer.classList.add("bottom_container");

    // 1. Choose 6 random cards
    const selected = shuffle([...emojiArray]).slice(0, 6);

    // 2. Duplicate
    const gameCards = shuffle([...selected, ...selected]);

    // 3. We arrange them into cells
    cells.forEach((cell, index) => {
        cell.dataset.image = gameCards[index].image;
        cell.innerHTML = "";
        cell.style.background = "#ffffffff";
        cell.classList.remove("matched");
        cell.addEventListener("click", handleCardClick);
    });
}

/* Buttons click */
function handleCardClick() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    showCard(this);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

/* Show card */
function showCard(card) {
    const img = document.createElement("img");
    img.src = `./media/emoji//${card.dataset.image}`;
    img.style.width = "80%";
    card.appendChild(img);
}

/* Match check*/
function checkForMatch() {
    const isMatch =
        firstCard.dataset.image === secondCard.dataset.image;

    isMatch ? disableCards() : hideCards();
}

/* Match */
function disableCards() {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    score+=5;
    scoreEl.textContent = score;

    resetTurn();
}

/* Didn't match */
function hideCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.innerHTML = "";
        secondCard.innerHTML = "";
        score-=1;
        scoreEl.textContent = score;
        resetTurn();
    }, 800);
}

/* Reset progress */
function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

/* Reset the game*/
function resetBoard() {
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove("matched");
        cardContainer.classList.add("bottom_container-d");
    });
    resetTurn();
}

/* Buttons */
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", startGame);