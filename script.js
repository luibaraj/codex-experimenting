function randomPosition(max) {
    return Math.floor(Math.random() * max);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { randomPosition };
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const startBtn = document.getElementById('startBtn');
        const scoreEl = document.getElementById('score');

        const tileCount = 20;
        const tileSize = canvas.width / tileCount;

        let snake;
        let apple;
        let velocity;
        let score;
        let gameInterval;

        function resetGame() {
            snake = [{ x: Math.floor(tileCount / 2), y: Math.floor(tileCount / 2) }];
            apple = { x: randomPosition(tileCount), y: randomPosition(tileCount) };
            velocity = { x: 0, y: 0 };
            score = 0;
            scoreEl.textContent = score;
            draw();
        }

        function drawCell(x, y, color) {
            ctx.fillStyle = color;
            ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawCell(apple.x, apple.y, 'red');
            snake.forEach((seg, idx) => {
                drawCell(seg.x, seg.y, idx === 0 ? 'green' : 'lime');
            });
        }

        function update() {
            const head = {
                x: snake[0].x + velocity.x,
                y: snake[0].y + velocity.y,
            };

            if (
                head.x < 0 ||
                head.x >= tileCount ||
                head.y < 0 ||
                head.y >= tileCount
            ) {
                endGame();
                return;
            }

            for (const seg of snake) {
                if (head.x === seg.x && head.y === seg.y) {
                    endGame();
                    return;
                }
            }

            snake.unshift(head);

            if (head.x === apple.x && head.y === apple.y) {
                score++;
                scoreEl.textContent = score;
                apple = { x: randomPosition(tileCount), y: randomPosition(tileCount) };
            } else {
                snake.pop();
            }

            draw();
        }

        function endGame() {
            clearInterval(gameInterval);
            startBtn.disabled = false;
            startBtn.textContent = 'Restart';
        }

        function startGame() {
            resetGame();
            startBtn.disabled = true;
            startBtn.textContent = 'Playing...';
            velocity = { x: 1, y: 0 };
            gameInterval = setInterval(update, 100);
        }

        document.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    if (velocity.y === 1) break;
                    velocity = { x: 0, y: -1 };
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    if (velocity.y === -1) break;
                    velocity = { x: 0, y: 1 };
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    if (velocity.x === 1) break;
                    velocity = { x: -1, y: 0 };
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    if (velocity.x === -1) break;
                    velocity = { x: 1, y: 0 };
                    break;
            }
        });

        startBtn.addEventListener('click', startGame);
    });
}
