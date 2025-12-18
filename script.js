/*---------------------Emoji array-----------------------*/
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
/*---------------------Emoji array-----------------------*/

/*---------------------Variables-----------------------*/
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
let selectedCardColor = "var(--blue)";  // default card color
let selectedCardColor2 = "var(--cold)"; // default card color

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let startTime = null;
let timerInterval = null;
/*---------------------Variables-----------------------*/

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
    const backs = document.querySelectorAll(".card_back");
    backs.forEach(back => {
        back.style.background = selectedCardColor2;
    });
}

/* Launching the game */
function startGame() {
    score = 0;
    scoreEl.textContent = score;
    stopTimer();          // if restart
    startTimer();         // start
    resetBoard();
    cardContainer.classList.add("active");

    // 1. Choose 6 random cards
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
        const back = cell.querySelector(".card_back");
        front.style.background = selectedCardColor;
        back.style.background = selectedCardColor2;

        cell.classList.remove("matched");
        cell.addEventListener("click", handleCardClick);
        // cell.addEventListener('click', function () {
        //     this.classList.add('is-flipped');
        // });
        setTimeout(() => {
        cell.classList.add('show');
    }, index * 150); // delay for a beautiful effect

    });
}

/* Buttons click */
function handleCardClick() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    this.classList.add("is-flipped");
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

    // to avoid creating the image again
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

