class BasicCharacterControllerInput {
  constructor(object) {
    this.Initiate();
    this.target = object;
    this.enabled = true;
  }

  Initiate() {
    this._keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      shift: false,
      jumping: false
    };
    document.addEventListener('keydown', (e) => {
      if (this.enabled) {
        this.onKeyDown(e);
      }
    });
    document.addEventListener('keyup', (e) => {
      
        this.onKeyUp(e);
      
    });
  }
  disableController(){
    this._keys = {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
      shift: false,
      jumping: false
    };
    this.enabled = false;
    setTimeout(() => this.enabled = true, 1000);
  }

  onKeyDown(event) {
    switch (event.code) {
      case 'ArrowUp':
        if (!this._keys.jumping) {
          this.target.jump('upright');
        }
        this._keys.up = true;
        this._keys.jumping = true;
        break;
      case 'ArrowLeft':
        this._keys.left = true;
        break;
      case 'ArrowDown':
        this.target.jump('reverse');
        this._keys.down = true;
        break;
      case 'ArrowRight':
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

  onKeyUp(event) {
    switch (event.code) {
      case 'ArrowUp':
        this._keys.up = false;
        this._keys.jumping = false;
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
