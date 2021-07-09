//const playerImage = new Image();
//playerImage.src = '/images/characters/hero/herochar_idle_anim_strip_4.png';

const GRAVITY = -10; // pixels per frame squared

class Player {
  constructor(game, x, y) {
    this.game = game;
    this._input = new BasicCharacterControllerInput(this);
    //position
    this.x = x;
    this.y = y;
    //size
    this.width = 25;
    this.height = 40;
    //acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.jumpPressTime = 0;
    this.friction = 20;
    this.momentum = 0;
    this.hat = 'darkred';
  }

  runLogic() {
    this.momentum = 0;
    const activeControls = this._input._keys;
    if (activeControls.right === true && activeControls.left === false) {
      this.momentum = 1;
    } else if (activeControls.right === false && activeControls.left === true) {
      this.momentum = -1;
    }

    let newAccelerationX =
      this.accelerationX / (1 + (this.friction / 1000) * 20) +
      this.momentum * 1;
    let newAccelerationY = this.accelerationY + (GRAVITY / 1000) * 20;
    let newX = this.x + newAccelerationX;
    let newY = this.y + newAccelerationY;
    for (let platform of this.game.platforms) {
      const horizontalIntersection = platform.checkIntersection({
        x: newX,
        y: this.y,
        width: this.width,
        height: this.height
      });
      const verticalIntersection = platform.checkIntersection({
        x: this.x,
        y: newY,
        width: this.width,
        height: this.height
      });
      if (horizontalIntersection) {
        newAccelerationX = 0;
        newX = this.x;
      }
      if (verticalIntersection) {
        newAccelerationY = 0;
        newY = this.y;
        this.grounded = true;
      } else {
        //this.grounded = false;
      }
    }
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    this.x = newX;
    this.y = newY;
  }

  moveSideways(direction) {
    //  direction === 'left' ? (this.x -= 5) : (this.x += 5);
  }
  resetMomentum() {}

  jump(direction) {
    console.log("grounded: ",this.grounded);
    if (this.grounded) {
      this.grounded = false;
      this.accelerationY = direction === 'upright' ? -5 : 5;
      /*let timer = setTimeout((e) => {
        console.log('jumping');
        this.grounded = true;
      }, 455);*/
      //console.dir(timer);
    }
  }
  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.hat;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
