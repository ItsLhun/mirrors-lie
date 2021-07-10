
class Platform {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = SQUARE;
    this.height = SQUARE
  }

  checkIntersection(playerPosition) {
    const checkCollision = (first, second) => {
        return (
          first.bottom > second.top &&
          first.top < second.bottom &&
          first.right > second.left &&
          first.left < second.right
        );
      }
      const getCoordinates = object => ({
        top: object.y,
        right: object.x + object.width,
        bottom: object.y + object.height,
        left: object.x,
      });
    const platformOutline = getCoordinates(this)
    const playerOutline = getCoordinates(playerPosition);
    const intersection = checkCollision(playerOutline, platformOutline);
    return intersection;
}

  paint() {
    const context = this.game.ctx;
    context.save();
    context.fillStyle = 'rgb(50,50,255)';
    context.fillRect(this.x, this.y, this.width, this.height);
    context.restore();
  }
}
