export default class Entity {
  x; y; dx; dy;
  width; height;

  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.width = width;
    this.height = height;
  }
}
