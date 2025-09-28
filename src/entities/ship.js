import { Sprite } from "pixi.js";
import { createBullet } from "../helpers/common";

export class Ship {
  constructor(texture, app) {
    this.app = app;
    this.sprite = new Sprite(texture);
    this.sprite.scale.set(0.5);
    this.sprite.x = app.screen.width / 2 - this.sprite.width / 2;
    this.sprite.y = app.screen.height - 200;
    app.stage.addChild(this.sprite);

    this.speed = 20;
    this.bullets = [];
    this.bulletCount = 10;
  }

  moveRight() {
    this.sprite.x += this.speed;
  }

  moveLeft() {
    this.sprite.x -= this.speed;
  }

  shoot() {
    if (this.bulletCount <= 0) return;
    const bullet = createBullet(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y
    );
    this.app.stage.addChild(bullet);
    this.bullets.push(bullet);
    this.bulletCount--;
  }

  update() {
    if (this.sprite.x < 0) this.sprite.x = 0;
    if (this.sprite.x + this.sprite.width > this.app.screen.width) {
      this.sprite.x = this.app.screen.width - this.sprite.width;
    }

    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.y += bullet.speed;

      if (bullet.y < 0) {
        this.app.stage.removeChild(bullet);
        this.bullets.splice(i, 1);
      }
    }
  }
}
