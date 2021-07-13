class Platform {
  constructor(game, x, y, style) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = SQUARE;
    this.height = SQUARE;
    this.style = style;
    this.initialPosition = { x: x, y: y };
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
    let playerDistance = 0;
    if (player.x > this.game.canvas.width / 2.5) {
      playerDistance =
        this.game.canvas.width / 2.5 - player.x - player.accelerationX;
    } else if (player.x > this.game.canvas.width * 0.12) {
      //playerDistance = - player.accelerationX;
    }
    const context = this.game.ctx;
    context.save();
    context.fillStyle = this.style;
    this.x += playerDistance;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
  }
}
