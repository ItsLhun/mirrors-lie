const processDirection = direction => {
  switch (direction) {
    case 5: //'upright':
      return 'upright';
    case 6: //'point-right':
      return 'pointRight';
    case 7: //'reverse':
      return 'reverse';
    case 8: //'point-left':
      return 'pointLeft';
  }
}

class Spike extends Platform {
  constructor(game, x, y, direction) {
    super(game, x, y, 'black');
    this.direction = processDirection(direction);
    this.color = 'red';
    this.deathColoringPhase = 0;
  }

  increasePhase(){
    this.deathColoringPhase++;
  }

  paint(player) {
    let playerDistance = 0
    if (player.x > this.game.canvas.width *0.45){
      playerDistance = (this.game.canvas.width) *0.45 - player.x - player.accelerationX;
    } else if (player.pastStart && player.x <= this.game.canvas.width * 0.2) {
      this.x -= player.accelerationX; 
    }
    const ctx = this.game.ctx;
    ctx.save();
    this.x+=playerDistance

    switch (this.direction) {
      case 'upright': //'upright':
        break;
      case 'pointRight': //'point-right':
        ctx.translate(this.x + this.width, this.y);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 'reverse': //'reverse':
        ctx.translate(this.x + this.width, this.y + this.height);
        ctx.rotate((180 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 'pointLeft': //'point-left':
        ctx.translate(this.x, this.y + this.height);
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
