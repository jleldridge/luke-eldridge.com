import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationController extends Controller {
  @service game;

  @action
  startGame() {
    console.log('starting game...');
    this.game.initGame();
  }
}
