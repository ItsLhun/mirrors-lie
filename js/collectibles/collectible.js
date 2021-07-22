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
    this.width = width;
    this.height = height;
    this.picked = false;
    this.dissapearState = 0;
  }

  paint(player) {
    if (!this.picked) {
     // console.log("shiny", this.x, this.y)
      const ctx = this.game.ctx;
      ctx.save();
      ctx.fillStyle = 'gold';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.lineWidth = SQUARE*0.0125
      ctx.strokeRect(this.x, this.y, this.width, this.height);

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
