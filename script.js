
function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { randomPosition };
}

if (typeof document !== 'undefined') {

document.addEventListener('DOMContentLoaded', () => {
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    const livesEl = document.getElementById('lives');
    const startBtn = document.getElementById('startBtn');
    const player = document.getElementById('player');
    const gameArea = document.getElementById('gameArea');

    let score = 0;
    let timeLeft = 60;
    let lives = 3;
    let updateInterval;
    let timerInterval;
    let spawnInterval;
    const objects = [];
    const playerSpeed = 7;


    function randomPosition(max) {
        return Math.floor(Math.random() * max);
    }


    function isColliding(a, b) {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return !(
            aRect.right < bRect.left ||
            aRect.left > bRect.right ||
            aRect.bottom < bRect.top ||
            aRect.top > bRect.bottom
        );
    }

    function movePlayer(dx) {
        const maxX = gameArea.clientWidth - player.offsetWidth;
        const newLeft = Math.min(maxX, Math.max(0, player.offsetLeft + dx));
        player.style.left = newLeft + 'px';
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') {
            movePlayer(-playerSpeed);
        }
        if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') {
            movePlayer(playerSpeed);
        }
    });

    function spawnObject() {
        const obj = document.createElement('div');
        obj.classList.add('object');
        if (Math.random() < 0.8) {
            obj.classList.add('good');
        } else {
            obj.classList.add('bad');
        }
        const maxX = gameArea.clientWidth - 30;
        obj.style.left = randomPosition(maxX) + 'px';
        obj.style.top = '-30px';
        gameArea.appendChild(obj);
        objects.push(obj);
    }

    function updateObjects() {
        for (let i = objects.length - 1; i >= 0; i--) {
            const obj = objects[i];
            obj.style.top = obj.offsetTop + 2 + 'px';
            if (obj.offsetTop > gameArea.clientHeight) {
                obj.remove();
                objects.splice(i, 1);
                continue;
            }
            if (isColliding(obj, player)) {
                if (obj.classList.contains('good')) {
                    score++;
                    scoreEl.textContent = score;
                } else {
                    lives--;
                    livesEl.textContent = lives;
                    if (lives <= 0) {
                        endGame();
                    }
                }
                obj.remove();
                objects.splice(i, 1);
            }
        }
    }

    function endGame() {
        clearInterval(updateInterval);
        clearInterval(timerInterval);
        clearInterval(spawnInterval);
        objects.forEach((o) => o.remove());
        objects.length = 0;
        player.classList.add('hidden');
        startBtn.disabled = false;
        startBtn.textContent = 'Restart Game';
    }

    function startGame() {
        score = 0;
        timeLeft = 60;
        lives = 3;
        scoreEl.textContent = score;
        timeEl.textContent = timeLeft;
        livesEl.textContent = lives;
        startBtn.disabled = true;
        player.classList.remove('hidden');
        player.style.left = (gameArea.clientWidth - player.offsetWidth) / 2 + 'px';

        spawnObject();
        spawnInterval = setInterval(spawnObject, 1000);
        updateInterval = setInterval(updateObjects, 20);
        timerInterval = setInterval(() => {
            timeLeft--;
            timeEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    startBtn.addEventListener('click', startGame);
});
}
