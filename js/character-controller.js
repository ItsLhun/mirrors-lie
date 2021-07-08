class BasicCharacterControllerInput {
  constructor(object) {
    this._Init();
    this.target = object;
  }

  _Init() {
    this._keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      shift: false
    };
    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
        this.target.jump();
        this._keys.up = true;
        break;
      case 'ArrowLeft':
        this.target.moveSideways('left');
        setTimeout((e) => (this.target.momentum = 0), 90);
        this._keys.left = true;
        break;
      case 'ArrowDown':
        this._keys.down = true;
        break;
      case 'ArrowRight':
        this.target.moveSideways('right');
        setTimeout((e) => (this.target.momentum = 0), 90);

        this._keys.right = true;
        break;
      case 'Space':
        this._keys.space = true;
        break;
      case 'ShiftLeft':
        this._keys.shift = true;
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
        this._keys.up = false;
        break;
      case 'ArrowLeft':
        this._keys.left = false;
        break;
      case 'ArrowDown':
        this._keys.down = false;
        break;
      case 'ArrowRight':
        this._keys.right = false;
        break;
      case 'Space':
        this._keys.space = false;
        break;
      case 'ShiftLeft':
        this._keys.shift = false;
        break;
    }
  }
}
