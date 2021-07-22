class Square {
  constructor(game, basePositionX, basePositionY, maxDistance, basePortal) {
    this.game = game;
    this.basePortal = basePortal;
    this.x = (Math.random() * basePositionX) / 8 + basePositionX - SQUARE;

    this.y = (Math.random() * basePositionY) / 8 + basePositionY - SQUARE * 2;

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

    ctx.save();
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
      this.touched = true;
      console.log('Touched the Portal');
      return true;
    }
    if (verticalIntersection) {
      console.log('Touched the Portal!');
      this.touched = true;
      return true;
    }
  }
  playSound() {}
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
}
