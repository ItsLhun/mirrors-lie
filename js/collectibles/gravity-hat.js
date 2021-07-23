class GravityHat extends Collectible {
  constructor(game, x, y) {
    super(game, x, y);
    this.game = game;
  }


  paint(player) {
    if (!this.picked) {
      this.paintAura();
      const ctx = this.game.ctx;
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'orange';
      let multiplier = 2;
      ctx.moveTo(this.x + player.width * 0.05 * multiplier, this.y);
      ctx.lineTo(
        this.x + player.width * 0.05 * multiplier,
        this.y - player.height * 0.15 * multiplier
      );
      ctx.lineTo(
        this.x + player.width * 0.4 * multiplier,
        this.y + player.height * -0.2 * multiplier
      );
      ctx.lineTo(
        this.x + player.width * 0.59 * multiplier,
        this.y + player.height * 0 * multiplier
      );
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.beginPath();

      ctx.fillStyle = 'red';
      ctx.moveTo(this.x + player.width * 0.15 * multiplier, this.y);
      ctx.lineTo(
        this.x + player.width * 0.15 * multiplier,
        this.y - player.height * 0.15 * multiplier
      );
      ctx.lineTo(
        this.x + player.width * 0.4 * multiplier,
        this.y + player.height * -0.2 * multiplier
      );
      ctx.lineTo(
        this.x + player.width * 0.59 * multiplier,
        this.y + player.height * 0
      );
      ctx.fill();
      ctx.restore();
    }
  }

  processPicked(player) {
    this.paintOnPlayer(player);
    player.enableFlipGravity();
  }

  paintOnPlayer(player) {
    


    if (player.facing === 'right') {
      this.paintRightHat(player);
    } else {
      this.paintRightHat(player,-1,1)
    }

  }

  paintRightHat(player,multiplyX = 1, multiplyY = 1){
    let mirrorOffsetY = 0;
    mirrorOffsetY = !player.mirrorEnabled
    ? 0
    : player.y < this.game.canvas.height / 2
    ? player.height
    : 0;
    if (mirrorOffsetY === player.height){
      multiplyY = -1
    }

    const ctx = this.game.ctx;
    let offsetX = multiplyX === -1 ? this.width*1.2 : 0;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.moveTo(player.x + player.width * 0.05 *multiplyX +offsetX, player.y+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.05 *multiplyX+offsetX, player.y - player.height * 0.15 *multiplyY+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.4*multiplyX+offsetX, player.y + player.height * -0.2 *multiplyY+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.59*multiplyX+offsetX, player.y + player.height * 0 *multiplyY+mirrorOffsetY);
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.moveTo(player.x + player.width * 0.15*multiplyX+offsetX, player.y+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.15*multiplyX+offsetX, player.y - player.height * 0.15*multiplyY+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.4*multiplyX+offsetX, player.y + player.height * -0.2*multiplyY+mirrorOffsetY);
    ctx.lineTo(player.x + player.width * 0.59*multiplyX+offsetX, player.y + player.height * 0 *multiplyY+mirrorOffsetY);
    ctx.fill();
    ctx.restore();
  }
}
