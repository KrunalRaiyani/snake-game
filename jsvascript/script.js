// variables
let inputDir = { x: 0, y: 0 };
let speed = 6;
let lastPaintTime = 0;
let snakeArr = [{ x: 12, y: 10 }]
let food = { x: 5, y: 10 };
let score = 0;
let hiscore = 0;
let gameStart = false
let bord = document.getElementById("bord");
let scoreBox = document.getElementById("score");
let HiScoreBox = document.getElementById("hiscore");
let snakeHead = document.querySelector(".head");
let selectSpeed = document.getElementById("selectSpeed");

// sound effects
const move = new Audio('music/move.mp3')
const eat = new Audio('music/eat.mp3')
const gameOver = new Audio('music/gameover.wav')

alert("Press any key to start game")

// change speed options

selectSpeed.addEventListener('change', (e) => {
    speed = Number(selectSpeed.value)
    selectSpeed.blur()
})

// all main functions starts hear

// loop function for movenent
function main(ctime) {

    if (gameStart) {
        window.requestAnimationFrame(main)
    }

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime
    startGame()
}


// game over logic
function gameover(sArr) {
    for (let i = 1; i < sArr.length; i++) {
        if (sArr[0].x === sArr[i].x && sArr[0].y === sArr[i].y) {
            return true;
        }
    }
    if (sArr[0].x >= 18 || sArr[0].x <= 0 || sArr[0].y >= 18 || sArr[0].y <= 0) {
        return true;
    }
}

// start the game
function startGame() {
    // update food partical and gameover
    if (gameover(snakeArr)) {
        gameOver.play()
        inputDir = { x: 0, y: 0 }
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
        setTimeout(() => {
            alert("Game over press any key to start game")
            snakeArr = [{ x: 12, y: 10 }]
        }, 100);
        setTimeout(() => {
            gameStart = false
        }, 200);
    }

    // if snake eat food place new food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        eat.play()
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        score += 1;
        if (score > hiscore) {
            hiscore = score
            localStorage.setItem("hiscore", JSON.stringify(hiscore))
            HiScoreBox.innerHTML = "High Score: " + hiscore
        }
        scoreBox.innerHTML = "Score: " + score;
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // move the snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }

    }
    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y

    // display snake and food in bord
    bord.innerHTML = ''

    // display the snake
    snakeArr.forEach((e, i) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (i === 0) {
            snakeElement.classList.add("head")
        }
        else {
            snakeElement.classList.add("body")
        }
        bord.appendChild(snakeElement)
    })

    // display the food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    bord.appendChild(foodElement)

}


// main logic and cantrolers

// highscore funcanality
let localHiScore = localStorage.getItem("hiscore")

if (!localHiScore) {
    localStorage.setItem("hiscore", JSON.stringify(hiscore))
}
else {
    hiscore = JSON.parse(localStorage.getItem("hiscore"))
    HiScoreBox.innerHTML = "High Score: " + hiscore
}


// on kebord cantrolers
window.addEventListener('keydown', (e) => {
    window.requestAnimationFrame(main)
    gameStart = true

    inputDir = { x: 0, y: 1 }
    move.play()

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
})


// on in display buttons cantrolers
function clickBtn(e) {
    window.requestAnimationFrame(main)
    gameStart = true

    inputDir = { x: 0, y: 1 }
    move.play()

    switch (e) {
        case "up":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "down":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "left":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "right":
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
}