class Square {
  constructor(game, basePositionX, basePositionY, maxDistance, basePortal) {
    this.game = game;
    this.basePortal = basePortal;
    this.initialValues = {
      x: (Math.random() * basePositionX) / 8 + basePositionX - SQUARE,
      y: (Math.random() * basePositionY) / 8 + basePositionY - SQUARE * 2
    };
    this.x = this.initialValues.x;

    this.y = this.initialValues.y;

    this.fillColor = `rgba(0,0,0,${0.95 * Math.random() + 0.35})`;
  }
  runSquareLogic(currentX, currentY) {
    let probability = Math.floor(Math.random() * 101);
    if (probability > 90) {
      let probNegX = Math.floor(Math.random() * 2) + 1;
      let negativeX = probNegX === 1 ? -1 : -1;
      this.x = currentX + negativeX * (Math.random() * SQUARE * 2);
      let probNegY = Math.floor(Math.random() * 2) + 1;
      let negativeY = probNegY === 1 ? 1 : -1;
      this.y = currentY + negativeY * (Math.random() * (SQUARE * 2));
    }
  }
  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, SQUARE, SQUARE);
    ctx.lineWidth = SQUARE * 0.0125;
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, SQUARE, SQUARE);
    ctx.restore();
  }
  reset() {
    this.x = this.initialValues.x;
    this.y = this.initialValues.y;
  }
}

class EndPortal extends Platform {
  constructor(game, positionX, positionY) {
    super(game, positionX, positionY, 'transparent', 'transparent');
    this.touched = false;
    this.fillColor = `rgba(0,0,0,${0.95 * Math.random() + 0.3})`;
    this.squares = [];
    this.started = false;
    this.maxDistance = 0.5 * SQUARE;
    this.victorySound = new Audio ('/sounds/Victory Jingle_compressed.wav');
  }

  start() {
    this.generateSquares(26);
    this.started = true;
  }

  generateSquares(quantity) {
    for (let i = 0; i < quantity; i++) {
      let square = new Square(
        this.game,
        this.x,
        this.y,
        this.maxDistance,
        this
      );
      this.squares.push(square);
    }
  }

  checkFinished(player) {
    const horizontalIntersection = this.checkIntersection({
      x: player.x,
      y: player.y,
      width: player.width,
      height: player.height
    });
    const verticalIntersection = this.checkIntersection({
      x: player.x,
      y: player.y,
      width: player.width,
      height: player.height
    });
    if (horizontalIntersection) {
      if (!this.touched) {
        this.processEndOfLevel();
      }
      this.touched = true;
      return true;
    }
    if (verticalIntersection) {
      // this.processEndOfLevel();
      this.touched = true;
      return true;
    }
  }
  processEndOfLevel() {
    this.playSound();
    this.game.activeLevel.music.volume = 0.4;
    setTimeout((e) => {
      this.game.activeLevel.music.volume = 0.3;
    }, 500);
    setTimeout((e) => {
      this.game.activeLevel.music.volume = 0.2;
    }, 750);
    setTimeout((e) => {
      this.game.activeLevel.music.volume = 0.1;
    }, 1000);
    setTimeout((e) => {
      this.game.activeLevel.music.volume = 0.05;
    }, 1250);
    setTimeout((e) => {
      this.game.activeLevel.music.pause();
      this.game.activeLevel.player.disableFlipGravity();
      this.game.activeLevel.player.disableSuperJump();
      this.game.currentLevelIndex++;
    }, 1500);
    //duration of timeout to be set at victory sound duration
  }

  playSound() {
    this.victorySound.play();
  }
  paint() {
    if (!this.started) {
      this.start();
    }
    const ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = this.fillColor;
    ctx.fillRect(this.x, this.y, SQUARE, SQUARE);
    ctx.lineWidth = SQUARE * 0.0125;
    ctx.strokeStyle = 'white';
    ctx.strokeRect(this.x, this.y, SQUARE, SQUARE);
    ctx.restore();
    ctx.save();

    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].paint();
    }
    ctx.restore();
  }
  runMovementLogic(player) {
    let playerDistance = 0;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      this.x += playerDistance;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      this.x -= player.accelerationX;
    }
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].runSquareLogic(this.x, this.y);
    }
  }
  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
    for (let i = 0; i < this.squares.length; i++) {
      this.squares[i].reset();
    }
  }
}
