export function isColliding(a, b) {
  const ab = a.getBounds();
  const bb = b.getBounds();
  return (
    ab.x < bb.x + bb.width &&
    ab.x + ab.width > bb.x &&
    ab.y < bb.y + bb.height &&
    ab.y + ab.height > bb.y
  );
}
