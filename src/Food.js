export class Food {
    constructor(gridSize, app) {
      this.gridSize = gridSize;
      this.app = app;
      this.position = this.spawn();
    }
  
    spawn(excludePositions = []) {
      let newPosition;
      do {
        newPosition = {
          x: Math.floor(Math.random() * (this.app.screen.width / this.gridSize)),
          y: Math.floor(Math.random() * (this.app.screen.height / this.gridSize)),
        };
      } while (
        excludePositions.some(
          (pos) => pos.x === newPosition.x && pos.y === newPosition.y
        )
      );
  
      this.position = newPosition;
      return this.position;
    }
  }