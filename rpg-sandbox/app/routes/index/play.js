import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexPlayRoute extends Route {
  @service game;

  model() {
    this.game.start();
  }
}