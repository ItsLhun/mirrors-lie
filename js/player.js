const GRAVITY = 10; // pixels per frame squared

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
    this.facing = 'right';
  }

  runLogic() {
    this.momentum = 0;
    const activeControls = this._input._keys;
    if (activeControls.right === true && activeControls.left === false) {
      this.momentum = 1;
      this.facing = 'right';
    } else if (activeControls.right === false && activeControls.left === true) {
      this.momentum = -1;
      this.facing = 'left';
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
        this.groundedTimer = 100;
      } else {
        
        let intervalID = setInterval((e) => {
          this.groundedTimer--;
          if (this.groundedTimer <= 0) {
            this.grounded = false;
            clearInterval(intervalID);
          }
        }, 1);
      }
    }
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    this.x = newX;
    this.y = newY;

    if (this.groundedTimer > 0 && this.jumpPressTime > 0) {
      let direction = GRAVITY > 0 ? 'upright' : 'reverse';
      this.jumpPressTime = 0;
      this.accelerationY = direction === 'upright' ? -6 : 6;
    }
  }

  moveSideways(direction) {
    //  direction === 'left' ? (this.x -= 5) : (this.x += 5);
  }
  resetMomentum() {}

  jump(direction) {
    this.jumpPressTime = 100;
    let intervalID = setInterval((e) => {
      this.jumpPressTime--;
      if (this.jumpPressTime <= 0) {
        clearInterval(intervalID);
        console.log('interval cleared');
      }
    }, 1);

    //setTimeout((e) => (this.grounded = false), 300);

    /*    if (this.groundedTimer > 0 && this.jumpPressTime > 0) {
      this.jumpPressTime = 0;
      this.grounded = false;
      this.accelerationY = direction === 'upright' ? -6 : 6;
    }*/
  }
  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.hat;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    //ctx.globalAlpha = 0.1;
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'burgundy';

    if (this.facing === 'right') {
      ctx.fillRect(this.x + 16, this.y + 5, 6, 6); //eyes
      ctx.fillRect(this.x + 15, this.y + 15, this.width - 15, this.height - 36); //mouth
      ctx.fillRect(this.x + 18, this.y + 17, this.width - 18, this.height - 36); //lower mouth
    } else {
      ctx.fillRect(this.x + 3, this.y + 5, 6, 6);
      ctx.fillRect(this.x, this.y + 15, this.width - 15, this.height - 36);
      ctx.fillRect(this.x, this.y + 17, this.width - 18, this.height - 36);
    }

    ctx.restore();
  }
}
