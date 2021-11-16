import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @service game;
  @tracked gameRunning;

  @action
  startGame() {
    console.log('starting game...');
    this.game.initGame();
    this.gameRunning = true;
  }

  @action
  stopGame() {
    console.log('stopping game...');
    this.game.pause();
    this.gameRunning = false;
  }
}
