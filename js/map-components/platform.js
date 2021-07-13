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
  constructor(game, x, y, style) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = SQUARE;
    this.height = SQUARE;
    this.style = style;
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

  paint(player) {
    let offSet;
    let playerDistance = 0;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      this.x += playerDistance;
      //this.pastStart = true;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      this.x -= player.accelerationX;
    }
    const context = this.game.ctx;
    context.save();
    context.fillStyle = processStyle(this.style);
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
  }
}
