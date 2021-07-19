class Snowflake {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - (SQUARE * 8) / 2;
    this.y =
      Math.random() * (game.canvas.height + maxDistance) - (SQUARE * 8) / 2;
    this.z = Math.random() * 0.4 + 0.5;
    this.vx = (Math.random() * 2 - 0.5) * this.z;
    this.vy = (Math.random() * 1.5 + 1.5) * this.z;
    this.fillColor = `rgba(255,${255 * Math.random() + 210},255,${
      0.4 * Math.random() + 0.5
    })`;
    this.diameter = (Math.random() * 2.5 + 1.5) * this.z;
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
    this.generatePoints(this.game.canvas.width / 4);
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

    ctx.save();

    for (let i = 0; i < this.snowflakes.length; i++) {
      this.drawPoint(this.snowflakes[i]);
      this.updatePoint(this.snowflakes[i]);
    }
    ctx.restore();
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let snowflake = new Snowflake(this.game, this.maxDistance);
      this.snowflakes.push(snowflake);
    }
  }
  drawPoint(snow) {
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = snow.fillColor;
    ctx.arc(snow.x, snow.y, snow.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  updatePoint(snow) {
    snow.x += snow.vx;
    snow.y += snow.vy;
    if (snow.x > this.game.canvas.width + this.maxDistance / 2) {
      snow.x = -(this.maxDistance / 2);
    } else if (snow.xpos < -(this.maxDistance / 2)) {
      snow.x = this.game.canvas.width + this.maxDistance / 2;
    }
    if (snow.y > this.game.canvas.height + this.maxDistance / 2) {
      snow.y = -(this.maxDistance / 2);
    } else if (snow.y < -(this.maxDistance / 2)) {
      snow.y = this.game.canvas.height + this.maxDistance / 2;
    }
  }
}
