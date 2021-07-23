const processStyle = (style) => {
  switch (style) {
    case 'red':
      return 'red';
    case 'transparent':
      return 'rgba(0,0,0,0.0)';
    default:
      return 'green';
  }
};

class Platform {
  constructor(
    game,
    x,
    y,
    style,
    strokeStyle = 'transparent',
    borders = [0,0,0,0]
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.borders = [1,0,0,0];
    this.width = SQUARE;
    this.height = SQUARE;
    this.style = style;
    this.strokeStyle = strokeStyle;
    this.initialPosition = { x: x, y: y };
    this.pastStart = false;
  }

  checkIntersection(playerPosition) {
    const checkCollision = (first, second) => {
      return (
        first.bottom > second.top &&
        first.top < second.bottom &&
        first.right > second.left &&
        first.left < second.right
      );
    };
    const getCoordinates = (object) => ({
      top: object.y,
      right: object.x + object.width,
      bottom: object.y + object.height,
      left: object.x
    });
    const platformOutline = getCoordinates(this);
    const playerOutline = getCoordinates(playerPosition);
    const intersection = checkCollision(playerOutline, platformOutline);
    return intersection;
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
  }
  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);
    ctx.restore();
  //  this.paintBorders();
  }

  paintBorders() { 
    const ctx = this.game.ctx;
    ctx.save();
    //ctx.lineWidth = SQUARE*0.05;
    ctx.strokeStyle = this.strokeStyle;
    this.borders[0] === 1 ? this.strokeTop() : 0;
    this.borders[1] === 1 ? this.strokeRight() : 0;
    this.borders[2] === 1 ? this.strokeBottom() : 0;
    this.borders[3] === 1 ? this.strokeLeft() : 0;
    ctx.stroke();
    ctx.restore();
  }

  strokeTop() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y);
    ctx.restore();
  }
  strokeRight() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.moveTo(this.x+ this.width, this.y);
    ctx.lineTo(this.x + this.width, this.y+this.height);
    ctx.restore();
  }
  strokeBottom() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.moveTo(this.x, this.y+this.height);
    ctx.lineTo(this.x + this.width, this.y+this.height);
    ctx.restore();
  }
  strokeLeft() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y+this.height);
    ctx.restore();
  }

  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
  }
}
