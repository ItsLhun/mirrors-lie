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
    let newAccelerationY =
      this.accelerationY + (this.level.GRAVITY / 1000) * 20;
    let newX = this.x + newAccelerationX;
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
      }
      if (verticalIntersection) {
        newAccelerationY = 0;
        newAccelerationX = 0;

        this.grounded = true;
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
    } else if (
      this.pastStart &&
      this.x <= this.level.game.leftBreakpoint &&
      activeControls.left
    ) {
      newX = this.level.game.leftBreakpoint;
    }
    this.accelerationX = newAccelerationX;
    this.accelerationY = newAccelerationY;
    this.x = newX;
    this.y = newY;

    if (this.groundedTimer > 0 && this.jumpPressTime > 0) {
      let direction = this.level.GRAVITY > 0 ? 'upright' : 'reverse';
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

    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'burgundy';
    let yOffset = 0;
    if (this.facing === 'right') {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 8, this.y + 3 + yOffset, 4, 4); //eyes
      // ctx.fillRect(this.x*1.5, this.y + 15, this.width - 15, this.height - 36); //mouth
      //  ctx.fillRect(this.x + 18, this.y + 17, this.width - 18, this.height - 36); //lower mouth
    } else {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;

      ctx.fillRect(this.x + 3, this.y + 3 + yOffset, 4, 4);

      // ctx.fillRect(this.x, this.y + 15, this.width - 15, this.height - 36);
      // ctx.fillRect(this.x, this.y + 17, this.width - 18, this.height - 36);
    }
    /*}*/
    ctx.restore();
  }
  paintMirror() {
    const ctx = this.level.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = this.hat;
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
      // ctx.fillRect(this.x*1.5, this.y + 15, this.width - 15, this.height - 36); //mouth
      //  ctx.fillRect(this.x + 18, this.y + 17, this.width - 18, this.height - 36); //lower mouth
    } else {
      yOffset = this.y < this.level.game.canvas.height / 2 ? 20 : 0;
      ctx.fillRect(this.x + 3, this.y + 3 + yOffset, 4, 4);
      // ctx.fillRect(this.x, this.y + 15, this.width - 15, this.height - 36);
      // ctx.fillRect(this.x, this.y + 17, this.width - 18, this.height - 36);
    }

    ctx.restore();
  }
}
