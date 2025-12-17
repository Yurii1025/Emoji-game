
const emojiArray = [
    { emotionTags: ["warm-smile"], image: "warm-smile.webp" },
    { emotionTags: ["screaming"], image: "screaming.webp" },
    { emotionTags: ["star"], image: "star.webp" },
    { emotionTags: ["watermelon"], image: "party.webp" },
    { emotionTags: ["cursing"], image: "cursing.webp" },
    { emotionTags: ["cry"], image: "cry.webp" },
    { emotionTags: ["cowboy"], image: "cowboy.webp" },
    { emotionTags: ["dizzy"], image: "dizzy.webp" },
    { emotionTags: ["freeze"], image: "freeze.webp" },
    { emotionTags: ["gal"], image: "gal.webp" },
    { emotionTags: ["hysj"], image: "hysj.webp" },
    { emotionTags: ["kissing"], image: "kissing.webp" },
    { emotionTags: ["laugh"], image: "laugh.webp" },
    { emotionTags: ["Laughing"], image: "Laughing.webp" },
    { emotionTags: ["pleading"], image: "pleading.webp" },
    { emotionTags: ["thinking"], image: "thinking.webp" },
    { emotionTags: ["smilewebp"], image: "smilewebp.webp" },
    { emotionTags: ["wink"], image: "wink.webp" },
    { emotionTags: ["melting"], image: "melting.webp" },
    { emotionTags: ["rofl"], image: "rofl.webp" }
];

const cells = document.querySelectorAll(".card");
const startBtn = document.getElementById("start_btn");
const resetBtn = document.getElementById("reset_btn");
const scoreEl = document.getElementById("score");
const cardContainer = document.getElementById("bottom_part");
const winModal = document.getElementById("wModal");
const closeModal = document.getElementById("close_modal");
const modMess = document.getElementById("modal_message");
const gContent = document.getElementById("gContent");
const timerEl = document.getElementById("timer");
const rulBtn = document.getElementById("rulesBtn");
const menuBtn = document.getElementById("menuBtn");
const modalM = document.getElementById("modal_content");
let selectedCardColor = "var(--pink)"; // цвет по умолчанию
// const rBtn = document.getElementById("red");
// const gBtn = document.getElementById("green");
// const yBtn = document.getElementById("yellow");
// const cFront = document.getElementById("card_front");

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let startTime = null;
let timerInterval = null;

