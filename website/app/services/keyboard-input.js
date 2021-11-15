import Service from '@ember/service';

export default class KeyboardInputService extends Service {
  keys = {
    w: false,
    a: false,
    s: false,
    d: false,
  };

  attach() {
    window.addEventListener('keydown', this.onKeyDown.bind(this));
    window.addEventListener('keyup', this.onKeyUp.bind(this));
  }

  detach() {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    window.removeEventListener('keyup', this.onKeyUp.bind(this));
  }

  onKeyDown(event) {
    this.keys[event.key] = true;
  }

  onKeyUp(event) {
    this.keys[event.key] = false;
  }
}
