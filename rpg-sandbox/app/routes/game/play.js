import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GamePlayRoute extends Route {
  @service game;

  model() {
    this.game.play();
  }
}