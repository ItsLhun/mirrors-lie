class Spike extends Platform {
  constructor(game, x, y, width, height) {
    super(game, x, y, width, height);
    this.color = "red";
  }
  paint(){
    const ctx = this.game.ctx;
    ctx.save();
 
    //vertical gradient
    let gradient = ctx.createLinearGradient(this.x+this.width/2, this.y, this.x+this.width/2,this.y+this.height)
    gradient.addColorStop(0,this.color);
    gradient.addColorStop(0.25,this.color);
    gradient.addColorStop(0.5,"grey");
    gradient.addColorStop(0.75,"grey");
    gradient.addColorStop(1,"grey");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y+this.height);
    ctx.lineTo(this.x+this.width*0.5,this.y);
    ctx.lineTo(this.x+this.width,this.y+this.height);

    //ctx.lineTo(this.x+this.width,this.y-this.height);
    //ctx.lineTo(this.x-this.width/2,this.y+this.height);
    ctx.fill();
    
    ctx.restore();
  }
}
