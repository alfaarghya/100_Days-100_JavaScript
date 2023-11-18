// const snakeGame = () => {

let gameOver = false;
let snakeX = 5, snakeY = 5; //snake position
let foodX, foodY;   //food position
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let score = 0;
let highScore = localStorage.getItem("high-score") || 0; // Get high score
let setIntervalId;

const highScoreElement = document.querySelector(".high-score");
highScoreElement.innerText = `High Score: ${highScore}`;


const startGame = () => {
    if (gameOver) return handleGameOver();

    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;//food position

    // snake eats the food
    if (snakeX === foodX && snakeY === foodY) {
        updateFoodPosition();
        snakeBody.push([foodY, foodX]); //increase snake size
        score++;
        highScore = score >= highScore ? score : highScore; //calculate high score

        //set the score and high-score
        localStorage.setItem("high-score", highScore);
        document.querySelector(".score").innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        console.log(snakeBody);
    }

    // Update Snake Head
    snakeX += velocityX;
    snakeY += velocityY;

    //snake moves
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // is snake crash?
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }

    // increase snake body
    for (let i = 0; i < snakeBody.length; i++) {
        html += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // snake head hit to his body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    document.querySelector(".game-board").innerHTML = html;
};

//game over
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over!");
    location.reload();
}

// generate food in random position
const updateFoodPosition = () => {
    const generateRandomPosition = () => {
        return Math.floor(Math.random() * 30) + 1;
    }
    foodX = generateRandomPosition();
    foodY = generateRandomPosition();
}

// Change snake direction
const changeDirection = e => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Change Direction on each key click
document.querySelectorAll(".controller i")
    .forEach(button => button.addEventListener("click", () =>
        changeDirection({ key: button.dataset.key })));

updateFoodPosition();
setIntervalId = setInterval(startGame, 100);
document.addEventListener("keyup", changeDirection);
// };
// snakeGame();
