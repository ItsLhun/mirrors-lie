//const playerImage = new Image();
//playerImage.src = '/images/characters/hero/herochar_idle_anim_strip_4.png';

const GRAVITY = 10; // pixels per frame squared

class Player {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 25;
    this.height = 40;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.jumpPressTime;
    this._input = new BasicCharacterControllerInput(this);
    this.friction = 15;
    this.momentum = 0;
  }

  runLogic() {
    let newAccelerationX =
      this.accelerationX / (1 + (this.friction / 1000) * 16) +
      this.momentum * 0.5;
    let newAccelerationY = this.accelerationY + (GRAVITY / 1000) * 16;
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
      }
    }
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    this.x = newX;
    this.y = newY;
  }

  moveSideways(direction) {
    if (direction === 'left') {
      this.x -= 5;
      this.momentum = -1;
    } else {
      this.x += 5;
      this.momentum = 1;
    }
    //this.momentum
    //direction === 'left' ? (this.x -= 5) : (this.x += 5);
  }
  resetMomentum() {}

  jump() {
    this.accelerationY = -5;
  }
  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'darkred';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
