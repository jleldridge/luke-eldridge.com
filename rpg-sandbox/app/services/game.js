import Service, { inject as service } from '@ember/service';

export default class GameService extends Service {
  @service keyboardInput;

  entities = [];
  player = {x: 0, y: 0, dx: 0, dy: 0};

  initGame() {
    this.keyboardInput.attach();
    this.entities = [{x: 0, y: 0, dx: 1, dy: 1}];
  }

  gameLoop() {
    this.animReq = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.draw();
  }

  play() {
    this.gameLoop();
  }

  pause() {
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

    this.player.dx = 0;
    this.player.dy = 0;

    this.player.dx += this.keyboardInput.keys['a'] ? -3 : 0;
    this.player.dx += this.keyboardInput.keys['d'] ? 3 : 0;
    this.player.dy += this.keyboardInput.keys['w'] ? -3 : 0;
    this.player.dy += this.keyboardInput.keys['s'] ? 3 : 0;

    this.player.x += this.player.dx;
    this.player.y += this.player.dy;
  }

  draw() {
    if (!this.canvas) return;

    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, 800, 600)

    for (let e of this.entities) {
      ctx.fillStyle = 'white';
      ctx.fillRect(e.x, e.y, 20, 20);
    }

    ctx.fillStyle = 'green';
    ctx.fillRect(this.player.x, this.player.y, 20, 20);
  }
}
