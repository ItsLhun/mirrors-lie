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
    let platformOne = new Platform(
      this,
      this.canvas.width * 0.4,
      this.canvas.height * 0.7,
      100,
      35
    );
    let platformTwo = new Platform(
      this,
      this.canvas.width * 0.5,
      this.canvas.height * 0.6,
      100,
      35
    );
    let platformThree = new Platform(
      this,
      this.canvas.width * 0.3,
      this.canvas.height * 0.75,
      100,
      10
    );
    let platformFour = new Platform(
      this,
      this.canvas.width * 0.3,
      this.canvas.height * 0.35,
      100,
      10
    );
    let floor = new Platform(
      this,
      0,
      this.canvas.height * 1,
      this.canvas.width,
      50
    );
    let ceil = new Platform(
      this,
      0,
      0-50,
      this.canvas.width,
      50
    );
    let leftWall = new Platform(
      this,
      0,
      this.canvas.height * 0,
      0,
      this.canvas.height
    );
    let rightWall = new Platform(
      this,
      this.canvas.width,
      this.canvas.height * 0,
      0,
      this.canvas.height
    );

    this.platforms.push(
      platformOne,
      platformTwo,
      platformThree,
      floor,
      ceil,
      leftWall,
      rightWall,
      platformFour
    );
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

  paintScore() {}

  paintGameOver() {}

  paint() {
    this.clearScreen();
  //  this.paintBackground();
    if (this.running) {
      this.player.paint();
      for (let platform of this.platforms) {
        platform.paint();
      }
    }
    /* if (this.lost) {
      this.paintGameOver();
    }*/
  }
}
