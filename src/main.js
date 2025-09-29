import { Application, Assets, Sprite, Text } from "pixi.js";
import { isColliding } from "./helpers/common";
import { initLevel1 } from "./levels/level1";
import { initLevel2 } from "./levels/level2";

(async () => {
  const app = new Application();
  await app.init({ width: 1280, height: 720 });
  document.getElementById("pixi-container").appendChild(app.canvas);

  const textures = {
    ship: await Assets.load("/assets/spaceship.png"),
    asteroid: await Assets.load("/assets/asteroid.png"),
    back: await Assets.load("/assets/back.png"),
    boss: await Assets.load("/assets/asteroid.png"), // тимчасово
  };

  const back = new Sprite(textures.back);
  back.width = app.screen.width;
  back.height = app.screen.height;
  app.stage.addChild(back);

  let ship, asteroids, boss;
  let bulletsText, timerText, messageText, restartButton, startButton;
  let timeLeft = 60;
  let gameOver = false;
  let level = 1;
  let started = false;
  let intervalID = null;

  function startLevel1() {
    ({ ship, asteroids, bulletsText, timerText, messageText } = initLevel1(
      app,
      textures
    ));
    gameOver = false;
    timeLeft = 60;
    started = true;

    if (intervalID) clearInterval(intervalID);
    intervalID = setInterval(() => {
      if (!gameOver && started) {
        timeLeft--;
        timerText.text = `Time: ${timeLeft}`;
        if (timeLeft <= 0) endGame("YOU LOSE");
      }
    }, 1000);
  }

  function startLevel2() {
    boss = initLevel2(app, ship, bulletsText, timerText, textures);
    gameOver = false;
    timeLeft = 60;

    if (intervalID) clearInterval(intervalID);
    intervalID = setInterval(() => {
      if (!gameOver && started) {
        timeLeft--;
        timerText.text = `Time: ${timeLeft}`;
        if (timeLeft <= 0) endGame("YOU LOSE");
      }
    }, 1000);
  }

  function endGame(text) {
    gameOver = true;
    messageText.text = text;

    if (intervalID) clearInterval(intervalID); // 🔥 зупиняємо таймер

    restartButton = new Text({
      text: "RESTART",
      style: { fill: 0xffffff, fontSize: 32, fontWeight: "bold" },
    });
    restartButton.anchor.set(0.5);
    restartButton.x = app.screen.width / 2;
    restartButton.y = app.screen.height / 2 + 100;
    restartButton.interactive = true;
    restartButton.cursor = "pointer";
    restartButton.on("pointerdown", () => {
      app.stage.removeChildren();
      app.stage.addChild(back);
      startLevel1();
      level = 1;
    });
    app.stage.addChild(restartButton);
  }

  // Стартова кнопка
  startButton = new Text({
    text: "START",
    style: { fill: 0x00ff00, fontSize: 48, fontWeight: "bold" },
  });
  startButton.anchor.set(0.5);
  startButton.x = app.screen.width / 2;
  startButton.y = app.screen.height - 30;
  startButton.interactive = true;
  startButton.cursor = "pointer";
  startButton.on("pointerdown", () => {
    app.stage.removeChild(startButton);
    startLevel1();
  });
  app.stage.addChild(startButton);

  // Управління
  document.addEventListener("keydown", (e) => {
    if (gameOver || !started) return;
    if (e.key === "ArrowRight") ship.moveRight();
    if (e.key === "ArrowLeft") ship.moveLeft();
    if (e.code === "Space") {
      ship.shoot();
      bulletsText.text = `Bullets:10/${ship.bulletCount}`;
    }
  });

  // Цикл
  app.ticker.add((time) => {
    if (gameOver || !started) return;
    ship.update();

    if (level === 1) {
      asteroids.forEach((a) => a.update(time.deltaTime));

      for (let i = ship.bullets.length - 1; i >= 0; i--) {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          if (isColliding(ship.bullets[i], asteroids[j].sprite)) {
            app.stage.removeChild(ship.bullets[i]);
            ship.bullets.splice(i, 1);
            app.stage.removeChild(asteroids[j].sprite);
            asteroids.splice(j, 1);
            break;
          }
        }
      }

      if (asteroids.length === 0) {
        level = 2;
        startLevel2();
      } else if (ship.bulletCount === 0 && ship.bullets.length === 0) {
        endGame("YOU LOSE");
      }
    }

    if (level === 2 && boss) {
      boss.update();

      for (let i = ship.bullets.length - 1; i >= 0; i--) {
        if (isColliding(ship.bullets[i], boss.sprite)) {
          app.stage.removeChild(ship.bullets[i]);
          ship.bullets.splice(i, 1);
          boss.takeHit();
          if (boss.hp <= 0) {
            boss.destroy();
            endGame("YOU WIN");
          }
        }
      }

      for (let i = boss.bullets.length - 1; i >= 0; i--) {
        for (let j = ship.bullets.length - 1; j >= 0; j--) {
          if (isColliding(boss.bullets[i], ship.bullets[j])) {
            app.stage.removeChild(boss.bullets[i]);
            boss.bullets.splice(i, 1);
            app.stage.removeChild(ship.bullets[j]);
            ship.bullets.splice(j, 1);
            break;
          }
        }
      }

      for (let i = boss.bullets.length - 1; i >= 0; i--) {
        if (isColliding(boss.bullets[i], ship.sprite)) {
          endGame("YOU LOSE");
          boss.stop();
        }
      }

      if (ship.bulletCount === 0 && ship.bullets.length === 0) {
        endGame("YOU LOSE");
      }
    }
    bulletsText.text = `Bullets: 10/${ship.bulletCount}`;
  });
})();
