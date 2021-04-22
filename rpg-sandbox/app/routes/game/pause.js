import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class GamePauseRoute extends Route {
  @service game;

  model() {
    this.game.pause();
  }
}