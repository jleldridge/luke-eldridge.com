import Service from '@ember/service';

export default class GameService extends Service {
  gameLoop() {
    this.animReq = window.requestAnimationFrame(this.gameLoop.bind(this));
    this.update();
    this.draw();
  }

  update() {
    
  }

  draw() {

  }
}
