import Service, { inject as service } from '@ember/service';
import Entity from '../game-models/entity';

export default class GameService extends Service {
  @service keyboardInput;

  entities = [];
  player = new Entity(0, 0, 0, 0);
  playerWidth = 64;
  playerHeight = 64;

  initGame() {
    this.keyboardInput.attach();
    for (let i = 0; i < 20; i++) {
      this.entities.push(
        new Entity(Math.random() * 10, Math.random() * 10, 1, 1)
      );
    }

    this.canvas = window.document.getElementById('game-canvas');
    this.canvas.style.zIndex = 10;
    this.canvas.width = window.innerWidth;

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
    this.player.dy = 0;

    this.player.dx += this.keyboardInput.keys['a'] ? -3 : 0;
    this.player.dx += this.keyboardInput.keys['d'] ? 3 : 0;
    this.player.dy += this.keyboardInput.keys['w'] ? -3 : 0;
    this.player.dy += this.keyboardInput.keys['s'] ? 3 : 0;

    this.player.x += this.player.dx;
    this.player.y += this.player.dy;

    if (this.player.x + this.playerWidth > this.canvas.width) {
      this.player.x = this.canvas.width - this.playerWidth;
    }
    if (this.player.y + this.playerHeight > this.canvas.height) {
      this.player.y = this.canvas.height - this.playerHeight;
    }
    if (this.player.x < 0) this.player.x = 0;
    if (this.player.y < 0) this.player.y = 0;

    // resolve collisions
    for (let e of this.entities) {
      if (e.x + 20 >= this.canvas.width || e.x <= 0) e.dx *= -1;
      if (e.y + 20 >= this.canvas.height || e.y <= 0) e.dy *= -1;

      let hcollision = false;
      let vcollision = false;
      if (
        (this.player.x > e.x && this.player.x - e.x <= 20) ||
        (e.x > this.player.x && e.x - this.player.x <= this.playerWidth)
      ) {
        hcollision = true;
      }
      if (
        (this.player.y > e.y && this.player.y - e.y <= 20) ||
        (e.y > this.player.y && e.y - this.player.y <= this.playerHeight)
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
      ctx.fillRect(e.x, e.y, 20, 20);
    }

    ctx.fillStyle = 'green';
    // bounding rect for debugging
    // ctx.fillRect(
    //   this.player.x,
    //   this.player.y,
    //   this.playerWidth,
    //   this.playerHeight
    // );
    ctx.drawImage(this.playerImage, this.player.x, this.player.y);
  }
}
