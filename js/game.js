class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.rightBreakpoint = Math.floor(canvas.width * 0.45);
    this.leftBreakpoint = Math.floor(canvas.width * 0.2);
    this.activeLevel;
  }

  start() {
    this.running = true;
    this.score = 0;
    let levelTest = new LevelTest(this);
    const levelOne = new LevelOne(this);
    this.activeLevel = levelOne;
    this.scoreCounter = new ScoreCounter(this, 15, 15);
    this.loop();
  }

  loop() {
    this.paint();
    if (!this.activeLevel.player.deadTimeout) {
      this.runLogic();
    }
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  runLogic() {
    this.activeLevel.player.runLogic();
    if (this.score >= 100) {
      this.running = false;
      this.lost = true;
    }
    this.scoreCounter.runLogic();
  }

  collectGarbage() {}

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paintBackground() {}

  paintScore() {}

  paintGameOver() {}

  paint() {
    this.clearScreen();
    if (this.running) {
      this.activeLevel.paint();
    }
    this.scoreCounter.paint();
  }
}
