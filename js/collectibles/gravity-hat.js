class GravityHat extends Collectible{
    constructor(game, x, y){
        super(game,x,y);
        this.game = game;
    }

    processPicked(player){
        this.paintOnPlayer(player);
        player.enableFlipGravity();
    }

    paintOnPlayer(player){
    
    /*if (this.deadTimeout && this.width >= 0) {
      this.width -= SQUARE * 0.05;
      eyeBlackWidth /= 2
      eyeWhiteWidth /= 2
      if (this.width < SQUARE * 0.05) {
        this.width = 0;
        eyeBlackWidth = 0;
        eyeWhiteWidth = 0;
      }
    }
    */
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'orange';
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = SQUARE*0.1;
    ctx.moveTo(player.x-player.width*0.05, player.y-player.height*-0.1);
    ctx.lineTo(player.x+player.width*0.12, player.y+player.height*-0.1);
    ctx.lineTo(player.x+player.width*0.4, player.y+player.height*-0.15);
    ctx.lineTo(player.x+player.width*0.59, player.y+player.height*0);
    ctx.fill();
    ctx.fillStyle = 'red'
    ctx.moveTo(player.x+player.width*0.2, player.y+player.height*-0.05);
    ctx.lineTo(player.x+player.width*0.22, player.y+player.height*-0.0);
    ctx.lineTo(player.x+player.width*0.4, player.y+player.height*-0.15);
    ctx.lineTo(player.x+player.width*0.59, player.y+player.height*0);
    ctx.fill();

    //ctx.fillRect(player.x, player.y-player.height*-0.1, player.width*0.5, player.height*-0.3);/*
   /* ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'burgundy';
    let yOffset = 0;

    if (this.facing === 'right') {
      yOffset = !this.mirrorEnabled
        ? 0
        : this.y < this.level.game.canvas.height / 2
        ? SQUARE * 1.25
        : 0;
      ctx.fillRect(
        this.x + SQUARE * 0.5,
        this.y + SQUARE * 0.1875 + yOffset,
        eyeBlackWidth,
        SQUARE * 0.25
      ); //eyes
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        this.x + SQUARE * 0.6875,
        this.y + SQUARE * 0.25 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.125
      );
      ctx.restore();
    } else {
      yOffset = !this.mirrorEnabled
        ? 0
        : this.y < this.level.game.canvas.height / 2
        ? SQUARE * 1.25
        : 0;
      ctx.fillRect(
        this.x + SQUARE * 0.1875,
        this.y + SQUARE * 0.1875 + yOffset,
        eyeBlackWidth,
        SQUARE * 0.25
      );
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        this.x + SQUARE * 0.1875,
        this.y + SQUARE * 0.25 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.125
      );
      ctx.restore();
    }*/
    ctx.restore();
    }
}