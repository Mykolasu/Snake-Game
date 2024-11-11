export class Snake {
    constructor(gridSize) {
      this.gridSize = gridSize;
      this.direction = { x: 1, y: 0 };
      this.segments = [];
    }
  
    reset() {
      this.segments = [
        { x: 3, y: 3 },
        { x: 2, y: 3 },
        { x: 1, y: 3 },
      ];
      this.direction = { x: 1, y: 0 };
    }
  
    move() {
      const newHead = {
        x: this.segments[0].x + this.direction.x,
        y: this.segments[0].y + this.direction.y,
      };
  
      // Add new head
      this.segments.unshift(newHead);
  
      return newHead; 
    }
  
    changeDirection(key) {
      if (key === "ArrowUp" && this.direction.y === 0)
        this.direction = { x: 0, y: -1 };
      if (key === "ArrowDown" && this.direction.y === 0)
        this.direction = { x: 0, y: 1 };
      if (key === "ArrowLeft" && this.direction.x === 0)
        this.direction = { x: -1, y: 0 };
      if (key === "ArrowRight" && this.direction.x === 0)
        this.direction = { x: 1, y: 0 };
    }
  }