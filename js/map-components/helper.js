class HelperText extends Platform{
  constructor(game, x, y, text) {
    super(game, x, y, "transparent", 'transparent')
    this.text = text;
    this.initialPosition = { x: x, y: y };
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
    if (this.game.activeLevel.started) {
      ctx.save();
      if (!IS_FIREFOX){
        ctx.shadowColor = 'blue';
        ctx.shadowBlur = SQUARE * 1;
        ctx.shadowOffsetX = SQUARE * 0.02;
      ctx.shadowOffsetY = SQUARE * 0.02;
      }
      ctx.fillStyle = 'white';
      ctx.font = `${SQUARE * 1.2}px Ubuntu Mono`;//STIX Two Math
      ctx.textAlign = 'center';
      ctx.fillText(`${this.text}`, this.x, this.y);
      ctx.restore();
    }
  }
  paintFrame() {}
  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
  }
}
