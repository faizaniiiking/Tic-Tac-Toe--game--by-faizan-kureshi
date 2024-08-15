


let boxes = document.querySelectorAll(".cell");
let resetBtn = document.querySelector("#restartBtn");
let newGameBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msgContainer");
let resultContainer = document.querySelector("#resultMsg");
const placeSound = new Audio('Click.mp3');
const winSound = new Audio('win.mp3');
const resetSound = new Audio('reset.mp3');
const backgroundSound = new Audio('bgs.mp3');
backgroundSound.loop = true; 
backgroundSound.play();



let turnO = true;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    resultContainer.innerText = ""; // Clear the previous result
    resetSound.play()
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return; // Prevent overwriting box content

        box.innerText = turnO ? "O" : "X";
        placeSound.play()
        turnO = !turnO;

        box.style.pointerEvents = "none";
        checkWinner() || checkDraw();
    });
});

const disableBoxes = () => {
    boxes.forEach(box => box.style.pointerEvents = "none");
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.style.pointerEvents = "auto";
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    resultContainer.innerText = `Congratulations, the winner is ${winner}!`;
    msgContainer.classList.remove("hide");
    winSound.play()
    disableBoxes();
};

const checkWinner = () => {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
            showWinner(boxes[a].innerText);
            return true; // Exit early if a winner is found
        }
        return false;
    });
};

const checkDraw = () => {
    if ([...boxes].every(box => box.innerText !== "") && resultContainer.innerText === "") {
        resultContainer.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
