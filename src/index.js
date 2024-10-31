import { Application } from "pixi.js";
import { Game } from "./Game";

(async () => {
    const gridSize = 20;
    const gridCount = 20;
    const screenWidth = gridSize * gridCount;
    const screenHeight = gridSize * gridCount;
  
    const gameArea = document.getElementById("game-area");
  
    const app = new Application();
    await app.init({
      width: screenWidth,
      height: screenHeight,
      backgroundColor: 0x65666,
    });
  
    gameArea.appendChild(app.canvas); 
  
    const game = new Game(app);
  
    app.ticker.add(game.gameLoop.bind(game));
  })();