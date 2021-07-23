class Collectible extends Platform {
  constructor(
    game,
    positionX,
    positionY,
    width = SQUARE*0.8,
    height = SQUARE*0.8
  ) {
    super(game, positionX, positionY, 'black');
    this.game = game;
    this.width = width;
    this.height = height;
    this.picked = false;
    this.dissapearState = 0;
  }

  paint(player) {
    if (!this.picked) {
     this.paintAura()
      const ctx = this.game.ctx;
      ctx.save();
      ctx.fillStyle = 'gold';
      ctx.fillRect(this.x+SQUARE*0.1, this.y-this.height/2, this.width, this.height);
      ctx.lineWidth = SQUARE*0.0125
      ctx.strokeRect(this.x+SQUARE*0.1, this.y-this.height/2, this.width, this.height);
      ctx.restore();
    }
  }
  paintAura() {
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    let radialGrad = ctx.createRadialGradient(this.x+SQUARE/2,this.y,SQUARE*1.5, this.x+SQUARE/2,this.y,SQUARE*0.4)
    radialGrad.addColorStop(0.2, 'transparent');
    radialGrad.addColorStop(0.4, 'rgba(255,255,255,0.2');
    radialGrad.addColorStop(1, 'rgba(255,215,0,0.5)');
    ctx.fillStyle = radialGrad;
    ctx.arc(this.x+SQUARE/2, this.y, SQUARE*1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
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
      console.log('picked up the object!');
      player.activeHat = this;
      return true;
    }
    if (verticalIntersection) {
      console.log('picked up the object!');
      this.picked = true;
      player.activeHat = this;
      return true;
    }
  }
  processPicked(player){
 
}
  playSound() {}
  dissapear(){
    const ctx = this.game.ctx;
    ctx.save();
    ctx.scale(1/this.dissapearState,1/this.dissapearState);
    this.dissapearState++;
    ctx.restore();
    if (this.dissapearState === 5){
      return true;
    }
  }
}
