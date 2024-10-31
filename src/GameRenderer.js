import { Graphics } from "pixi.js";

export class GameRenderer {
    constructor(app, gridSize) {
      this.app = app;
      this.gridSize = gridSize;
      this.snakeGraphics = new Graphics();
      this.foodGraphics = new Graphics();
      this.app.stage.addChild(this.snakeGraphics);
      this.app.stage.addChild(this.foodGraphics);
    }
  
    drawSnake(segments) {
      this.snakeGraphics.clear(); // Clear previous image
      this.snakeGraphics.fill(0x00ff00);  // Set fill color
      segments.forEach((segment) => {
        this.snakeGraphics.rect(
          segment.x * this.gridSize,
          segment.y * this.gridSize,
          this.gridSize,
          this.gridSize
        );
      });
      this.snakeGraphics.fill(); // Finish filling
    }
  
    drawFood(foodPosition) {
      this.foodGraphics.clear();
      this.foodGraphics.fill(0xff0000);
      this.foodGraphics.rect(
        foodPosition.x * this.gridSize,
        foodPosition.y * this.gridSize,
        this.gridSize,
        this.gridSize
      );
      this.foodGraphics.fill(); 
    }
  }