// Snake Game Implementation
// Full-featured Snake game with victory condition at 15 points

class SnakeGame {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('gameOverlay');
        this.scoreElement = document.getElementById('scoreValue');
        this.highScoreElement = document.getElementById('highScoreValue');
        this.victoryModal = document.getElementById('victoryModal');

        // Game settings
        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;

        // Game state
        this.resetGameState();
        this.highScore = parseInt(localStorage.getItem('snake-high-score') || '0');

        this.initializeGame();
        this.setupEventListeners();
        this.updateHighScoreDisplay();
    }

    resetGameState() {
        // Initialize snake in center of canvas
        const centerX = Math.floor(this.tileCount / 2);
        const centerY = Math.floor(this.tileCount / 2);
        this.snake = [{ x: centerX, y: centerY }];
        this.food = {};
        this.dx = 0;
        this.dy = 0;
        this.score = 0;
        this.gameRunning = false;
        this.gameStarted = false;
        this.victoryShown = false;
    }

    initializeGame() {
        this.generateFood();
        this.drawGame();
    }

    setupEventListeners() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));

        // Button controls
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('restartButton').addEventListener('click', () => this.restartGame());
        document.getElementById('continueButton').addEventListener('click', () => this.continueGame());
        document.getElementById('returnHomeButton').addEventListener('click', () => {
            window.location.href = 'index.html';
        });

        // Touch controls for mobile
        this.setupTouchControls();
    }

    setupTouchControls() {
        let touchStartX = 0;
        let touchStartY = 0;

        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });

        this.canvas.addEventListener('touchend', (e) => {
            e.preventDefault();
            if (!this.gameRunning) return;

            const touch = e.changedTouches[0];
            const touchEndX = touch.clientX;
            const touchEndY = touch.clientY;

            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;

            const minSwipeDistance = 30;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0 && this.dx !== -1) {
                        this.changeDirection(1, 0); // Right
                    } else if (deltaX < 0 && this.dx !== 1) {
                        this.changeDirection(-1, 0); // Left
                    }
                }
            } else {
                // Vertical swipe
                if (Math.abs(deltaY) > minSwipeDistance) {
                    if (deltaY > 0 && this.dy !== -1) {
                        this.changeDirection(0, 1); // Down
                    } else if (deltaY < 0 && this.dy !== 1) {
                        this.changeDirection(0, -1); // Up
                    }
                }
            }
        });
    }

    handleKeyPress(e) {
        if (!this.gameStarted && (e.code === 'Space' || e.key === ' ')) {
            e.preventDefault();
            this.startGame();
            return;
        }

        if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            this.restartGame();
            return;
        }

        if (!this.gameRunning) return;

        // Movement controls
        switch (e.code) {
            case 'ArrowUp':
            case 'KeyW':
                e.preventDefault();
                if (this.dy !== 1) this.changeDirection(0, -1);
                break;
            case 'ArrowDown':
            case 'KeyS':
                e.preventDefault();
                if (this.dy !== -1) this.changeDirection(0, 1);
                break;
            case 'ArrowLeft':
            case 'KeyA':
                e.preventDefault();
                if (this.dx !== 1) this.changeDirection(-1, 0);
                break;
            case 'ArrowRight':
            case 'KeyD':
                e.preventDefault();
                if (this.dx !== -1) this.changeDirection(1, 0);
                break;
            case 'Space':
                e.preventDefault();
                this.pauseGame();
                break;
        }
    }

    changeDirection(newDx, newDy) {
        this.dx = newDx;
        this.dy = newDy;
    }

    startGame() {
        // Validate game state before starting
        if (!this.validateGameState()) {
            console.error('Invalid game state, resetting...');
            this.resetGameState();
            this.generateFood();
            this.drawGame();
        }

        this.gameRunning = true;
        this.gameStarted = true;
        this.hideOverlay();
        this.gameLoop();
    }

    validateGameState() {
        // Check if snake exists and has at least one segment
        if (!this.snake || this.snake.length === 0) {
            return false;
        }

        // Check if snake head is within bounds
        const head = this.snake[0];
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            return false;
        }

        // Check if food exists and is within bounds
        if (!this.food || this.food.x < 0 || this.food.x >= this.tileCount ||
            this.food.y < 0 || this.food.y >= this.tileCount) {
            return false;
        }

        return true;
    }

    pauseGame() {
        this.gameRunning = !this.gameRunning;
        if (this.gameRunning) {
            this.hideOverlay();
            this.gameLoop();
        } else {
            this.showOverlay('Game Paused', 'Press SPACE to continue');
            document.getElementById('startButton').style.display = 'inline-block';
            document.getElementById('startButton').textContent = 'Continue';
        }
    }

    restartGame() {
        this.resetGameState();
        this.updateScore();
        this.generateFood();
        this.drawGame();
        this.showOverlay('Snake Game', 'Press START GAME button or SPACE to begin. Use arrow keys or WASD to control the snake.');
        document.getElementById('startButton').style.display = 'inline-block';
        document.getElementById('startButton').textContent = 'Start Game';
        document.getElementById('restartButton').style.display = 'none';
        this.hideVictoryModal();
    }

    continueGame() {
        this.hideVictoryModal();
        this.gameLoop();
    }

    gameLoop() {
        if (!this.gameRunning) return;

        setTimeout(() => {
            this.update();
            this.drawGame();
            this.gameLoop();
        }, 150);
    }

    update() {
        // Don't update if snake isn't moving yet
        if (this.dx === 0 && this.dy === 0) {
            return;
        }

        const head = { x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy };

        // Check wall collision
        if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
            this.gameOver();
            return;
        }

        // Check self collision
        for (let segment of this.snake) {
            if (head.x === segment.x && head.y === segment.y) {
                this.gameOver();
                return;
            }
        }

        this.snake.unshift(head);

        // Check food collision
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score++;
            this.updateScore();
            this.generateFood();

            // Check victory condition
            if (this.score === 15 && !this.victoryShown) {
                this.showVictory();
                return;
            }
        } else {
            this.snake.pop();
        }
    }

    generateFood() {
        let attempts = 0;
        const maxAttempts = 100; // Prevent infinite loop

        do {
            this.food = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            attempts++;
        } while (
            attempts < maxAttempts &&
            this.snake.some(segment => segment.x === this.food.x && segment.y === this.food.y)
        );

        // Fallback if we can't find a spot (shouldn't happen in normal gameplay)
        if (attempts >= maxAttempts) {
            this.food = { x: 0, y: 0 };
        }
    }

    drawGame() {
        // Clear canvas
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--card-background').trim();
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw snake
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
        for (let i = 0; i < this.snake.length; i++) {
            const segment = this.snake[i];
            // Head is slightly different color and has a subtle pulse when waiting
            if (i === 0) {
                this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent-blue').trim();

                // Add subtle pulse effect when game is started but snake hasn't moved yet
                if (this.gameRunning && this.dx === 0 && this.dy === 0) {
                    const pulse = Math.sin(Date.now() * 0.005) * 0.1 + 0.9;
                    this.ctx.globalAlpha = pulse;
                }
            } else {
                this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-blue').trim();
                this.ctx.globalAlpha = 1;
            }

            this.ctx.fillRect(
                segment.x * this.gridSize + 1,
                segment.y * this.gridSize + 1,
                this.gridSize - 2,
                this.gridSize - 2
            );
        }

        // Reset alpha
        this.ctx.globalAlpha = 1;

        // Draw food
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--secondary-blue').trim();
        this.ctx.beginPath();
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2,
            this.food.y * this.gridSize + this.gridSize / 2,
            this.gridSize / 2 - 2,
            0,
            2 * Math.PI
        );
        this.ctx.fill();
    }

    updateScore() {
        this.scoreElement.textContent = this.score;
        if (this.score > this.highScore) {
            this.highScore = this.score;
            this.updateHighScoreDisplay();
            localStorage.setItem('snake-high-score', this.highScore.toString());
        }
    }

    updateHighScoreDisplay() {
        this.highScoreElement.textContent = this.highScore;
    }

    gameOver() {
        this.gameRunning = false;
        this.showOverlay('Game Over!', `Final Score: ${this.score}`);
        document.getElementById('startButton').style.display = 'none';
        document.getElementById('restartButton').style.display = 'inline-block';
    }

    showVictory() {
        this.gameRunning = false;
        this.victoryShown = true;
        this.victoryModal.classList.add('show');

        // Add extra celebration effects
        this.createCelebrationEffect();
    }

    createCelebrationEffect() {
        // Add screen shake effect
        document.body.style.animation = 'shake 0.5s ease-in-out 3';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 1500);
    }

    showOverlay(title, message) {
        document.getElementById('overlayTitle').textContent = title;
        document.getElementById('overlayMessage').textContent = message;
        this.overlay.classList.remove('hidden');
    }

    hideOverlay() {
        this.overlay.classList.add('hidden');
    }

    hideVictoryModal() {
        this.victoryModal.classList.remove('show');
    }
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    const game = new SnakeGame();

    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
});
