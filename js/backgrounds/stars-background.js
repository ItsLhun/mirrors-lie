class Star {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - maxDistance / 2;
    this.y =
      Math.random() * (game.canvas.height + maxDistance) - maxDistance / 2;
    this.z =
      (Math.random() * (SQUARE * 0.9375)) / 150 + (SQUARE * 0.9375) / 120;
    this.fillColor = `rgba(255,230,${255 * Math.random() + 90},${
      0.6 * Math.random() + 0.4
    })`;
    this.diameter =
      (Math.random() * (SQUARE * 0.9375)) / 40 +
      (SQUARE * 0.9375) / 15 +
      this.z;
  }
}

class StarBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.stars = [];
    this.started = false;
    this.maxDistance = SQUARE * 3;
  }

  start() {
    this.generatePoints(this.game.canvas.width / 5);
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

    for (let i = 0; i < this.stars.length; i++) {
      this.drawPoint(this.stars[i]);
      this.updatePoint(this.stars[i]);
    }
    ctx.restore();
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let star = new Star(this.game, this.maxDistance);
      this.stars.push(star);
    }
  }
  drawPoint(star) {
    let player = this.game.activeLevel.player;
    let playerDistance = 0;
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = star.fillColor;

    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      star.x += playerDistance * 0.5;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      star.x -= player.accelerationX * 0.5;
    }

    if (star.x > this.game.canvas.width + this.maxDistance) {
      star.x = -this.maxDistance;
    } else if (star.x < -this.maxDistance) {
      star.x = this.game.canvas.width + this.maxDistance;
    }
    /*  if (star.y > this.game.canvas.height + this.maxDistance) {
      star.y = game.canvas.height / 2;
    } else if (star.y < -this.maxDistance) {
      star.y = this.game.canvas.height / 2 + this.maxDistance;
    }*/
    ctx.arc(star.x, star.y, star.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  updatePoint(star) {
    let updateChange = Math.floor(Math.random() * 1000);
    if (updateChange === 3) {
      star.diameter = (Math.random() * 2.5 + 3) * star.z;
    }
  }
}
