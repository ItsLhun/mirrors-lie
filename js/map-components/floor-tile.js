class FloorTile extends Platform{
    constructor(game, x, y) {
        super(game, x, y, 'transparent', 'transparent', [0,0,0,0])
    }
  
    paint(player) {
        const context = this.game.ctx;
        context.save();
        context.fillStyle = this.style;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.restore();
      }
}