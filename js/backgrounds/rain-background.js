class Raindrop {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - (SQUARE * 8) / 2;
    this.y =
      Math.random() * (game.canvas.height / 2 + maxDistance) - (SQUARE * 8) / 2 +
      game.canvas.height / 2;
    this.z = Math.random() * (SQUARE/46.25) + (SQUARE/37);
    this.vx = - Math.random() * - SQUARE/46.25 - (SQUARE/20)

    this.vy = (Math.random() * (SQUARE/6) + (SQUARE/32)) * this.z;
    this.fillColor = `rgba(0,${190 * Math.random() + 160},255,${
      0.4 * Math.random() + 0.5
    })`;
    this.width = Math.random() * (SQUARE/16)+ (SQUARE/16);
    this.height = Math.random() * (SQUARE/4)+ (SQUARE/8);

  }
}

class RainBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.raindrops = [];
    this.started = false;
    this.maxDistance = SQUARE * 2;
  }

  start() {
    this.generatePoints(this.game.canvas.width / 4);
    this.started = true;
  }
  paint() {
    if (!this.started) {
      this.start();
    }
    let ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = 'hsl(203,90%,28%)';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.restore();

    ctx.save();

    for (let i = 0; i < this.raindrops.length; i++) {
      this.drawAllPoints(this.raindrops[i]);
      this.updatePoint(this.raindrops[i]);
    }
    ctx.restore();
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let raindrop = new Raindrop(this.game, this.maxDistance);
      this.raindrops.push(raindrop);
    }
  }
  drawAllPoints(snow) {
    this.drawPoint(snow);
    this.drawInvertedPoint(snow);
  }
  drawPoint(drop) {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = drop.fillColor;
    ctx.fillRect(drop.x, drop.y, drop.width, drop.height)
    ctx.restore();

  }
  drawInvertedPoint(drop) {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.translate(-this.game.canvas.width, this.game.canvas.height);
    ctx.rotate((Math.PI / 180) * 180);
    ctx.beginPath();
    ctx.fillStyle = drop.fillColor;
    ctx.fillRect(-drop.x- this.game.canvas.width, drop.y, drop.width, drop.height)
    ctx.restore();
  }
  updatePoint(drop) {
    let player = this.game.activeLevel.player;

    let playerDistance = 0;
    drop.x+=drop.vx;

    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      drop.x += playerDistance * 0.5;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      drop.x += -player.accelerationX * 0.5;
    }

    drop.y += drop.vy;
    if (drop.x > this.game.canvas.width + this.maxDistance) {
      drop.x = -this.maxDistance;
    } else if (drop.x < -this.maxDistance) {
      drop.x = this.game.canvas.width + this.maxDistance;
    }
    if (drop.y > this.game.canvas.height + this.maxDistance) {
      drop.y = game.canvas.height / 2;
    } else if (drop.y < -this.maxDistance) {
      drop.y = this.game.canvas.height / 2 + this.maxDistance;
    }
  }
  
}
