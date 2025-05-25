function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

document.addEventListener('DOMContentLoaded', () => {
    const scoreEl = document.getElementById('score');
    const timeEl = document.getElementById('time');
    const startBtn = document.getElementById('startBtn');
    const target = document.getElementById('target');
    const gameArea = document.getElementById('gameArea');

    let score = 0;
    let timeLeft = 30;
    let timerInterval;

    function moveTarget() {
        const maxX = gameArea.clientWidth - target.offsetWidth;
        const maxY = gameArea.clientHeight - target.offsetHeight;
        target.style.left = randomPosition(maxX) + 'px';
        target.style.top = randomPosition(maxY) + 'px';
    }

    function endGame() {
        clearInterval(timerInterval);
        target.classList.add('hidden');
        startBtn.disabled = false;
        startBtn.textContent = 'Restart Game';
    }

    function startGame() {
        score = 0;
        timeLeft = 30;
        scoreEl.textContent = score;
        timeEl.textContent = timeLeft;
        startBtn.disabled = true;
        target.classList.remove('hidden');
        moveTarget();
        timerInterval = setInterval(() => {
            timeLeft--;
            timeEl.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    target.addEventListener('click', () => {
        if (timeLeft <= 0) return;
        score++;
        scoreEl.textContent = score;
        moveTarget();
    });

    startBtn.addEventListener('click', startGame);
});
