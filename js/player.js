class Player {
  constructor(level, x, y) {
    this.level = level;
    this._input = new BasicCharacterControllerInput(this);
    //position
    this.x = x;
    this.y = y;
    //size
    this.width = SQUARE - 1;
    this.height = SQUARE * 2 - 1;
    //acceleration
    this.accelerationX = 0;
    this.accelerationY = 0;
    //jump timer
    this.jumpPressTime = 0;
    this.friction = 20;
    this.momentum = 0;
    this.hat = 'darkred';
    this.facing = 'right';
    this.initialValues = { x: x, y: y };
    this.pastStart = false;
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
    let newAccelerationX =
      this.accelerationX / (1 + (this.friction / 1000) * 22) +
      this.momentum * 1;
    let newAccelerationY = this.accelerationY + (GRAVITY / 1000) * 20;
    let newX = this.x + newAccelerationX;
    // console.log("oldX", this.x, "newX", newX, "diff", this.x - newX)
    let newY = this.y + newAccelerationY;

    for (let platform of this.level.platformsArr) {
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
        this.groundedTimer = 80;
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
        newAccelerationX = 0;
        newX = this.x;
        if (
          spike.direction === 'pointLeft' ||
          spike.direction === 'pointRight'
        ) {
          let stats = this.die(spike);
          newX = stats[0];
          newY = stats[1];
        }
        console.log('touched the spike horizontally!');
      }
      if (verticalIntersection) {
        newAccelerationY = 0;
        newAccelerationX = 0;

        this.grounded = true;
        console.log('touched the spike vertically, you die!');
        let stats = this.die(spike);
        this.dead = true;
        this.x = this.initialValues.x;
        this.y = this.initialValues.y;

        newX = stats[0];
        newY = stats[1];
        this.groundedTimer = 80;
      }
    }
    // player position when scrolling
    if (this.x >= this.level.game.rightBreakpoint && !activeControls.left) {
      newX = this.level.game.rightBreakpoint;
      this.pastStart = true;
      console.log('right', this.x - newX);
    } else if (
      this.pastStart &&
      this.x <= this.level.game.leftBreakpoint &&
      activeControls.left
    ) {
      newX = this.level.game.leftBreakpoint;
      console.log('left', this.x - newX);
    }
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    this.x = newX;
    this.y = newY;

    if (this.groundedTimer > 0 && this.jumpPressTime > 0) {
      let direction = GRAVITY > 0 ? 'upright' : 'reverse';
      this.jumpPressTime = 0;
      this.accelerationY =
        direction === 'upright' ? -this.height / 5.5 : this.height / 5.5;
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
    this.momentum = 0;
    spike.increasePhase();
    this.level.score++;
    this._input.disableController();
    this.level.reset();
    return [this.initialValues.x, this.initialValues.y]; //back to start level
  }

  paint() {
    const ctx = this.level.game.ctx;
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
    /*if (GRAVITY < 0 ){
      ctx.scale(1,-1)*/
    if (this.facing === 'right') {
      ctx.fillRect(this.x + 3, this.y * 1.01, 4, 4); //eyes
      // ctx.fillRect(this.x*1.5, this.y + 15, this.width - 15, this.height - 36); //mouth
      //  ctx.fillRect(this.x + 18, this.y + 17, this.width - 18, this.height - 36); //lower mouth
    } else {
      ctx.fillRect(this.x + 3, this.y * 1.01, 4, 4);
      // ctx.fillRect(this.x, this.y + 15, this.width - 15, this.height - 36);
      // ctx.fillRect(this.x, this.y + 17, this.width - 18, this.height - 36);
    }
    /*}*/
    ctx.restore();
  }
}
