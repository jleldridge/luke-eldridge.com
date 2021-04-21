import Service from '@ember/service';

export default class GameService extends Service {
  entities = [];

  gameLoop() {
    this.animReq = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.draw();
  }

  start() {
    this.entities = [{x: 0, y: 0, dx: 1, dy: 1}];
    this.gameLoop();
  }

  pause() {
    console.log(this.entities);
    window.cancelAnimationFrame(this.animReq);
  }

  update() {
    if (!this.canvas) this.canvas = window.document.getElementById('game-canvas');
    if (!this.canvas) return;

    for (let e of this.entities) {
      e.x += e.dx;
      e.y += e.dy;

      if (e.x + 20 >= 800 || e.x <= 0) e.dx *= -1;
      if (e.y + 20 >= 600 || e.y <= 0) e.dy *= -1;
    }
  }

  draw() {
    if (!this.canvas) return;
    let ctx = this.canvas.getContext('2d');
    for (let e of this.entities) {
      ctx.clearRect(0, 0, 800, 600)
      ctx.fillStyle = 'white';
      ctx.fillRect(e.x, e.y, 20, 20);
    }
  }
}
