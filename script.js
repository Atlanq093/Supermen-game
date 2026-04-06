const game = document.getElementById('game-container')
const bonus = document.getElementById('bonuses-container')
const timer = document.getElementById('timer')
const score = document.getElementById('score')
const tries = document.getElementById('tries')
const message = document.getElementById('message')
const gameOver = document.getElementById('game-over')
const restartBtn = document.getElementById('restart-btn')
const superman = document.getElementById('supermen-1')
const background = document.getElementById('background')
const startBtn = document.getElementById('startBtn')
const obstaclesContainer = document.getElementById('obstacles-container')
const images= [
    "images/1.png",
     "images/2.png",
      "images/3.png",
       "images/4.png",
        "images/5.png",
         "images/6.png",
          "images/7.png",
          
];


//Zmienne
let triesCount = 0;
let scoreCount = 0;
let seconds = 0;
const bonusImage = "images/logo.png";
let supermanY = 220;      // startowa pozycja
let velocityY = 0;        // prędkość
const gravity = 0.5;      // siła grawitacji
const jumpForce = -8; 
let obstacleInterval = null;
let gameRunning = false;
 //Button 

startBtn.addEventListener('click', () => {
    message.classList.add('hidden')
    startBtn.classList.add('hidden')
    gameStart()
})

function gameStart() {
        triesCount = 0;
        scoreCount = 0;
        seconds = 0;
        supermanY = 220;
        gameRunning = true;  // ← czy to masz?
    supermanY = 220;
    velocityY = 0;
    superman.style.top = supermanY + 'px';
        tries.innerHTML='Próby:0;'
         score.innerHTML='Punkty:0;'
        timer.innerHTML='Czas:0;'
         superman.classList.remove('hidden');
         obstaclesContainer.innerHTML = '';
    
    obstacleInterval = setInterval(() => {
        if (gameRunning) createObstacle();
    }, 1000);
         startTimer();
    requestAnimationFrame(gameLoop);

        
}

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        timer.innerHTML = `Czas: ${seconds}s`;
    }, 1000);
}

function endGame() {
   clearInterval(timerInterval);
    gameRunning = false;
    superman.classList.add('hidden');
    gameOver.classList.remove('hidden');
   document.getElementById('final-score').innerHTML = `Wynik: ${scoreCount}`;
    triesCount++;
    tries.innerHTML = `Próby: ${triesCount}`;
}



document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && gameRunning) {
        velocityY = jumpForce;
    }
});


function gameLoop() {
    if (!gameRunning) return;

 
    velocityY += gravity;
    supermanY += velocityY;
    superman.style.top = supermanY + 'px';

   
    if (supermanY <= 0 || supermanY >= 440) {
        endGame();
        return;
    }
   moveObstacles();
   
    requestAnimationFrame(gameLoop);
}

function moveObstacles() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obs => {
        const currentLeft = parseInt(obs.style.left);
        obs.style.left = (currentLeft - 3) + 'px';

        if (currentLeft < -100) {
            obs.remove();
            scoreCount++;
            score.innerHTML = `Punkty: ${scoreCount}`;
        }
    });
}
//budynki 
   function createObstacle() {
    const gapTop = Math.floor(Math.random() * 200) + 80;
    const gapBottom = gapTop + 150;
    const losowy = Math.floor(Math.random() * 4) + 1;

    // górny budynek
    const top = document.createElement('img');
    top.src = `images/${losowy}.png`;
    top.classList.add('obstacle', 'obstacle-top');
    top.style.height = gapTop + 'px';
    top.style.top = '0';
    top.style.left = '500px';
    top.style.transform = "rotate(180deg)";

    // dolny budynek
    const bottom = document.createElement('img');
    bottom.src = `images/${losowy}.png`;
    bottom.classList.add('obstacle', 'obstacle-bottom');
    bottom.style.height = (500 - gapBottom) + 'px';
    bottom.style.top = gapBottom + 'px';
    bottom.style.left = '500px';

    obstaclesContainer.appendChild(top);
    obstaclesContainer.appendChild(bottom);
}

function checkCollision(player, obstacle) {
    const playerRect = player.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        playerRect.top > obstacleRect.bottom ||
        playerRect.bottom < obstacleRect.top ||
        playerRect.left > obstacleRect.right ||
        playerRect.right < obstacleRect.left
    );
}
function resetObstacles() {
    const obstacles = document.querySelectorAll('.obstacle');
    obstacles.forEach(obstacle => obstacle.remove());
}

restartBtn.addEventListener('click', () => {
    message.classList.remove('hidden')
    startBtn.classList.remove('hidden')
    gameOver.classList.add('hidden')
    superman.classList.add('hidden')
        resetObstacles();
})