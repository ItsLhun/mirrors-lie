class Fireflake {
    constructor(game,maxDistance) {
      this.x = Math.random() * (game.canvas.width + maxDistance) - maxDistance / 2;
      this.y = Math.random() * (game.canvas.height + maxDistance) - maxDistance / 2;
      this.z = Math.random() * 0.4 + 0.5;
      this.vx = (Math.random() * 2 - 0.5) * this.z;
      this.vy = (Math.random() * 1.5 + 1.5) * this.z;
      this.fillColor = `rgba(255,${(150 * Math.random())},0,${(0.4 * Math.random() + 0.5)})`;
      this.diameter = (Math.random() * 2.5 + 1.8) * this.z;
    }
  }
  
  class FireBackground extends Background {
    constructor(game, backgroundName) {
      super(game, backgroundName);
      this.fireParticles = [];
      this.started = false;
      this.maxDistance = SQUARE*1
    }
  
    start() {
      this.generatePoints(this.game.canvas.width / 3);
      this.started = true;
    }
    paint() {
      if (!this.started) {
        this.start();
      }
      let ctx = this.game.ctx;
      ctx.save();
      ctx.fillStyle = `hsl(359, 94%, 5%)`;
      ctx.fillRect(0,0, this.game.canvas.width, this.game.canvas.height)
      ctx.restore();
  
      ctx.save();
  
      for (let i = 0; i < this.fireParticles.length; i++) {
        this.drawPoint(this.fireParticles[i]);
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
    updatePoint(fireFlake) {
      fireFlake.x += fireFlake.vx;
      fireFlake.y += fireFlake.vy;
      if (fireFlake.x > this.game.canvas.width + this.maxDistance) {
        fireFlake.x = -(this.maxDistance);
      } else if (fireFlake.xpos < -(this.maxDistance)) {
        fireFlake.x = this.game.canvas.width + this.maxDistance;
      }
      if (fireFlake.y > this.game.canvas.height + this.maxDistance) {
        fireFlake.y = -(this.maxDistance);
      } else if (fireFlake.y < -(this.maxDistance)) {
        fireFlake.y = this.game.canvas.height + this.maxDistance;
      }
    }
  }
  