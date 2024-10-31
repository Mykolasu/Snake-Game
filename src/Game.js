import { Snake } from "./Snake";
import { Food } from "./Food";
import { GameRenderer } from "./GameRenderer";

export class Game {
  constructor(app) {
    this.app = app;
    this.gridSize = 20;
    this.gridCount = 20;
    this.defaultSpeed = 30;
    this.snakeSpeed = this.defaultSpeed;
    this.frameCount = 0;
    this.gameOver = false;
    this.snake = new Snake(this.gridSize);
    this.food = new Food(this.gridSize, this.app);
    this.renderer = new GameRenderer(this.app, this.gridSize);

    this.currentScore = 0; // Snake's food counter
    this.bestScore = this.getBestScore(); // Get the best score from local storage
    this.gameMode = "classic";

    this.resetGame();
    this.initEventListeners();
    this.app.ticker.stop();
    this.updateScoreDisplay();
  }

  resetGame() {
    this.snake.reset();
    this.food.spawn(this.snake.segments);
    this.gameOver = false;
    this.frameCount = 0;
    this.currentScore = 0;
    this.snakeSpeed = this.defaultSpeed;

    this.renderer.drawSnake(this.snake.segments);
    this.renderer.drawFood(this.food.position);
    this.updateScoreDisplay();
  }

  startGame() {
    const classicMode = document.getElementById("classic").checked;
    const immortalMode = document.getElementById("no-die").checked;
    const speedMode = document.getElementById("speed").checked;

    // Ensure at least one mode is selected
    if (!classicMode && !immortalMode && !speedMode) {
      console.warn("Select at least one game mode.");
      return; // Exit if no mode is selected
    }

    this.gameMode = classicMode
      ? "classic"
      : immortalMode
      ? "immortal"
      : "speed";

    if (classicMode && !speedMode) {
      this.snakeSpeed = this.defaultSpeed;
    }

    this.resetGame();
    this.app.ticker.start(); // Start ticker on button press
  }

  gameLoop() {
    if (this.gameOver) return;
    this.frameCount++;

    if (this.frameCount % this.snakeSpeed !== 0) return;

    const newHead = this.snake.move();

    const collision = this.isCollision(newHead);
    console.log("Collision?", collision);

    if (this.gameMode === "classic" && collision) {
      this.gameOver = true;
      this.app.ticker.stop(); // Stop game on collision
      console.log("Game over!");
      this.updateBestScore();
      return;
    }

    const ateFood =
      newHead.x === this.food.position.x && newHead.y === this.food.position.y;
    if (ateFood) {
      this.food.spawn(this.snake.segments);
      this.currentScore++; // Increase food counter

      // Increase speed if "Speed" mode is active
      if (this.isModeEnabled("speed")) {
        this.snakeSpeed = Math.max(1, Math.floor(this.snakeSpeed * 0.9)); // Increase speed by 10%
      }

      console.log("+1");
      this.updateScoreDisplay(); // Update score display
    } else {
      this.snake.segments.pop(); // Remove last segment if food is not eaten
    }

    this.renderer.drawSnake(this.snake.segments);
    this.renderer.drawFood(this.food.position);
  }

  isModeEnabled(mode) {
    return document.getElementById(mode).checked; // Check if the mode is active
  }

  updateScoreDisplay() {
    document.getElementById("current-score").textContent = this.currentScore;
    document.getElementById("best-score").textContent = this.bestScore;
  }

  updateBestScore() {
    if (this.currentScore > this.bestScore) {
      localStorage.setItem("bestScore", this.currentScore);
      this.bestScore = this.currentScore; // Update the best score
    }
  }

  getBestScore() {
    return parseInt(localStorage.getItem("bestScore")) || 0; // Retrieve best score from local storage
  }

  isCollision(newHead) {
    // Check collision with boundaries
    if (
      newHead.x < 0 ||
      newHead.x >= this.gridCount ||
      newHead.y < 0 ||
      newHead.y >= this.gridCount
    ) {
      if (this.gameMode === "immortal") {
        // For immortal mode, move the snake to the opposite side
        if (newHead.x < 0) newHead.x = this.gridCount - 1;
        if (newHead.x >= this.gridCount) newHead.x = 0;
        if (newHead.y < 0) newHead.y = this.gridCount - 1;
        if (newHead.y >= this.gridCount) newHead.y = 0;
        return false; // No collision
      }
      return true; // Collision with wall in other cases
    }

    return this.snake.segments.some(
      (segment, index) =>
        index !== 0 && segment.x === newHead.x && segment.y === newHead.y
    );
  }

  initEventListeners() {
    window.addEventListener("keydown", (e) => {
      this.snake.changeDirection(e.key);
    });

    document
      .getElementById("play-button")
      .addEventListener("click", () => this.startGame());
  }
}
