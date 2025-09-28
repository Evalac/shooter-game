import { Graphics } from "pixi.js";

function createBullet(x, y, color = 0xffff00, speed = -10) {
  const bullet = new Graphics();
  bullet.fill(color).circle(0, 0, 5).fill();
  bullet.x = x;
  bullet.y = y;
  bullet.speed = speed;
  return bullet;
}

function isColliding(a, b) {
  const ab = a.getBounds();
  const bb = b.getBounds();
  return (
    ab.x < bb.x + bb.width &&
    ab.x + ab.width > bb.x &&
    ab.y < bb.y + bb.height &&
    ab.y + ab.height > bb.y
  );
}

export { createBullet, isColliding };
