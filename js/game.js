class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.rightBreakpoint = Math.floor(canvas.width*0.45);
    this.leftBreakpoint = Math.floor(canvas.width*0.2);
  }

  start() {
    this.running = true;
    this.score = 0;
    let levelOne = new LevelTest(this);
    this.activeLevel = levelOne;
    this.loop();
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
    this.activeLevel.player.runLogic();
    if (this.score >= 100) {
      this.running = false;
      this.lost = true;
    }
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
    //this.background.paint();
    if (this.running) {
      this.activeLevel.paint();
    }
    /* if (this.lost) {
      this.paintGameOver();
    }*/
  }
}