/* Check for end of the game */
function checkWin() {
    const matchedCards = document.querySelectorAll(".card.matched");

    // Total cards = cells.length
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
                        <p class="rText">1 miss = -1 points</p>
                        <p class="roText">To start the game, press Enter, Space or Start Game</p>`
});
menuBtn.addEventListener("click", () => {
    winModal.classList.add("active");
    modMess.innerHTML = `<div class="colors">
                            <h2 class="choose_color">Choose front color</h2>
                            <div class="color_btn-container">
                                <button class="blue" id="blue">pink</button>
                                <button class="violet" id="violet">violet</button>
                                <button class="green" id="green">green</button>
                                <button class="red" id="red">red</button>
                                <button class="orange" id="orange">orange</button>
                            </div>
                            <div class="cCardCont">
                                <div class="card show">
                                    <div class="card_inner">
                                        <div class="card_front preview_front">
                                            <div class="card_text"></div>
                                        </div>
                                    <div class="card_back preview_back"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="colors">
                            <h2 class="choose_color">Choose back color</h2>
                            <div class="color_btn-container">
                                <button class="gold" id="gold">gold</button>
                                <button class="cold" id="cold">cold</button>
                                <button class="eco_green" id="eco_green">eco green</button>
                                <button class="new_violet" id="new_violet">rainbow</button>
                                <button class="varm_red" id="varm_red">varm red</button>
                            </div>
                            <div class="cCardCont">
                                <div class="card show is-flipped">
                                    <div class="card_inner">
                                        <div class="card_front preview_front">
                                            <div class="card_text"></div>
                                        </div>
                                    <div class="card_back preview_back" is-flipped"></div>
                                </div>
                            </div>
                        </div>
                    </div>`;

    initColorButtons(); // after DOM creation
});


function initColorButtons() {
    // const blueBtn = document.getElementById("blue");
    // const violetBtn = document.getElementById("violet");
    // const greenBtn = document.getElementById("green");
    // const redBtn = document.getElementById("red");
    // const orangeBtn = document.getElementById("orange");
    // const goldBtn = document.getElementById("gold");
    // const coldBtn = document.getElementById("cold");
    // const eco_greenBtn = document.getElementById("eco_green");
    // const new_violetBtn = document.getElementById("new_violet");
    // const varm_redBtn = document.getElementById("varm_red");
    // const cFront = document.getElementById("card_front");
    // const cBack = document.getElementById("card_back");

    // blueBtn.addEventListener("click", () => {
    //     selectedCardColor = "var(--blue)";
    //     cFront.style.background = selectedCardColor;
    //     applyCardColor();
    // });

    // violetBtn.addEventListener("click", () => {
    //     selectedCardColor = "var(--violet)";
    //     cFront.style.background = selectedCardColor;
    //     applyCardColor();
    // });

    // greenBtn.addEventListener("click", () => {
    //     selectedCardColor = "var(--green)";
    //     cFront.style.background = selectedCardColor;
    //     applyCardColor();
    // });
    // redBtn.addEventListener("click", () => {
    //     selectedCardColor = "var(--red)";
    //     cFront.style.background = selectedCardColor;
    //     applyCardColor();
    // });
    // orangeBtn.addEventListener("click", () => {
    //     selectedCardColor = "var(--orange)";
    //     cFront.style.background = selectedCardColor;
    //     applyCardColor();
    // });
    // goldBtn.addEventListener("click", () => {
    //     selectedCardColor2 = "var(--gold)";
    //     cBack.style.background = selectedCardColor2;
    //     applyCardColor();
    // });
    // coldBtn.addEventListener("click", () => {
    //     selectedCardColor2 = "var(--cold)";
    //     cBack.style.background = selectedCardColor2;
    //     applyCardColor();
    // });
    // eco_greenBtn.addEventListener("click", () => {
    //     selectedCardColor2 = "var(--eco_green)";
    //     cBack.style.background = selectedCardColor2;
    //     applyCardColor();
    // });
    // new_violetBtn.addEventListener("click", () => {
    //     selectedCardColor2 = "var(--new_violet)";
    //     cBack.style.background = selectedCardColor2;
    //     applyCardColor();
    // });
    // varm_redBtn.addEventListener("click", () => {
    //     selectedCardColor2 = "var(--varm_red)";
    //     cBack.style.background = selectedCardColor2;
    //     applyCardColor();
    // });

    /*------------------------Colors settings-----------------------------------*/
    const previewFront = document.querySelector(".preview_front");
    const previewBack = document.querySelector(".preview_back");

    document.getElementById("blue").onclick = () => {
        selectedCardColor = "var(--blue)";
        previewFront.style.background = selectedCardColor;
        applyCardColor();
    };

    document.getElementById("violet").onclick = () => {
        selectedCardColor = "var(--violet)";
        previewFront.style.background = selectedCardColor;
        applyCardColor();
    };

    document.getElementById("green").onclick = () => {
        selectedCardColor = "var(--green)";
        previewFront.style.background = selectedCardColor;
        applyCardColor();
    };

    document.getElementById("red").onclick = () => {
        selectedCardColor = "var(--red)";
        previewFront.style.background = selectedCardColor;
        applyCardColor();
    };

    document.getElementById("orange").onclick = () => {
        selectedCardColor = "var(--orange)";
        previewFront.style.background = selectedCardColor;
        applyCardColor();
    };

    document.getElementById("cold").onclick = () => {
        selectedCardColor2 = "var(--cold)";
        previewBack.style.background = selectedCardColor2;
        applyCardColor();
    };

    document.getElementById("gold").onclick = () => {
        selectedCardColor2 = "var(--gold)";
        previewBack.style.background = selectedCardColor2;
        applyCardColor();
    };


    document.getElementById("eco_green").onclick = () => {
        selectedCardColor2 = "var(--eco_green)";
        previewBack.style.background = selectedCardColor2;
        applyCardColor();
    };

    document.getElementById("new_violet").onclick = () => {
        selectedCardColor2 = "var(--new_violet)";
        previewBack.style.background = selectedCardColor2;
        applyCardColor();
    };

    document.getElementById("varm_red").onclick = () => {
        selectedCardColor2 = "var(--varm_red)";
        previewBack.style.background = selectedCardColor2;
        applyCardColor();
    };
}

document.addEventListener("keydown", (e) => {
    // so that the space bar doesn't scroll the page
    if (e.code === "Space") {
        e.preventDefault();
        // preventDefault() is needed to prevent the spacebar from scrolling the page.
        // Protection against launching the game when a modal window is open.
    }

    if (e.code === "Space" || e.code === "Enter") {
        // If the mod is open, don't start the game.
        if (winModal.classList.contains("active")) return;

        startGame();
    }
});
// Close the game by pressing Esc.
document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && winModal.classList.contains("active")) {
        winModal.classList.remove("active");
    }
});
