import Service, { inject as service } from '@ember/service';
import Entity from '../game-models/entity';

export default class GameService extends Service {
  @service keyboardInput;

  initGame() {
    this.entities = [];
    this.player = new Entity(0, 0, 64, 64);
    this.gravity = 0.5;

    this.keyboardInput.attach();
    for (let i = 0; i < 20; i++) {
      this.entities.push(
        new Entity(Math.random() * 300 + 100, Math.random() * 50, 20, 20)
      );
      this.entities[i].dx = 3;
      this.entities[i].dy = 3;
    }

    this.canvas = window.document.getElementById('game-canvas');
    this.canvas.width = Math.min(window.innerWidth, 1200);

    this.playerImage = window.document.getElementById('luke-image');
    this.gameLoop();
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
    if (
      !this.canvas &&
      !(this.canvas = window.document.getElementById('game-canvas'))
    ) {
      return;
    }

    // move everything
    for (let e of this.entities) {
      e.x += e.dx;
      e.y += e.dy;
    }

    this.player.dx = 0;

    this.player.dx += this.keyboardInput.keys['a'] ? -3 : 0;
    this.player.dx += this.keyboardInput.keys['d'] ? 3 : 0;
    if (
      this.keyboardInput.keys['w'] &&
      this.player.dy == 0 &&
      this.player.y + this.player.height >= this.canvas.height
    ) {
      this.player.dy = -8;
    }

    this.player.x += this.player.dx;
    this.player.y += this.player.dy;

    // handle gravity
    if (this.player.y + this.player.height >= this.canvas.height) {
      this.player.y = this.canvas.height - this.player.height;
      this.player.dy = 0;
    } else {
      this.player.dy += this.gravity;
    }

    if (this.player.x + this.player.width > this.canvas.width) {
      this.player.x = this.canvas.width - this.player.width;
    }
    if (this.player.x < 0) this.player.x = 0;
    if (this.player.y < 0) this.player.y = 0;

    // resolve collisions
    for (let e of this.entities) {
      if (e.x + e.width >= this.canvas.width || e.x <= 0) e.dx *= -1;
      if (e.y + e.height >= this.canvas.height || e.y <= 0) e.dy *= -1;

      let hcollision = false;
      let vcollision = false;
      if (
        (this.player.x > e.x && this.player.x - e.x <= e.width) ||
        (e.x > this.player.x && e.x - this.player.x <= this.player.width)
      ) {
        hcollision = true;
      }
      if (
        (this.player.y > e.y && this.player.y - e.y <= e.height) ||
        (e.y > this.player.y && e.y - this.player.y <= this.player.height)
      ) {
        vcollision = true;
      }

      if (hcollision && vcollision) {
        e.dx *= -1;
        e.dy *= -1;
      }
    }
  }

  draw() {
    if (!this.canvas) return;

    let ctx = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let e of this.entities) {
      ctx.fillStyle = 'orange';
      ctx.fillRect(e.x, e.y, e.width, e.height);
    }

    ctx.fillStyle = 'green';
    // bounding rect for debugging
    // ctx.fillRect(
    //   this.player.x,
    //   this.player.y,
    //   this.player.width,
    //   this.player.height
    // );
    ctx.drawImage(this.playerImage, this.player.x, this.player.y);
  }
}
