class Star {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - maxDistance / 2;
    this.y =
      Math.random() * (game.canvas.height + maxDistance) - maxDistance / 2;
    this.z = Math.random() * 0.4 + 0.5;
    this.fillColor = `rgba(255,255,${255 * Math.random() + 240},${
      0.4 * Math.random() + 0.5
    })`;
    this.diameter = (Math.random() * 2.5 + 2) * this.z;
  }
}

class StarBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.stars = [];
    this.started = false;
    this.maxDistance = SQUARE * 1;
  }

  start() {
    this.generatePoints(this.game.canvas.width / 8);
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
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = star.fillColor;
    ctx.arc(star.x, star.y, star.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  updatePoint(star) {
    let updateChange = Math.floor(Math.random() * 1000);
    if (updateChange === 3) {
      star.diameter = (Math.random() * 2.5 + 2) * star.z;
    }
  }
}
