class FloorTile extends Platform{
    constructor(game, x, y) {
        super(game, x, y, SQUARE, SQUARE)
    }
    paint(player) {
        let playerDistance = 0;
        playerDistance =
          this.game.rightBreakpoint - player.x - player.accelerationX;
        if (player.x >= this.game.rightBreakpoint) {
          this.x += playerDistance;
        } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
          this.x -= player.accelerationX;
        }
        const context = this.game.ctx;
        context.save();
        context.fillStyle = this.style;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
      }
}