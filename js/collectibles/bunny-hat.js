class BunnyHat extends Collectible {
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

        ctx.beginPath();
        ctx.fillStyle = `hsl(${player.color},68%,32%)`;
        ctx.fillRect(this.x+ this.width * 0.05 * multiplier, this.y-player.height*0.35,player.width*0.24*multiplier/2,player.height*0.35*multiplier)
        ctx.fillRect(this.x+ this.width * 0.35 * multiplier, this.y-player.height*0.35,player.width*0.24*multiplier/2,player.height*0.35*multiplier)

        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.x+ this.width * 0.15 *multiplier, this.y-player.height*0.32,player.width*0.05,player.height*0.27*multiplier)
        ctx.fillRect(this.x+ this.width * 0.45 *multiplier, this.y-player.height*0.32,player.width*0.05,player.height*0.27*multiplier)
        ctx.restore();
      }
    }
  
    processPicked(player) {
      this.paintOnPlayer(player);
      player.enableSuperJump();
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
      ? player.height+player.height*0.35
      : 0;
      if (mirrorOffsetY === player.height){
        multiplyY = -1
      }
      let mirrorOffsetYTwo = 0;
      
      mirrorOffsetYTwo = !player.mirrorEnabled
      ? 0
      : player.y < this.game.canvas.height / 2
      ? player.height+player.height*0.35
      : 0;
      if (mirrorOffsetYTwo === player.height){
        multiplyY = -1
      }
  
      const ctx = this.game.ctx;
      let offsetX = multiplyX === -1 ? this.width*1 : 0;
      let offsetXTwo = multiplyX === -1 ? this.width*1.15 : 0;

      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = `hsl(${player.color},68%,32%)`;
      ctx.fillRect(player.x+ player.width * 0.05 *multiplyX +offsetX, player.y+mirrorOffsetY-player.height*0.35,player.width*0.24,player.height*0.35)
      ctx.fillRect(player.x+ player.width * 0.35 *multiplyX +offsetX, player.y+mirrorOffsetY-player.height*0.35,player.width*0.24,player.height*0.35)

      ctx.restore();
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = 'white';
      ctx.fillRect(player.x+ player.width * 0.15 *(multiplyX)+offsetXTwo, player.y+mirrorOffsetYTwo-player.height*0.32*multiplyY,player.width*0.05,player.height*0.27)
      ctx.fillRect(player.x+ player.width * 0.45 *(multiplyX)+offsetXTwo, player.y+mirrorOffsetYTwo-player.height*0.32,player.width*0.05,player.height*0.27)

      ctx.restore();
    }
  }
  