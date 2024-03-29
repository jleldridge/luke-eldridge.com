import Service, { inject as service } from '@ember/service';
import Entity from '../game-models/entity';

export default class GameService extends Service {
  @service keyboardInput;

  entities = [];
  player = new Entity(100, 100, 0, 0);

  initGame() {
    this.keyboardInput.attach();
    for (let i = 0; i < 20; i++) {
      this.entities.push(new Entity(Math.random() * 700, Math.random() * 500, 1, 1))
    }
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
    if (!this.canvas && !(this.canvas = window.document.getElementById('game-canvas'))) {
      return;
    }

    // move everything
    for (let e of this.entities) {
      e.x += e.dx;
      e.y += e.dy;
    }

    this.player.dx = 0;
    this.player.dy = 0;

    this.player.dx += this.keyboardInput.keys['a'] ? -3 : 0;
    this.player.dx += this.keyboardInput.keys['d'] ? 3 : 0;
    this.player.dy += this.keyboardInput.keys['w'] ? -3 : 0;
    this.player.dy += this.keyboardInput.keys['s'] ? 3 : 0;

    this.player.x += this.player.dx;
    this.player.y += this.player.dy;

    if (this.player.x + 20 > 800) this.player.x = 800 - 20;
    if (this.player.y + 20 > 600) this.player.y = 600 - 20;
    if (this.player.x < 0) this.player.x = 0;
    if (this.player.y < 0) this.player.y = 0;

    // resolve collisions
    for (let e of this.entities) {
      if (e.x + 20 >= 800 || e.x <= 0) e.dx *= -1;
      if (e.y + 20 >= 600 || e.y <= 0) e.dy *= -1;

      let hcollision = false;
      let vcollision = false;
      if (Math.abs(e.x - this.player.x) <= 20) hcollision = true;
      if (Math.abs(e.y - this.player.y) <= 20) vcollision = true;

      if (hcollision && vcollision) {
        e.dx *= -1;
        e.dy *= -1;
      }
    }
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
