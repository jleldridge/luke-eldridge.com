import EmberRouter from '@ember/routing/router';
import config from 'rpg-sandbox/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route("game", { path: "/" }, function() {
    this.route('play');
    this.route('pause');
  });
});
