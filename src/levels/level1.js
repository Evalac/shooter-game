import { Text } from "pixi.js";
import { Ship } from "../entities/ship";
import { Asteroid } from "../entities/asteroid";

export function initLevel1(app, textures) {
  const ship = new Ship(textures.ship, app);

  const bulletsText = new Text({
    text: `Bullets: ${ship.bulletCount}`,
    style: { fill: 0xffffff, fontSize: 24 },
  });
  bulletsText.x = 20;
  bulletsText.y = 20;
  app.stage.addChild(bulletsText);

  const timerText = new Text({
    text: `Time: 60`,
    style: { fill: 0xffffff, fontSize: 24 },
  });
  timerText.x = 20;
  timerText.y = 50;
  app.stage.addChild(timerText);

  const messageText = new Text({
    text: "",
    style: { fill: 0xff0000, fontSize: 64, fontWeight: "bold" },
  });
  messageText.anchor.set(0.5);
  messageText.x = app.screen.width / 2;
  messageText.y = app.screen.height / 2;
  app.stage.addChild(messageText);

  const asteroids = [];
  for (let i = 0; i < 6; i++) {
    asteroids.push(new Asteroid(textures.asteroid, app));
  }

  return { ship, asteroids, bulletsText, timerText, messageText };
}
