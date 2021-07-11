class Spike extends Platform {
  constructor(game, x, y, direction) {
    super(game, x, y, 'black');
    this.direction = direction;
    this.color = 'red';
    this.deathColoringPhase = 0;
  }

  paint() {
    const ctx = this.game.ctx;
    ctx.save();
    switch (this.direction) {
      case 5: //'upright':
        break;
      case 6: //'point-right':
        ctx.translate(this.x+this.width, this.y);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 7: //'reverse':
        ctx.translate(this.x+this.width, this.y+this.height);
        ctx.rotate((180 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 8: //'point-left':
        ctx.translate(this.x, this.y+this.height);
        ctx.rotate((270 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
    }

    //vertical gradient
    let gradient = ctx.createLinearGradient(
      this.x + this.width / 2,
      this.y,
      this.x + this.width / 2,
      this.y + this.height
    );
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(0.25, this.color);
    gradient.addColorStop(0.5, 'grey');
    gradient.addColorStop(0.75, 'grey');
    gradient.addColorStop(1, 'darkgrey');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width * 0.5, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);

    //ctx.lineTo(this.x+this.width,this.y-this.height);
    //ctx.lineTo(this.x-this.width/2,this.y+this.height);
    ctx.fill();

    ctx.restore();
  }
}
