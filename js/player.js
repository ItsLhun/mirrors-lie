let presetColor = {
  red: 350,
  aqua: 180,
  green: 100
};

class Player {
  constructor(level, x, y, color) {
    this.level = level;
    this._input = new BasicCharacterControllerInput(this);
    //position
    this.x = x;
    this.y = y;
    //size
    this.width = SQUARE - 1;
    this.height = SQUARE * 2;
    //acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;
    //jump timer
    this.jumpPressTime = 0;
    this.friction = 20;
    this.momentum = 0;
    this.color = presetColor[color] ? presetColor[color] : 350;
    this.facing = 'right';
    this.initialValues = { x: x, y: y };
    this.pastStart = false;
    this.deadTimeout = false;
    this.newAccelerationX;
  }

  runLogic() {
    this.momentum = 0;
    const activeControls = this._input._keys;
    if (activeControls.right && !activeControls.left) {
      this.momentum = 1;
      this.facing = 'right';
    } else if (!activeControls.right && activeControls.left) {
      this.momentum = -1;
      this.facing = 'left';
    }
    this.newAccelerationX =
      this.accelerationX / (1 + (this.friction / 1000) * 22) +
      this.momentum * 1;
    let newAccelerationY =
      this.accelerationY + (this.level.GRAVITY / 1000) * 22;
    let newX = this.x + this.newAccelerationX;
    let newY = this.y + newAccelerationY;

    for (let platform of this.level.platformsArr) {
      let priorCollision = { x: this.x, y: this.y };
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
        this.newAccelerationX = 0;
        this.accelerationX = 0;
        newX = this.x;
        // if (this.x+this.width > platform.x && this.facing === "right"){

        //   newX = this.x-(this.x+this.width - platform.x)
        // } else if (this.x+this.width < platform.x && this.facing === "left"){

        // } else {
        //   newX = this.x;
        // }
        // console.log("player Right X", this.x+this.width, "plat left X", platform.x)
      }
      if (verticalIntersection) {
        newAccelerationY = 0;
        newY = this.y;
        this.grounded = true;
        this.groundedTimer = 80;
      } else {
        //console.log("mid air")
        let timeoutID = setTimeout((e) => {
          let intervalID = setInterval((e) => {
            this.groundedTimer--;
            if (this.groundedTimer <= 0) {
              this.grounded = false;
              clearInterval(intervalID);
            }
          }, 1);
        }, 90)
        
      }
    }

    for (let spike of this.level.spikesArr) {
      const horizontalIntersection = spike.checkIntersection({
        x: newX,
        y: this.y,
        width: this.width,
        height: this.height
      });
      const verticalIntersection = spike.checkIntersection({
        x: this.x,
        y: newY,
        width: this.width,
        height: this.height
      });
      if (horizontalIntersection) {
        this.newAccelerationX = 0;
        newX = this.x;
        if (
          spike.direction === 'pointLeft' ||
          spike.direction === 'pointRight'
        ) {
          this.die(spike);
        }
      }
      if (verticalIntersection) {
        this.grounded = true;
        this.groundedTimer = 80;
        this.die(spike);
      }
    }
    if (!this.deadTimeout) {
      // player position when scrolling
      if (this.x >= this.level.game.rightBreakpoint && !activeControls.left) {
        newX = this.level.game.rightBreakpoint;
        this.pastStart = true;
      } else if (
        this.pastStart &&
        this.x <= this.level.game.leftBreakpoint &&
        activeControls.left
      ) {
        newX = this.level.game.leftBreakpoint;
      }

      this.accelerationX = isEpsilon(this.newAccelerationX)
        ? 0
        : this.newAccelerationX;
      this.accelerationY = isEpsilon(newAccelerationY) ? 0 : newAccelerationY;
      // console.log("when stuck check", this.x, this.y)
      this.x = newX;
      this.y = newY;

      if (this.groundedTimer > 0 && this.jumpPressTime > 0) {
        let direction = this.level.GRAVITY > 0 ? 'upright' : 'reverse';
        this.jumpPressTime = 0;
        this.accelerationY =
          direction === 'upright' ? -this.height / 5.5 : this.height / 5.5;
      }
    }
  }

  jump() {
    this.jumpPressTime = 80;
    let intervalID = setInterval((e) => {
      this.jumpPressTime--;
      if (this.jumpPressTime <= 0) {
        clearInterval(intervalID);
      }
    }, 1);
  }

  die(spike) {
    this.deadTimeout = true;
    this.pastStart = false;
    this.facing = 'right';
    setTimeout(() => {
      this.deadTimeout = false;
    }, 600);
    this._input.disableController();
    this.accelerationX = 0;
    this.accelerationY = 0;
    if (spike) {
      spike.increasePhase();
    }
    this.level.increaseScore();
    this.level.reset();
    this.x = this.initialValues.x;
    this.y = this.initialValues.y;
  }

  paint() {
    const ctx = this.level.game.ctx;
    ctx.save();
    ctx.beginPath();
    //  if (this.accelerationX > 0) {
    //   //ctx.translate(this.x - this.width / 2, this.y - this.height/2)
    //   ctx.translate(this.x, this.y);
    //   ctx.transform(1, 0, 10/100, 1, 0, 0);
    // } else if (this.accelerationX < 0){
    //   ctx.transform(1, 0, -10/100, 1, 0, 0);
    // }
    ctx.fillStyle = `hsl(${this.color},68%,32%)`;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'burgundy';
    let yOffset = 0;
    // if (this.accelerationX > 0) {

    //   ctx.transform(1, 0, 0.18, 1, -this.width*6.4, 0);
    // } else if (this.accelerationX < 0){
    //   ctx.transform(1, 0, -0.18, 1, this.width*6.4, 0);

    // }
    if (this.facing === 'right') {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 8, this.y + 3 + yOffset, 4, 4); //eyes
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x + 11, this.y + 4 + yOffset, 1, 2);
      ctx.restore();
    } else {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 3, this.y + 3 + yOffset, 4, 4);
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(this.x + 3, this.y + 4 + yOffset, 1, 2);
      ctx.restore();
    }
    ctx.restore();
  }
  paintMirror() {
    const ctx = this.level.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `hsl(${this.color},40%,50%)`;
    ctx.translate(0, this.level.game.canvas.height);
    ctx.scale(1, -1);
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'white';
    let yOffset = 0;
    if (this.facing === 'right') {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 8, this.y + 3 + yOffset, 4, 4); //eyes
    } else {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 3, this.y + 3 + yOffset, 4, 4);
    }

    ctx.restore();
  }
}