/*----TIMER-----*/
function startTimer() {
    startTime = Date.now();

    timerInterval = setInterval(() => {
        const diff = Date.now() - startTime;
        const seconds = Math.floor(diff / 1000) % 60;
        const minutes = Math.floor(diff / 60000);

        timerEl.textContent =
            `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}
/*----TIMER-----*/

/* Array shuffling */
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function applyCardColor() {
    const fronts = document.querySelectorAll(".card_front");
    fronts.forEach(front => {
        front.style.background = selectedCardColor;
    });
}

/* Launching the game */
function startGame() {
    score = 0;
    scoreEl.textContent = score;
    stopTimer();          // если перезапуск
    startTimer();         // ⏱ старт
    resetBoard();
    cardContainer.classList.add("active");

    // 1. Choose 8 random cards
    const selected = shuffle([...emojiArray]).slice(0, 6);

    // 2. Duplicate
    const gameCards = shuffle([...selected, ...selected]);

    // 3. We arrange them into cells
    cells.forEach((cell, index) => {
        cell.dataset.image = gameCards[index].image;
        cell.innerHTML = `<div class="card_inner" id="gContent">
                                <div class="card_front">
                                    <div class="card_text"></div>
                                </div>
                                <div class="card_back"></div>
                            </div>`;
        const front = cell.querySelector(".card_front");
        front.style.background = selectedCardColor;

        cell.classList.remove("matched");
        cell.addEventListener("click", handleCardClick);
        // cell.addEventListener('click', function () {
        //     this.classList.add('is-flipped');
        // });
        setTimeout(() => {
        cell.classList.add('show');
    }, index * 150); // задержка для красивого эффекта

    });
}

/* Buttons click */
function handleCardClick() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    this.classList.add("is-flipped"); // ✅ ТОЛЬКО ЗДЕСЬ
    showCard(this);

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

/* Show card */
// function showCard(card) {
//     const img = document.createElement("img");
//     img.src = `./media/emoji//${card.dataset.image}`;
//     img.style.width = "100%";
//     img.classList.add("emo-img");
//     card.appendChild(img);
// }
function showCard(card) {
    const cardBack = card.querySelector(".card_back");

    // чтобы не создавать картинку повторно
    if (cardBack.querySelector("img")) return;

    const img = document.createElement("img");
    img.src = `./media/animated/${card.dataset.image}`;
    img.classList.add("emo-img");
    img.style.width = "100%";

    cardBack.appendChild(img);
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
    checkWin();
}

/* Didn't match */
function hideCards() {  
    lockBoard = true;

    setTimeout(() => {
        firstCard.querySelector(".card_back").innerHTML = "";
        secondCard.querySelector(".card_back").innerHTML = "";

        firstCard.classList.remove("is-flipped");
        secondCard.classList.remove("is-flipped");

        score -= 1;
        scoreEl.textContent = score;
        resetTurn();
    }, 1200);
}

function checkWin() {
    const matchedCards = document.querySelectorAll(".card.matched");

    // Всего карт = cells.length
    if (matchedCards.length === cells.length) {
        endGame();
    }
}

/* Reset progress */
function resetTurn() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

/* Reset the game*/
// function resetBoard() {
//     cells.forEach(cell => {
//         cell.innerHTML = "";
//         cell.classList.remove("matched");
//         cardContainer.classList.add("bottom_part");
//     });
//     resetTurn();
// }
function resetBoard() {
    cells.forEach(cell => {
        cell.innerHTML = "";
        cell.classList.remove(
            "matched",
            "is-flipped",
            "show"
        );
    });

    resetTurn();
}

function endGame() {
    lockBoard = true;
    stopTimer()
    setTimeout(() => {
        winModal.classList.add("active");
        modMess.innerText = `Congratulations! Your score is ${score}
                            Round time: ${timerEl.textContent}`;
    }, 500);
}

/* Buttons */
startBtn.addEventListener("click", startGame);
resetBtn.addEventListener("click", startGame);
closeModal.addEventListener("click", () => {
    winModal.classList.remove("active");
});
rulBtn.addEventListener("click", () => {
    winModal.classList.add("active");
    modMess.innerHTML = `<h3 class="rules">Rules:</h3>
                        <p class="rText">1 match = 5 points</p>
                        <p class="rText">1 miss = -1 points</p>`
});
menuBtn.addEventListener("click", () => {
    winModal.classList.add("active");
    modMess.innerHTML = `<div class="colors">
                            <h2 class="choose_color">Choose front color</h2>
                            <div class="color_btn-container">
                                <button class="red" id="red">pink</button>
                                <button class="green" id="green">green</button>
                                <button class="yellow" id="yellow">yellow</button>
                            </div>
                            <div class="cCardCont">
                                <div class="card show">
                                    <div class="card_inner">
                                        <div class="card_front" id="card_front">
                                            <div class="card_text"></div>
                                        </div>
                                    <div class="card_back"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    initColorButtons(); // 👈 после создания DOM
});

// function initColorButtons() {
//     const rBtn = document.getElementById("red");
//     const gBtn = document.getElementById("green");
//     const yBtn = document.getElementById("yellow");
//     const cFront = document.getElementById("card_front");

//     rBtn.addEventListener("click", () => {
//         cFront.style.background = "var(--pink)";
//     });

//     gBtn.addEventListener("click", () => {
//         cFront.style.background = "var(--green)";
//     });

//     yBtn.addEventListener("click", () => {
//         cFront.style.background = "var(--yellow)";
//     });
// }
function initColorButtons() {
    const rBtn = document.getElementById("red");
    const gBtn = document.getElementById("green");
    const yBtn = document.getElementById("yellow");
    const cFront = document.getElementById("card_front");

    rBtn.addEventListener("click", () => {
        selectedCardColor = "var(--pink)";
        cFront.style.background = selectedCardColor;
        applyCardColor(); // 👈 обновляем поле
    });

    gBtn.addEventListener("click", () => {
        selectedCardColor = "var(--green)";
        cFront.style.background = selectedCardColor;
        applyCardColor();
    });

    yBtn.addEventListener("click", () => {
        selectedCardColor = "var(--yellow)";
        cFront.style.background = selectedCardColor;
        applyCardColor();
    });
}