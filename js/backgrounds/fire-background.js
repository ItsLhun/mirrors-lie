class Fireflake {
  constructor(game, maxDistance = SQUARE * 1) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - maxDistance / 2;
    this.y =
      Math.random() * (game.canvas.height / 2 + maxDistance) -
      maxDistance / 2 +
      game.canvas.height / 2;
    this.z = (Math.random() * SQUARE) / 195 + SQUARE / 100;
    this.vx = ((Math.random() * SQUARE) / 44 - SQUARE / 155) * this.z;
    this.vy = (Math.random() * SQUARE * 0.06 + SQUARE * 0.02) * this.z;
    this.fillColor = `rgba(255,${150 * Math.random()},0,${
      0.4 * Math.random() + 0.5
    })`;
    this.diameter = (Math.random() * SQUARE * 0.45 + SQUARE * 0.3) * this.z;
  }
}

class FireBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.fireParticles = [];
    this.started = false;
    this.maxDistance = SQUARE * 0.5;
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
    ctx.fillStyle = `hsl(359, 94%, 5%)`;
   // ctx.fillStyle = `white`;
    
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.restore();

    ctx.save();

    for (let i = 0; i < this.fireParticles.length; i++) {
      this.draw(this.fireParticles[i]);
      this.updatePoint(this.fireParticles[i]);
    }
    ctx.restore();
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let fireParticle = new Fireflake(this.game, this.maxDistance);
      this.fireParticles.push(fireParticle);
    }
  }
  draw(fireFlake) {
    this.drawPoint(fireFlake);
    this.drawInvertedPoint(fireFlake);
  }
  drawPoint(fireFlake) {
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = fireFlake.fillColor;
    ctx.arc(fireFlake.x, fireFlake.y, fireFlake.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  drawInvertedPoint(fireFlake) {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.translate(-this.game.canvas.width, this.game.canvas.height);
    ctx.rotate((Math.PI / 180) * 180);
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = fireFlake.fillColor;
    ctx.arc(
      -fireFlake.x - this.game.canvas.width,
      fireFlake.y,
      fireFlake.diameter,
      0,
      2 * Math.PI
    );
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }
  updatePoint(fireFlake) {
    let player = this.game.activeLevel.player;

    let playerDistance = 0;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      fireFlake.x += fireFlake.vx + playerDistance * 0.5;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      fireFlake.x += fireFlake.vx - player.accelerationX * 0.5;
    }

    fireFlake.y += fireFlake.vy;
    if (fireFlake.x > this.game.canvas.width + this.maxDistance) {
      fireFlake.x = -this.maxDistance;
    } else if (fireFlake.x < -this.maxDistance) {
      fireFlake.x = this.game.canvas.width + this.maxDistance;
    }
    if (fireFlake.y > this.game.canvas.height + this.maxDistance) {
      fireFlake.y = game.canvas.height / 2;
    } else if (fireFlake.y < -this.maxDistance) {
      fireFlake.y = this.game.canvas.height / 2 + this.maxDistance;
    }
  }
}
