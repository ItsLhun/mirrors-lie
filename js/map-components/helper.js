class HelperText {
  constructor(game, x, y, text) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.text = text;
  }

  runLogic(player) {
    let playerDistance = 0;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      this.x += playerDistance;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      this.x -= player.accelerationX;
    }
  }

  paint(player) {
    this.runLogic(player);
    const ctx = this.game.ctx;
    if (this.game.activeLevel.started) {
      ctx.save();

      ctx.shadowColor = 'blue';
      ctx.shadowBlur = SQUARE * 1;
      ctx.fillStyle = 'white';
      ctx.font = `${SQUARE * 1.2}px STIX Two Math`;
      ctx.textAlign = 'center';
      ctx.fillText(`${this.text}`, this.x, this.y);
      ctx.shadowOffsetX = SQUARE * 0.02;
      ctx.shadowOffsetY = SQUARE * 0.02;
      ctx.restore();
    }
  }
  paintFrame() {}
}
