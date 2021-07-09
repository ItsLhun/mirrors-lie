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
    document.addEventListener('keydown', (e) => {
     // e.preventDefault;
      return this._onKeyDown(e)});
    document.addEventListener('keyup', (e) => this._onKeyUp(e));
  }

  _onKeyDown(event) {
    //event.preventDefault();
    switch (event.code) {
      case 'ArrowUp':
        this.target.jump("upright");
        this._keys.up = true;
        break;
      case 'ArrowLeft':      
       
      //this.target.moveSideways('left');
        this._keys.left = true;
        break;
      case 'ArrowDown':
        this.target.jump("reverse");
        this._keys.down = true;
        break;
      case 'ArrowRight':
        //this.target.moveSideways('right');

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
      //  setTimeout((e) => (this.target.momentum = 0), 100);

        break;
      case 'ArrowDown':
        this._keys.down = false;
        break;
      case 'ArrowRight':
        this._keys.right = false;
       // setTimeout((e) => (this.target.momentum = 0), 100);
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
