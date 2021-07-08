class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.platforms = [];
  }

  start() {
    this.running = true;
    this.score = 100;
    this.player = new Player(this, 30, this.canvas.height * 0.8 - 40);
    let platformOne = new Platform(this, this.canvas.width * 0.4, this.canvas.height * 0.7, 100, 35);
    let platformTwo = new Platform(this, this.canvas.width * 0.5, this.canvas.height * 0.6, 100, 35);
    let platformThree = new Platform(this, this.canvas.width * 0.3, this.canvas.height * 0.75, 100, 10);
    let floor = new Platform(this, 0, this.canvas.height * 0.8, this.canvas.width, 50);

    this.platforms.push(platformOne, platformTwo, platformThree,floor);
    this.loop();
  }

  checkCollisions() {
    const player = this.player;
  }

  loop() {
    this.runLogic();
    this.paint();
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  runLogic() {
    this.player.runLogic();
    if (this.score <= 0) {
      this.running = false;
      this.lost = true;
    }
  }

  collectGarbage() {}

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintBackground() {
    this.ctx.save();
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(0, this.canvas.height * 0.8, this.canvas.width, 50);
    this.ctx.restore();
  }

  /*
  paintScore() {
    this.context.font = '32px sans-serif';
    this.context.fillText(`Score: ${this.score}`, 50, 450);
  }

  paintGameOver() {
    this.context.font = '32px sans-serif';
    this.context.fillText(`Game Over`, 100, 250);
  }*/

  paint() {
    this.clearScreen();
    this.paintBackground();
    if (this.running) {
      this.player.paint();
      for (let platform of this.platforms){
        platform.paint();
      }
    }
    /* if (this.lost) {
      this.paintGameOver();
    }*/
  }
}
