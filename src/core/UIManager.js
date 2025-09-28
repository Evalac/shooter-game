import { Text } from "pixi.js";

export class UIManager {
  constructor(app) {
    this.app = app;

    this.bulletsText = new Text({
      text: "Bullets: 10",
      style: { fill: 0xffffff, fontSize: 24 },
    });
    this.bulletsText.x = 20;
    this.bulletsText.y = 20;
    app.stage.addChild(this.bulletsText);

    this.timerText = new Text({
      text: "Time: 60",
      style: { fill: 0xffffff, fontSize: 24 },
    });
    this.timerText.x = 20;
    this.timerText.y = 50;
    app.stage.addChild(this.timerText);

    this.messageText = new Text({
      text: "",
      style: { fill: 0xff0000, fontSize: 64, fontWeight: "bold" },
    });
    this.messageText.anchor.set(0.5);
    this.messageText.x = app.screen.width / 2;
    this.messageText.y = app.screen.height / 2;
    app.stage.addChild(this.messageText);

    this.restartButton = null;
  }

  updateBullets(count) {
    this.bulletsText.text = `Bullets: ${count}`;
  }

  updateTimer(time) {
    this.timerText.text = `Time: ${time}`;
  }

  showMessage(text) {
    this.messageText.text = text;
  }

  showRestart(callback) {
    this.restartButton = new Text({
      text: "RESTART",
      style: { fill: 0xffffff, fontSize: 32, fontWeight: "bold" },
    });
    this.restartButton.anchor.set(0.5);
    this.restartButton.x = this.app.screen.width / 2;
    this.restartButton.y = this.app.screen.height / 2 + 100;
    this.restartButton.interactive = true;
    this.restartButton.cursor = "pointer";
    this.restartButton.on("pointerdown", callback);
    this.app.stage.addChild(this.restartButton);
  }

  clearRestart() {
    if (this.restartButton) {
      this.app.stage.removeChild(this.restartButton);
      this.restartButton = null;
    }
  }
}
