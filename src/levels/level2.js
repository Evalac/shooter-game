import { Boss } from "../entities/boss";

export function initLevel2(app, ship, bulletsText, timerText, textures) {
  ship.bulletCount = 10;
  bulletsText.text = `Bullets: ${ship.bulletCount}`;
  timerText.text = `Time: 60`;
  const boss = new Boss(textures.boss, app);
  return boss;
}
