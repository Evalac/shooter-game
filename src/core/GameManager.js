import { UIManager } from "./UIManager";
import { Controls } from "./Controls";
import { Level1 } from "../levels/level1";
import { Level2 } from "../levels/level2";

export class GameManager {
  constructor(app, textures) {
    this.app = app;
    this.textures = textures;
    this.ui = new UIManager(app);
    this.controls = new Controls();

    this.currentLevel = null;
    this.levelNumber = 1;
    this.gameOver = false;

    this.timeLeft = 60;
    setInterval(() => {
      if (!this.gameOver) {
        this.timeLeft--;
        this.ui.updateTimer(this.timeLeft);
        if (this.timeLeft <= 0) this.endGame("LOSE");
      }
    }, 1000);
  }

  start(level) {
    this.ui.clearRestart();
    this.levelNumber = level;
    this.timeLeft = 60;
    this.ui.updateTimer(this.timeLeft);

    if (level === 1) {
      this.currentLevel = new Level1(
        this.app,
        this.ui,
        this.controls,
        this.textures
      );
      this.currentLevel.init();
    } else if (level === 2) {
      this.currentLevel = new Level2(
        this.app,
        this.ui,
        this.controls,
        this.textures
      );
      this.currentLevel.init(this.currentLevel.ship);
    }

    this.gameOver = false;
  }

  update(delta) {
    if (this.gameOver) return;

    const result = this.currentLevel.update(delta);
    if (result === "NEXT") this.start(2);
    if (result === "WIN") this.endGame("YOU WIN");
    if (result === "LOSE") this.endGame("YOU LOSE");
  }

  endGame(message) {
    this.gameOver = true;
    this.ui.showMessage(message);
    this.ui.showRestart(() => this.start(1));
  }
}
