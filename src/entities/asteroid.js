import { Sprite } from "pixi.js";

export class Asteroid {
  constructor(texture, app) {
    this.sprite = new Sprite(texture);
    this.sprite.anchor.set(0.5);
    this.sprite.scale.set(0.9);

    this.sprite.x =
      Math.random() * (app.screen.width - this.sprite.width) +
      this.sprite.width / 2;
    this.sprite.y =
      Math.random() * (app.screen.height - 300 - this.sprite.height) +
      this.sprite.height / 2;

    app.stage.addChild(this.sprite);
  }

  update(delta) {
    this.sprite.rotation += 0.01 * delta;
  }
}
