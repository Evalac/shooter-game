import { Sprite, Text } from "pixi.js";
import { createBullet } from "../helpers/common";

export class Boss {
  constructor(texture, app) {
    this.app = app;
    this.sprite = new Sprite(texture);
    this.sprite.scale.set(1.5);
    this.sprite.anchor.set(0.5);
    this.sprite.x = app.screen.width / 2;
    this.sprite.y = 150;
    app.stage.addChild(this.sprite);

    this.hp = 4;
    this.bullets = [];
    this.speed = 3;
    this.direction = 1;

    // HP Text
    this.hpText = new Text({
      text: `Boss HP: ${this.hp}`,
      style: { fill: 0xff0000, fontSize: 24, fontWeight: "bold" },
    });
    this.hpText.anchor.set(0.5);
    this.hpText.x = this.sprite.x;
    this.hpText.y = this.sprite.y - 80;
    app.stage.addChild(this.hpText);

    // стріляє раз на 2 сек
    this.interval = setInterval(() => this.shoot(), 2000);
  }

  shoot() {
    const bullet = createBullet(
      this.sprite.x,
      this.sprite.y + this.sprite.height / 2,
      0xff0000,
      6
    );
    this.app.stage.addChild(bullet);
    this.bullets.push(bullet);
  }

  update() {
    // рух по горизонталі
    this.sprite.x += this.speed * this.direction;
    if (
      this.sprite.x < this.sprite.width / 2 ||
      this.sprite.x > this.app.screen.width - this.sprite.width / 2
    ) {
      this.direction *= -1;
    }

    // апдейт тексту HP
    this.hpText.x = this.sprite.x;
    this.hpText.text = `Boss HP: ${this.hp}`;

    // рух куль
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i];
      bullet.y += bullet.speed;

      if (bullet.y > this.app.screen.height) {
        this.app.stage.removeChild(bullet);
        this.bullets.splice(i, 1);
      }
    }
  }

  // 🔥 Додай ці методи
  takeHit() {
    this.hp--;
  }

  destroy() {
    clearInterval(this.interval);
    this.app.stage.removeChild(this.sprite);
    this.app.stage.removeChild(this.hpText);
    this.bullets.forEach((b) => this.app.stage.removeChild(b));
  }
}
