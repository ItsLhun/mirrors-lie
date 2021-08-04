class Snowflake {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - (SQUARE * 8) / 2;
    this.y =
      Math.random() * (game.canvas.height / 2 + maxDistance) -
      (SQUARE * 8) / 2 +
      game.canvas.height / 2;
    this.z = Math.random() * (SQUARE / 46.25) + SQUARE / 37;
    this.vx = ((Math.random() * 37) / SQUARE - SQUARE / 17) * this.z;
    this.vy = (Math.random() * (SQUARE / 12) + SQUARE / 32) * this.z;
    this.fillColor = `rgba(255,${255 * Math.random() + 210},255,${
      0.4 * Math.random() + 0.5
    })`;
    this.diameter = (Math.random() * (SQUARE / 7.4) + SQUARE / 12) * this.z;
  }
}

class SnowBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.snowflakes = [];
    this.started = false;
    this.maxDistance = SQUARE * 2;
  }

  start() {
    this.generatePoints(this.game.canvas.width / 10);
    this.started = true;
  }
  paint() {
    if (!this.started) {
      this.start();
    }
    let ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.restore();
    for (let i = 0; i < this.snowflakes.length; i++) {
      this.drawAllPoints(this.snowflakes[i]);
      this.updatePoint(this.snowflakes[i]);
    }
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let snowflake = new Snowflake(this.game, this.maxDistance);
      this.snowflakes.push(snowflake);
    }
  }
  drawAllPoints(snow) {
    this.drawPoint(snow);
    this.drawInvertedPoint(snow);
  }
  drawPoint(snow) {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = snow.fillColor;
    ctx.arc(snow.x, snow.y, snow.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  drawInvertedPoint(snow) {
    let ctx = this.game.ctx;
    ctx.save();
    //ctx.translate(-this.game.canvas.width, this.game.canvas.height);
    // ctx.rotate((Math.PI / 180) * 180);
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = snow.fillColor;
    ctx.arc(
      snow.x,
      this.game.canvas.height - snow.y,
      snow.diameter,
      0,
      2 * Math.PI
    );
    /* ctx.arc(
      -snow.x - this.game.canvas.width,
      snow.y,
      snow.diameter,
      0,
      2 * Math.PI
    );*/
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  updatePoint(snow) {
    let player = this.game.activeLevel.player;
    let playerDistance = 0;
    snow.x += snow.vx;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      snow.x += snow.vx + playerDistance * 0.5;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      snow.x += snow.vx - player.accelerationX * 0.5;
    }
    snow.y += snow.vy;
    if (snow.x > this.game.canvas.width + this.maxDistance) {
      snow.x = -this.maxDistance;
    } else if (snow.x < -this.maxDistance) {
      snow.x = this.game.canvas.width + this.maxDistance;
    }
    if (snow.y > this.game.canvas.height + this.maxDistance) {
      snow.y = game.canvas.height / 2;
    } else if (snow.y < -this.maxDistance) {
      snow.y = this.game.canvas.height / 2 + this.maxDistance;
    }
  }
}
