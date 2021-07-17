class Collectible extends Platform {
  constructor(
    game,
    positionX,
    positionY,
    width = SQUARE / 1.5,
    height = SQUARE / 1.5
  ) {
    super(game, positionX, positionY, 'black');
    this.game = game;
    this.x = positionX;
    this.y = positionY;
    this.width = width;
    this.height = height;
    this.picked = false;
  }

  paint(player) {
    if (!this.picked) {
      const ctx = this.game.ctx;
      let playerDistance = 0;
      playerDistance =
        this.game.rightBreakpoint - player.x - player.accelerationX;
      if (player.x >= this.game.rightBreakpoint) {
        this.x += playerDistance;
      } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
        this.x -= player.accelerationX;
      }
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.restore();
    }
  }
  checkPickup(player) {
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
        this.picked = true;
        console.log("picked up the object!")
        return true;
    }
    if (verticalIntersection) {
        console.log("picked up the object!")
        this.picked = true;
        return true;
    }
  }
}
